const { admin, db } = require("../util/admin");
const bids = db.collection("bids");
const products = db.collection("products");

const {
	fetchProduct,
	updateProduct,
} = require("../services/products.service.js");
const {
	bid_status,
	auction_status,
	product_transaction_status,
} = require("../util/constants");
const { fetchUser } = require("./users.service");
const { index } = require("../util/algolia");
const { stripe } = require("../util/stripe");
const { mailTransporter } = require("../util/nodeMailer");
const { email } = require("../util/email");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllBids = () =>
	new Promise((resolve, reject) => {
		bids
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				console.log(data);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve Bids";
				reject(msg);
			});
	});

exports.fetchUserBids = (req) =>
	new Promise((resolve, reject) => {
		const { user_id, firstPageIndex, lastPageIndex } = req;
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}

		bids
			.where("user_id", "==", user_id)
			.orderBy("createdAt", "desc")
			// .startAt(startAt)
			// .limit(10)
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				Promise.all(
					data.map((bid) =>
						fetchProduct(bid.product_id)
							.then((product) => {
								return {
									...bid,
									product: {
										title: product.title,
										base_price: product.base_price,
										auction_status: product.auction_status,
									},
								};
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							})
					)
				)
					.then((list) => {
						const filter = list.filter(
							(n) =>
								n.product.auction_status === auction_status.LIVE ||
								n.product.auction_status === auction_status.HOLD
						);
						Promise.all(
							filter.map((bid) =>
								bids
									.where("product_id", "==", bid.product_id)
									// .orderBy("createdAt", "desc")
									.get()
									.then((querySnapshot) => {
										const data = querySnapshotData(querySnapshot);
										let maxValue = Math.max.apply(
											Math,
											data.map(function (o) {
												return parseInt(o.bid_price);
											})
										);
										return {
											...bid,
											product: {
												...bid.product,
												highest_bid: maxValue,
											},
										};
									})
									.catch((err) => {
										let msg = "Unable to retrieve User bids";
										console.log(err);
										reject(msg);
									})
							)
						)
							.then((finalList) => {
								console.log(finalList);
								const length = finalList.length;

								const filteredlist = finalList.slice(
									firstPageIndex,
									lastPageIndex
								);

								resolve({ data: filteredlist, length: length });
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							});
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.fetchProductBids = (req) =>
	new Promise((resolve, reject) => {
		const { product_id, firstPageIndex, lastPageIndex } = req;

		if (!product_id) {
			let msg = "product id is empty";
			reject(msg);
		}

		bids
			.where("product_id", "==", product_id)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				console.log(data);
				Promise.all(
					data.map((bid) =>
						fetchUser(bid.user_id)
							.then((user) => {
								return {
									...bid,
									user,
								};
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							})
					)
				)
					.then((finalList) => {
						console.log(finalList);
						const length = finalList.length;

						const filteredlist = finalList.slice(firstPageIndex, lastPageIndex);

						resolve({ data: filteredlist, length: length });
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.fetchUserInsights = (user_id) =>
	new Promise((resolve, reject) => {
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}

		bids
			.where("user_id", "==", user_id)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				const length = data.length;

				bids
					.where("user_id", "==", user_id)
					.where("bid_status", "==", bid_status.SUCCESS)
					.get()
					.then((querySnapshot) => {
						const list = querySnapshotData(querySnapshot);

						console.log(list);
						let total = 0;
						if (list.length > 0) {
							list.forEach((n) => {
								total += parseInt(n.bid_price);
							});
						}
						resolve({ total_bids: length, total_worth_items: total });
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.fetchBuyerBidHistory = (req) =>
	new Promise((resolve, reject) => {
		const { user_id, firstPageIndex, lastPageIndex } = req;
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}

		bids
			.where("user_id", "==", user_id)
			.where("bid_status", "==", bid_status.SUCCESS)
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				Promise.all(
					data.map((bid) =>
						fetchProduct(bid.product_id)
							.then((product) => {
								if (
									product.product_transaction_status ===
										product_transaction_status.PAID ||
									product.product_transaction_status ===
										product_transaction_status.SENT ||
									product.product_transaction_status ===
										product_transaction_status.PENDING
								) {
									return {
										title: product.title,
										base_price: product.base_price,
										auction_status: product.auction_status,
										seller_id: product.seller_id,
										highest_bid: bid.bid_price,
										user_id: bid.user_id,
										product_transaction_status:
											product.product_transaction_status,
										id: product.id,
										bid_id: bid.id,
									};
								} else {
									return null;
								}
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							})
					)
				)
					.then((list) => {
						const filter = list.filter((n) => n !== null);

						const length = filter.length;
						const filteredList = filter.slice(firstPageIndex, lastPageIndex);
						resolve({ data: filteredList, length: length });
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.fetchBuyerBidCompleted = (req) =>
	new Promise((resolve, reject) => {
		const { user_id, firstPageIndex, lastPageIndex } = req;
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}

		bids
			.where("user_id", "==", user_id)
			.where("bid_status", "==", bid_status.SUCCESS)
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				Promise.all(
					data.map((bid) =>
						fetchProduct(bid.product_id)
							.then((product) => {
								if (
									product.product_transaction_status ===
										product_transaction_status.SETTLED ||
									product.product_transaction_status ===
										product_transaction_status.DISPUTE
								) {
									return {
										title: product.title,
										base_price: product.base_price,
										auction_status: product.auction_status,
										seller_id: product.seller_id,
										highest_bid: bid.bid_price,
										user_id: bid.user_id,
										product_transaction_status:
											product.product_transaction_status,
										id: product.id,
										bid_id: bid.id,
									};
								} else {
									return null;
								}
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							})
					)
				)
					.then((list) => {
						const filter = list.filter((n) => n !== null);

						const length = filter.length;
						const filteredList = filter.slice(firstPageIndex, lastPageIndex);
						resolve({ data: filteredList, length: length });
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.addBid = (req) =>
	new Promise((resolve, reject) => {
		const { user_id, product_id, bid_price } = req.body;
		console.log("here");
		const data = {
			user_id,
			product_id,
			bid_price,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			bid_status: bid_status.PENDING,
		};

		if (!bid_price) {
			let msg = "Bid price must not be empty";
			reject(msg);
		}

		bids
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch((err) => {
				let msg = "Unable to add the bid";
				console.log(err);
				reject(msg);
			});
	});

exports.deleteBid = (bidId) =>
	new Promise((resolve, reject) => {
		bids
			.doc(bidId)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the Bid";
				reject(msg);
			});
	});

exports.updateBid = (bid) =>
	new Promise((resolve, reject) => {
		let user_id = bid.user_id;
		if (!bid.bid_price) {
			let msg = "Bid price must not be empty";
			reject(msg);
		}
		bids
			.doc(bid.id)
			.set({ ...bid }, { merge: true })
			.then(() => {
				bids
					.where("product_id", "==", bid.product_id)
					// .orderBy("createdAt", "desc")
					.get()
					.then((querySnapshot) => {
						const data = querySnapshotData(querySnapshot);
						let maxValue = Math.max.apply(
							Math,
							data.map(function (o) {
								return parseInt(o.bid_price);
							})
						);
						resolve({
							...bid,
							product: {
								...bid.product,
								highest_bid: maxValue,
							},
						});
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch(() => {
				let msg = "Unable to update the bid";
				reject(msg);
			});
	});

const sendMail = (bi_id) =>
	new Promise((resolve, reject) => {
		let mailDetails = {
			from: "auctiapp@gmail.com",
			to: "kirushanbalakrishnan@gmail.com,anuragkumarjsk13@gmail.com,rahul.rahulgags@gmail.com",
			subject: "Node.js testing",
			html: email(bi_id),
		};
		mailTransporter.sendMail(mailDetails, function (err, data) {
			if (err) {
				console.log("Error Occurs");
				reject(err);
			} else {
				resolve();
			}
		});
	});

exports.selectHighestBid = (bid_id) =>
	new Promise((resolve, reject) => {
		if (!bid_id) {
			let msg = "Bid id must not be empty";
			reject(msg);
		}
		db.doc(`/bids/${bid_id}`)
			.get()
			.then((querySnapshot) => {
				let bid = querySnapshot.data();
				bid.id = querySnapshot.id;
				bid.bid_status = bid_status.SUCCESS;
				bids
					.doc(bid_id)
					.set({ ...bid }, { merge: true })
					.then(() => {
						db.doc(`/products/${bid.product_id}`)
							.get()
							.then((querySnapshot) => {
								let product = querySnapshot.data();
								product.id = querySnapshot.id;
								product.selected_bid = bid_id;
								product.auction_status = auction_status.COMPLETED;
								products
									.doc(product.id)
									.set({ ...product }, { merge: true })
									.then(() => {
										index
											.deleteObject(product.id)
											.then(() => {
												sendMail(bid.id)
													.then(() => {
														resolve(bid);
													})
													.catch(() => {
														let msg = "Unable to update the bid";
														reject(msg);
													});
											})
											.catch(() => {
												let msg = "Unable to update the bid";
												reject(msg);
											});
									})
									.catch(() => {
										let msg = "Unable to update the bid";
										reject(msg);
									});
							})
							.catch(() => {
								let msg = "Unable to update the bid";
								reject(msg);
							});
					});
			});
	});

const sendPayementConfirmMail = (bi_id) =>
	new Promise((resolve, reject) => {
		let mailDetails = {
			from: "auctiapp@gmail.com",
			to: "kirushanbalakrishnan@gmail.com,anuragkumarjsk13@gmail.com,rahul.rahulgags@gmail.com",
			subject: "Node.js testing",
			html: email(bi_id),
		};
		mailTransporter.sendMail(mailDetails, function (err, data) {
			if (err) {
				console.log("Error Occurs");
				reject(err);
			} else {
				resolve();
			}
		});
	});

exports.makePayment = async (req) =>
	new Promise((resolve, reject) => {
		const { token, bid_id } = req.body;

		db.doc(`/bids/${bid_id}`)
			.get()
			.then((querySnapshot) => {
				let bid = querySnapshot.data();
				stripe.paymentIntents
					.create({
						amount: parseInt(bid.bid_price) * 100,
						currency: "INR",
						description: "Aucti",
						payment_method: token,
						confirm: true,
					})
					.then((payments) => {
						console.log(payments);
						fetchProduct(bid.product_id)
							.then((data) => {
								const product = data;
								product.product_transaction_status =
									product_transaction_status.PAID;
								products
									.doc(product.id)
									.set({ ...product }, { merge: true })
									.then(() => {
										console.log(data);
										let msg = "Payment Successful";
										resolve(msg);
									})
									.catch((err) => {
										let msg = "Payment Failed";
										console.log(err);
										reject(msg);
									});
							})
							.catch((err) => {
								let msg = "Payment Failed";
								console.log(err);
								reject(msg);
							});
					})
					.catch((err) => {
						let msg = "Payment Failed";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Payment Failed";
				console.log(err);
				reject(msg);
			});
	});
