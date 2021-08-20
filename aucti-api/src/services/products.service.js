const { admin, db } = require('../util/admin');
const { index } = require('../util/algolia');
const products = db.collection('products');

const bucket = admin.storage().bucket('gs://auctiweb.appspot.com/');
const uuid = require('uuid-v4');

const {
	product_transaction_status,
	product_approval_status,
	auction_status,
} = require('../util/constants');

const {
	validateAddProductData,
	validateUpdateProductData,
} = require('../util/validators');

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllProducts = () =>
	new Promise((resolve, reject) => {
		products
			.orderBy('createdAt', 'desc')
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = 'Unable to retrieve Products!';
				reject(msg);
			});
	});

exports.fetchProduct = (productId) =>
	new Promise((resolve, reject) => {
		if (!productId) {
			let msg = 'productId is empty';
			reject(msg);
		}
		products
			.where('id', '==', productId)
			.orderBy('createdAt', 'desc')
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = 'Unable to retrieve  product';
				reject(msg);
			});
	});

exports.fetchSellerProducts = (seller_id) =>
	new Promise((resolve, reject) => {
		if (!seller_id) {
			let msg = 'seller_id is empty';
			reject(msg);
		}
		products
			.where('seller_id', '==', seller_id)
			.orderBy('createdAt', 'desc')
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = 'Unable to retrieve Seller products';
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
			reject('No image file');
		}

		let newFileName = `${Date.now()}_${file.originalname.replace(/\s/g, '')}`;

		let fileUpload = bucket.file(`images/${newFileName}`);

		const blobStream = fileUpload.createWriteStream({
			uploadType: 'media',
			metadata: {
				metadata: {
					firebaseStorageDownloadTokens: uuid(),
					contentType: file.mimetype,
				},
			},
		});

		blobStream.on('error', () => {
			reject('Something is wrong! Unable to upload at the moment.');
		});

		blobStream.on('finish', () => {
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
								console.log(objectID, 'index updated');
								resolve({ ...data, id: objectID });
							});
					})
					.catch(() => {
						let msg = 'Unable to add the task';
						reject(msg);
					});
			})
			.catch(() => {
				let msg = 'Unable to add the task';
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
				let msg = 'Unable to delete the product';
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
				index.partialUpdateObject(product).then(() => resolve());
			})
			.catch(() => {
				let msg = 'Unable to update product';
				reject(msg);
			});
	});
