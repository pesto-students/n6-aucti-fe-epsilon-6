const { admin, db } = require("../util/admin");
const { index } = require("../util/algolia");
const products = db.collection("products");
const { productServiceAlerts } = require("../util/alerts");
const bucket = admin.storage().bucket("gs://auctiweb.appspot.com/");
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
				let msg = productServiceAlerts.UNABLE_TO_RETRIVE_PRODUCTS;
				reject(msg);
			});
	});

exports.fetchProduct = (productId) =>
	new Promise((resolve, reject) => {
		console.log("productId", productId);
		if (!productId) {
			let msg = "productId is empty";
			reject(msg);
		}
		db.doc(`/products/${productId}`)
			// .where("id", "==", productId)
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				let product = querySnapshot.data();
				product.id = querySnapshot.id;
				// const data = querySnapshotData(querySnapshot);
				console.log("product", product);
				resolve(product);
			})
			.catch((err) => {
				let msg = productServiceAlerts.UNABLE_TO_RETRIVE_PRODUCT;
				reject(msg);
			});
	});

exports.fetchSellerProducts = (seller_id) =>
	new Promise((resolve, reject) => {
		if (!seller_id) {
			let msg = productServiceAlerts.SELLER_ID_EMPTY;
			reject(msg);
		}
		products
			.where("seller_id", "==", seller_id)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = productServiceAlerts.UNABLE_TO_RETRIVE_SELLER_PRODUCTS;
				reject(msg);
			});
	});

/**
 * Upload the image file to Firebase Storage
 * @param {File} file object that will be uploaded to Firebase Storage
 */
const uploadImageToStorage = (file) =>
	new Promise((resolve, reject) => {
		if (!file) {
			reject("No image file");
		}

		let newFileName = `${Date.now()}_${file.originalname.replace(/\s/g, "")}`;

		let fileUpload = bucket.file(`images/${newFileName}`);

		const blobStream = fileUpload.createWriteStream({
			uploadType: "media",
			metadata: {
				metadata: {
					firebaseStorageDownloadTokens: uuid(),
					contentType: file.mimetype,
				},
			},
		});

		blobStream.on("error", () => {
			reject(productServiceAlerts.IMAGE_UPLOAD_ERROR);
		});

		blobStream.on("finish", () => {
			// The public URL can be used to directly access the file via HTTP.
			const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
			resolve(url);
		});

		blobStream.end(file.buffer);
	});

exports.addProduct = async (req) =>
	await new Promise((resolve, reject) => {
		const product_picture = req.file;
		const { title, seller_id, base_price, product_document, description } =
			req.body;
		const data = {
			title,
			seller_id,
			base_price,
			product_picture,
			product_document,
			description,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			product_approval_status: product_approval_status.PENDING,
			auction_status: auction_status.DRAFT,
			product_transaction_status: product_transaction_status.PENDING,
		};
		const { valid, errors } = validateAddProductData(data);
		if (!valid) resolve(errors);

		uploadImageToStorage(product_picture)
			.then((url) => {
				data.product_picture = url;

				products
					.add(data)
					.then((docRef) => {
						index
							.saveObject({
								title,
								base_price,
								description,
								objectID: docRef.id,
							})
							.then(({ objectID }) => {
								resolve({ ...data, id: objectID });
							});
					})
					.catch(() => {
						let msg = productServiceAlerts.UNABLE_TO_ADD_PRODUCT;
						reject(msg);
					});
			})
			.catch(() => {
				let msg = productServiceAlerts.UNABLE_TO_ADD_PRODUCT;
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
				let msg = productServiceAlerts.UNABLE_TO_DELETE_PRODUCT;
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
				index.partialUpdateObject(product).then((product) => resolve(product));
			})
			.catch(() => {
				let msg = productServiceAlerts.UNABLE_TO_UPDATE_PRODUCT;
				reject(msg);
			});
	});
