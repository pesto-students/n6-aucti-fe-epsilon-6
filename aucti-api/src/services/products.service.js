const { admin, db } = require('../util/admin');
const products = db.collection('products');
const bucket = admin.storage().bucket('gs://auctiweb.appspot.com/');

exports.fetchAllProducts = () =>
	new Promise((resolve, reject) => {
		products
			.orderBy('createdAt', 'desc')
			.get()
			.then((querySnapshot) => {
				const data = querySnapshot?.docs?.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				resolve(data);
			})
			.catch((err) => {
				let msg = 'Unable to retrieve categories';
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
			//   .orderBy("createdAt", "asc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshot?.docs?.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
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
const uploadImageToStorage = (file) => {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject('No image file');
		}

		let newFileName = `${file.originalname.replace(/\s/g, '')}_${Date.now()}`;

		let fileUpload = bucket.file(`images/${newFileName}`);

		const blobStream = fileUpload.createWriteStream({
			metadata: {
				contentType: file.mimetype,
			},
		});

		blobStream.on('error', (error) => {
			reject('Something is wrong! Unable to upload at the moment.');
		});

		blobStream.on('finish', () => {
			// The public URL can be used to directly access the file via HTTP.
			const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
			resolve(url);
		});

		blobStream.end(file.buffer);
	});
};

exports.addProduct = async (req) => {
	const product_picture = req.file;
	let url = null;
	if (product_picture) {
		try {
			url = await uploadImageToStorage(product_picture);
		} catch (err) {
			console.log(err);
		}
	} else {
		throw Error('Product picture not available');
	}

	let id = await new Promise((resolve, reject) => {
		const data = {
			...req.body,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			product_picture: url,
			product_approval_status: 'pending',
			auction_status: 'draft',
			product_transaction_status: 'pending',
		};
		console.log('data', data);
		products
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = 'Unable to add the task';
				reject(msg);
			});
	});
	return id;
};

exports.deleteProduct = (id) =>
	new Promise((resolve, reject) => {
		products
			.doc(id)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = 'Unable to delete the category';
				reject(msg);
			});
	});

exports.updateProduct = (product) =>
	new Promise((resolve, reject) => {
		products
			.doc(product.id)
			.set({ ...product }, { merge: true })
			.then(() => resolve())
			.catch(() => {
				let msg = 'Unable to update category';
				reject(msg);
			});
	});
