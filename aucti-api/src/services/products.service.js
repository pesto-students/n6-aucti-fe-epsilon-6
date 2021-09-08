const { admin, db } = require("../util/admin");
const { index } = require("../util/algolia");
const products = db.collection("products");
const bids = db.collection("bids");
const wishlist = db.collection("wishlist");

const bucket = admin.storage().bucket("gs://aucti-web.appspot.com/");
const uuid = require("uuid-v4");

const {
	product_transaction_status,
	product_approval_status,
	auction_status,
} = require("../util/constants");

const {
	validateAddProductData,
	validateUpdateProductData,
} = require("../util/validators");
const { fetchUser } = require("./users.service");
const { mailTransporter } = require("../util/nodeMailer");
const { buyerReceivedEmail } = require("../util/buyerReceivedEmail");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllProducts = (req) =>
	new Promise((resolve, reject) => {
		const { firstPageIndex, lastPageIndex } = req;
		products
			.get()
			.then((querySnapshot) => {
				const dataRef = querySnapshotData(querySnapshot);
				// const data = dataRef.filter(
				// 	(n) => n.auction_status === auction_status.LIVE
				// );
				Promise.all(
					dataRef.map((product) =>
						bids
							.where("product_id", "==", product.id)
							.get()
							.then((querySnapshot) => {
								const data = querySnapshotData(querySnapshot);

								let maxValue = 0;
								if (data.length > 0) {
									maxValue = Math.max.apply(
										Math,
										data.map(function (o) {
											return parseInt(o.bid_price);
										})
									);
								}

								return {
									...product,
									highest_price: maxValue,
									bids: data.length,
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
				let msg = "Unable to retrieve Products!";
				reject(msg);
			});
	});

exports.fetchAllLatestProducts = (req) =>
	new Promise((resolve, reject) => {
		const { firstPageIndex, lastPageIndex } = req;
		products
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				const dataRef = data.filter(
					(n) => n.auction_status === auction_status.LIVE
				);
				Promise.all(
					dataRef.map((product) =>
						bids
							.where("product_id", "==", product.id)
							.get()
							.then((querySnapshot) => {
								const data = querySnapshotData(querySnapshot);

								let maxValue = 0;
								if (data.length > 0) {
									maxValue = Math.max.apply(
										Math,
										data.map(function (o) {
											return parseInt(o.bid_price);
										})
									);
								}

								return {
									...product,
									highest_price: maxValue,
									bids: data.length,
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
				let msg = "Unable to retrieve Products!";
				reject(msg);
			});
	});

exports.fetchAllHotProducts = (req) =>
	new Promise((resolve, reject) => {
		const { firstPageIndex, lastPageIndex } = req;
		products
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				const dataRef = data.filter(
					(n) => n.auction_status === auction_status.LIVE
				);
				Promise.all(
					dataRef.map((product) =>
						bids
							.where("product_id", "==", product.id)
							.get()
							.then((querySnapshot) => {
								const data = querySnapshotData(querySnapshot);

								let maxValue = 0;
								if (data.length > 0) {
									maxValue = Math.max.apply(
										Math,
										data.map(function (o) {
											return parseInt(o.bid_price);
										})
									);
								}

								return {
									...product,
									highest_price: maxValue,
									bids: data.length,
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
						const finalListSorted = finalList.sort((a, b) => b.bids - a.bids);
						const length = finalListSorted.length;

						const filteredlist = finalListSorted.slice(
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
				let msg = "Unable to retrieve Products!";
				reject(msg);
			});
	});

exports.fetchProduct = (productId) =>
	new Promise((resolve, reject) => {
		if (!productId) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${productId}`)
			.get()
			.then((querySnapshot) => {
				let product = querySnapshot.data();
				product.id = querySnapshot.id;
				bids
					.where("product_id", "==", product.id)
					.get()
					.then((querySnapshot) => {
						const data = querySnapshotData(querySnapshot);
						let maxValue = 0;
						if (data.length > 0) {
							maxValue = Math.max.apply(
								Math,
								data.map(function (o) {
									return parseInt(o.bid_price);
								})
							);
						}

						db.doc(`/users/${product.seller_id}`)
							.get()
							.then((querySnapshot) => {
								let user = querySnapshot.data();

								resolve({
									...product,
									seller: user.name,
									highest_bid: maxValue,
									bids: data.length,
								});
							})
							.catch((err) => {
								let msg = "Unable to retrieve  product";
								console.log(err);
								reject(msg);
							});
					})
					.catch((err) => {
						let msg = "Unable to retrieve  product";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve  product";
				reject(msg);
			});
	});

exports.fetchProductPerUser = (req) =>
	new Promise((resolve, reject) => {
		const { productId, userId } = req;
		if (!productId) {
			let msg = "productId is empty";
			reject(msg);
		} else if (!userId) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${productId}`)
			.get()
			.then((querySnapshotProduct) => {
				let product = querySnapshotProduct.data();
				product.id = querySnapshotProduct.id;

				bids
					.where("product_id", "==", productId)
					.get()
					.then((querySnapshotBid) => {
						const data = querySnapshotData(querySnapshotBid);
						const filteredBid = data.filter((n) => n.user_id === userId);
						let maxValue = 0;
						if (data.length > 0) {
							maxValue = Math.max.apply(
								Math,
								data.map(function (o) {
									return parseInt(o.bid_price);
								})
							);
						}

						wishlist
							.where("user_id", "==", userId)
							.get()
							.then((querySnapshotWish) => {
								const dataWish = querySnapshotData(querySnapshotWish);
								const filteredWishList = dataWish.filter(
									(n) => n.product_id === productId
								);
								let bid = null;
								if (filteredBid.length > 0) {
									bid = filteredBid[0];
								}
								db.doc(`/users/${product.seller_id}`)
									.get()
									.then((querySnapshot) => {
										let user = querySnapshot.data();

										resolve({
											...product,
											seller: user.name,
											highest_bid: maxValue,
											bids: data.length,
											bid: bid,
											wishlist: filteredWishList.length > 0 ? true : false,
										});
									})
									.catch((err) => {
										let msg = "Unable to retrieve  product";
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
			})
			.catch((err) => {
				let msg = "Unable to retrieve  product";
				reject(msg);
			});
	});
exports.fetchSellerProducts = (req) =>
	new Promise((resolve, reject) => {
		const { seller_id, firstPageIndex, lastPageIndex } = req;
		if (!seller_id) {
			let msg = "seller_id is empty";
			reject(msg);
		}
		products
			.where("seller_id", "==", seller_id)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const dataRef = querySnapshotData(querySnapshot);
				const data = dataRef.filter(
					(n) =>
						n.auction_status === auction_status.DRAFT ||
						n.auction_status === auction_status.LIVE ||
						n.auction_status === auction_status.HOLD
				);
				Promise.all(
					data.map((product) =>
						bids
							.where("product_id", "==", product.id)
							.orderBy("createdAt", "desc")
							.get()
							.then((querySnapshot) => {
								const dataRef = querySnapshotData(querySnapshot);

								let maxValue = 0;
								if (dataRef.length > 0) {
									maxValue = Math.max.apply(
										Math,
										dataRef.map(function (o) {
											return parseInt(o.bid_price);
										})
									);
								}

								return {
									product: {
										...product,
										highest_bid: maxValue,
									},
									bids: dataRef,
								};
							})
							.catch((err) => {
								console.log(err);
								let msg = "Unable to retrieve Seller products";
								reject(msg);
							})
					)
				)
					.then((list) => {
						const length = list.length;
						const filteredList = list.slice(firstPageIndex, lastPageIndex);
						resolve({ data: filteredList, length: length });
					})
					.catch((err) => {
						console.log(err);
						let msg = "Unable to retrieve Seller products";
						reject(msg);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve Seller products";
				reject(msg);
			});
	});

exports.fetchSellerInsights = (seller_id) =>
	new Promise((resolve, reject) => {
		if (!seller_id) {
			let msg = "seller_id is empty";
			reject(msg);
		}
		products
			.where("seller_id", "==", seller_id)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				const total_products = data.length;
				const filteredList = data.filter(
					(n) =>
						n.product_transaction_status === product_transaction_status.SETTLED
				);
				let total = 0;

				if (filteredList.length > 0) {
					Promise.all(
						filteredList.map((product) =>
							bids
								.doc(product.selected_bid)
								.get()
								.then((querySnapshot) => {
									const data = querySnapshotData(querySnapshot);
									return data.bid_price;
								})
						)
					)
						.then((list) => {
							list.forEach((n) => {
								total += parseInt(n.bid_price);
							});

							resolve({ total_products, total_sales: total });
						})
						.catch((err) => {
							console.log(err);
							let msg = "Unable to retrieve Seller products";
							reject(msg);
						});
				}

				resolve({ total_products, total_sales: total });
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve Seller products";
				reject(msg);
			});
	});

exports.fetchSellerHistory = (req) =>
	new Promise((resolve, reject) => {
		const { seller_id, firstPageIndex, lastPageIndex } = req;
		if (!seller_id) {
			let msg = "seller_id is empty";
			reject(msg);
		}
		products
			.where("seller_id", "==", seller_id)
			.where("auction_status", "==", auction_status.COMPLETED)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				const filteredData = data.filter(
					(n) =>
						n.product_transaction_status === product_transaction_status.SENT ||
						n.product_transaction_status ==
							product_transaction_status.PENDING ||
						n.product_transaction_status == product_transaction_status.PAID
				);
				Promise.all(
					filteredData.map((product) =>
						db
							.doc(`/bids/${product.selected_bid}`)
							.get()
							.then((querySnapshot) => {
								let bid = querySnapshot.data();

								return {
									...product,
									highest_bid: bid.bid_price,
									user_id: bid.user_id,
								};
							})
							.catch((err) => {
								console.log(err);
								let msg = "Unable to retrieve Seller products";
								reject(msg);
							})
					)
				)
					.then((list) => {
						const length = list.length;
						const filteredList = list.slice(firstPageIndex, lastPageIndex);
						resolve({ data: filteredList, length: length });
					})
					.catch((err) => {
						console.log(err);
						let msg = "Unable to retrieve Seller products";
						reject(msg);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve Seller products";
				reject(msg);
			});
	});

exports.fetchSellerCompleted = (req) =>
	new Promise((resolve, reject) => {
		const { seller_id, firstPageIndex, lastPageIndex } = req;
		if (!seller_id) {
			let msg = "seller_id is empty";
			reject(msg);
		}
		products
			.where("seller_id", "==", seller_id)
			.where("auction_status", "==", auction_status.COMPLETED)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				const filteredData = data.filter(
					(n) =>
						n.product_transaction_status ===
							product_transaction_status.SETTLED ||
						n.product_transaction_status === product_transaction_status.DISPUTE
				);
				Promise.all(
					filteredData.map((product) =>
						db
							.doc(`/bids/${product.selected_bid}`)
							.get()
							.then((querySnapshot) => {
								let bid = querySnapshot.data();

								return {
									...product,
									highest_bid: bid.bid_price,
									user_id: bid.user_id,
								};
							})
							.catch((err) => {
								console.log(err);
								let msg = "Unable to retrieve Seller products";
								reject(msg);
							})
					)
				)
					.then((list) => {
						const length = list.length;
						const filteredList = list.slice(firstPageIndex, lastPageIndex);
						resolve({ data: filteredList, length: length });
					})
					.catch((err) => {
						console.log(err);
						let msg = "Unable to retrieve Seller products";
						reject(msg);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve Seller products";
				reject(msg);
			});
	});

/**
 * Upload the image file to Firebase Storage
 * @param {File} file object that will be uploaded to Firebase Storage
 */
// const uploadImageToStorage = (file) =>
// 	new Promise((resolve, reject) => {
// 		if (!file) {
// 			reject("No image file");
// 		}

// 		let newFileName = `${Date.now()}_${file.originalname.replace(/\s/g, "")}`;

// 		let fileUpload = bucket.file(`images/${newFileName}`);

// 		const blobStream = fileUpload.createWriteStream({
// 			uploadType: "media",
// 			metadata: {
// 				metadata: {
// 					firebaseStorageDownloadTokens: uuid(),
// 					contentType: file.mimetype,
// 				},
// 			},
// 		});

// 		blobStream.on("error", () => {
// 			reject("Something is wrong! Unable to upload at the moment.");
// 		});

// 		blobStream.on("finish", () => {
// 			// The public URL can be used to directly access the file via HTTP.
// 			const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
// 			resolve(url);
// 		});

// 		blobStream.end(file.buffer);
// 	});

exports.addProduct = (req) =>
	new Promise((resolve, reject) => {
		const {
			title,
			user_id,
			base_price,
			description,
			product_picture,
			picture,
			product_category,
		} = req;
		const data = {
			title,
			seller_id: user_id,
			base_price,
			product_picture,
			// product_document,
			description,
			picture,
			product_category,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			auction_status: auction_status.DRAFT,
			product_transaction_status: product_transaction_status.PENDING,
		};
		const { valid, errors } = validateAddProductData(data);
		if (!valid) resolve(errors);

		products
			.add(data)
			.then((docRef) => {
				resolve({ ...data, id: docRef.id });
				// index
				// .saveObject({
				// 	title,
				// 	base_price,
				// 	description,
				// 	product_category,
				// 	product_picture,
				// 	objectID: docRef.id,
				// })
				// .then(({ objectID }) => {

				// });
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to add the Product";
				reject(msg);
			});
	});

exports.deleteProduct = (productId) =>
	new Promise((resolve, reject) => {
		products
			.doc(productId)
			.delete()
			.then(() => {
				index.deleteObject(productId).then(() => {
					resolve();
				});
			})
			.catch(() => {
				let msg = "Unable to delete the product";
				reject(msg);
			});
	});

exports.updateProduct = (product) =>
	new Promise((resolve, reject) => {
		const { valid, errors } = validateUpdateProductData(product);
		if (!valid) resolve(errors);
		products
			.doc(product.id)
			.set({ ...product }, { merge: true })
			.then(() => {
				index
					.saveObject({
						title: product.title,
						base_price: parseInt(product.base_price),
						description: product.description,
						product_category: product.product_category,
						product_picture: product.product_picture,
						objectID: product.id,
					})
					.then(() => {
						bids
							.where("product_id", "==", product.id)
							.get()
							.then((querySnapshot) => {
								const data = querySnapshotData(querySnapshot);
								console.log(data);
								let maxValue = 0;
								if (data.length > 0) {
									maxValue = Math.max.apply(
										Math,
										data.map(function (o) {
											return parseInt(o.bid_price);
										})
									);
								}

								resolve({
									product: {
										...product,
										highest_bid: maxValue,
									},
									bids: data,
								});
							})
							.catch(() => {
								let msg = "Unable to update product";
								reject(msg);
							});
					})
					.catch((error) => {
						console.log(error);
						let msg = "Unable to update product";
						reject(msg);
					});
			})
			.catch(() => {
				let msg = "Unable to update product";
				reject(msg);
			});
	});

exports.updateProductShipment = (product_id) =>
	new Promise((resolve, reject) => {
		if (!product_id) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${product_id}`)
			.get()
			.then((querySnapshot) => {
				let product = querySnapshot.data();
				product.id = querySnapshot.id;
				product.product_transaction_status = product_transaction_status.SENT;
				products
					.doc(product.id)
					.set({ ...product }, { merge: true })
					.then(() => {
						resolve(product);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve  product";
				reject(msg);
			});
	});

exports.cancelAuction = (product_id) =>
	new Promise((resolve, reject) => {
		if (!product_id) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${product_id}`)
			.get()
			.then((querySnapshot) => {
				let product = querySnapshot.data();
				product.id = querySnapshot.id;
				product.auction_status = auction_status.CENCELLED;
				products
					.doc(product.id)
					.set({ ...product }, { merge: true })
					.then(() => {
						console.log(product);
						resolve(product);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve  product";
				reject(msg);
			});
	});

const sendMail = (user, product, bid) =>
	new Promise((resolve, reject) => {
		let mailDetails = {
			from: "auctiapp@gmail.com",
			to: user.email,
			subject: "Aucti - Payment Transffered",
			html: buyerReceivedEmail(product, bid),
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

exports.updateProductRecieved = (product_id) =>
	new Promise((resolve, reject) => {
		if (!product_id) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${product_id}`)
			.get()
			.then((querySnapshot) => {
				let product = querySnapshot.data();
				product.id = querySnapshot.id;
				product.product_transaction_status = product_transaction_status.SETTLED;
				products
					.doc(product.id)
					.set({ ...product }, { merge: true })
					.then(() => {
						db.doc(`/bids/${product.selected_bid}`)
							.get()
							.then((querySnapshot) => {
								let bid = querySnapshot.data();
								db.doc(`/users/${product.seller_id}`)
									.get()
									.then((querySnapshot) => {
										let user = querySnapshot.data();
										sendMail(user, product, bid);
										resolve(product);
									})
									.catch((err) => {
										console.log(err);
										let msg = "Unable to retrieve  product";
										reject(msg);
									});
							})
							.catch((err) => {
								console.log(err);
								let msg = "Unable to retrieve  product";
								reject(msg);
							});
					})
					.catch((err) => {
						console.log(err);
						let msg = "Unable to retrieve  product";
						reject(msg);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve  product";
				reject(msg);
			});
	});

exports.updateProductDispute = (product_id) =>
	new Promise((resolve, reject) => {
		if (!product_id) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${product_id}`)
			.get()
			.then((querySnapshot) => {
				let product = querySnapshot.data();
				product.id = querySnapshot.id;
				product.product_transaction_status = product_transaction_status.DISPUTE;
				products
					.doc(product.id)
					.set({ ...product }, { merge: true })
					.then(() => {
						console.log(product);
						resolve(product);
					});
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve  product";
				reject(msg);
			});
	});
