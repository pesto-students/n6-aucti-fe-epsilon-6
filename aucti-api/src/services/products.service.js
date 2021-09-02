const { admin, db } = require("../util/admin");
const { index } = require("../util/algolia");
const products = db.collection("products");
const bids = db.collection("bids");

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

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllProducts = () =>
	new Promise((resolve, reject) => {
		products
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
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
				// const data = querySnapshotData(querySnapshot);

				resolve(product);
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
					(n) => n.auction_status !== auction_status.COMPLETED
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
		} = req;
		const data = {
			title,
			seller_id: user_id,
			base_price,
			product_picture,
			// product_document,
			description,
			picture,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			auction_status: auction_status.DRAFT,
			product_transaction_status: product_transaction_status.PENDING,
		};
		const { valid, errors } = validateAddProductData(data);
		if (!valid) resolve(errors);

		products
			.add(data)
			.then((docRef) => {
				index
					.saveObject({
						title,
						base_price,
						description,
						product_picture,
						objectID: docRef.id,
					})
					.then(({ objectID }) => {
						resolve({ ...data, id: objectID });
					});
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
						base_price: product.base_price,
						description: product.description,
						product_picture: product.product_picture,
						objectID: product.id,
					})
					.then(() => {
						bids
							.where("product_id", "==", product.id)
							// .orderBy("createdAt", "desc")
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
								console.log({
									product: {
										...product,
										highest_bid: maxValue,
									},
									bids: data,
								});

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
