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
	payment_status,
} = require("../util/constants");
const { fetchUser } = require("./users.service");
const { index } = require("../util/algolia");
const { stripe } = require("../util/stripe");
const { mailTransporter } = require("../util/nodeMailer");
const { email } = require("../util/email");
const {
	paymentConfirmationEmail,
} = require("../util/paymentConfirmationEmail");

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

exports.fetchUserIdBids = (req) =>
	new Promise((resolve, reject) => {
		const user_id = req;
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
			.where("user_id", "==", user_id)
			.get()
			.then((querySnapshotBids) => {
				const dataBid = querySnapshotData(querySnapshotBids);
				const filter = dataBid.filter((n) => n.product_id === product_id);

				if (filter.length > 0) {
					const bid = filter[0];

					bids
						.doc(filter[0].id)
						.set({ ...bid, bid_price }, { merge: true })
						.then(() => {
							bids
								.where("product_id", "==", bid.product_id)
								.get()
								.then((querySnapshotBidProduct) => {
									const dataProd = querySnapshotData(querySnapshotBidProduct);
									let maxValue = Math.max.apply(
										Math,
										dataProd.map(function (o) {
											return parseInt(o.bid_price);
										})
									);
									resolve({
										highest_bid: maxValue,
										bids: dataProd.length,
										bid: { ...bid, bid_price },
									});
								})
								.catch((err) => {
									let msg = "Unable to add bid";
									console.log(err);
									reject(msg);
								});
						})
						.catch(() => {
							let msg = "Unable to update the bid";
							reject(msg);
						});
				} else {
					bids
						.add(data)
						.then((docRef) => {
							const bid = { ...data, id: docRef.id };
							bids
								.where("product_id", "==", data.product_id)
								.get()
								.then((querySnapshot) => {
									const dataProd = querySnapshotData(querySnapshot);
									let maxValue = 0;
									if (dataProd.length > 0) {
										maxValue = Math.max.apply(
											Math,
											dataProd.map(function (o) {
												return parseInt(o.bid_price);
											})
										);
									}

									resolve({
										highest_bid: maxValue,
										bids: dataProd.length,
										bid: bid,
									});
								})
								.catch((err) => {
									let msg = "Unable to add bid";
									console.log(err);
									reject(msg);
								});
						})
						.catch((err) => {
							let msg = "Unable to add the bid";
							console.log(err);
							reject(msg);
						});
				}
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

const sendMail = (user, product, bid) =>
	new Promise((resolve, reject) => {
		let mailDetails = {
			from: "auctiapp@gmail.com",
			to: user.email,
			subject: "Aucti - Please make the payment",
			html: email(product, bid),
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
												db.doc(`/users/${bid.user_id}`)
													.get()
													.then((querySnapshot) => {
														let user = querySnapshot.data();
														sendMail(user, product, bid)
															.then(() => {
																resolve(bid);
															})
															.catch(() => {
																let msg = "Unable to update the bid";
																reject(msg);
															});
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

const sendPayementConfirmMail = (props) =>
	new Promise((resolve, reject) => {
		let mailDetails = {
			from: "auctiapp@gmail.com",
			to: props.seller,
			subject: `Payement Confirmed to your product ${props.title}`,
			html: paymentConfirmationEmail(props),
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
		const { token, bid_id, address_id } = req.body;
		console.log(bid_id);
		db.doc(`/bids/${bid_id}`)
			.get()
			.then((querySnapshot) => {
				let bid = querySnapshot.data();
				console.log(bid);
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
										const upDatedBid = bid;
										upDatedBid.payment_status = payment_status.PAID;
										bids
											.doc(bid.id)
											.set({ ...bid }, { merge: true })
											.then(() => {
												db.doc(`/addresses/${address_id}`)
													.get()
													.then((querySnapshotAddress) => {
														let address = querySnapshotAddress.data();
														db.doc(`/users/${address.user_id}`)
															.get()
															.then((querySnapshotUser) => {
																let user = querySnapshotUser.data();
																db.doc(`/users/${product.seller_id}`)
																	.get()
																	.then((querySnapshotSeller) => {
																		let seller = querySnapshotSeller.data();
																		const props = {
																			...user,
																			...address,
																			...product,
																			seller: seller.email,
																		};
																		sendPayementConfirmMail(props);
																		console.log(data);
																		let msg = "Payment Successful";
																		resolve(msg);
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

exports.getBidPaymentProduct = (bid_id) =>
	new Promise((resolve, reject) => {
		db.doc(`/bids/${bid_id}`)
			.get()
			.then((querySnapshot) => {
				let bid = querySnapshot.data();
				fetchProduct(bid.product_id)
					.then((data) => {
						const product = data;
						const props = {
							...bid,
							...product,
						};
						resolve(props);
					})
					.catch((err) => {
						let msg = "Bid payemnt product could't retirve";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Bid payemnt product could't retirve";
				console.log(err);
				reject(msg);
			});
	});
