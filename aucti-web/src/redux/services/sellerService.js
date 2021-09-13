import { bankAccountURL, bidsURL, productURL } from "../apis";
import { firebase } from "../../config/firebase";
import resizer from "../../config/resizer";
import api from "../api";

export const getSellerProducts = (userId, firstPageIndex, lastPageIndex) => {
	return api
		.get(
			productURL +
				"/seller/" +
				userId +
				"," +
				firstPageIndex +
				"," +
				lastPageIndex
		)
		.then((res) => res.data);
};

export const getSellerInsights = (userId) => {
	return api.get(productURL + "/insights/" + userId).then((res) => res.data);
};

export const uploadPicture = async (product_picture) => {
	let file = await resizer(product_picture);
	return new Promise((resolve, reject) => {
		var storage = firebase.storage();
		var storageRef = storage.ref(`/images/${product_picture.name}`);
		var uploadTask = storageRef.put(file);

		uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			(snapshot) => {
				var progress =
					Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(progress);
			},
			(error) => {
				console.log(error);
				reject(error);
			},
			() => {
				// uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

				uploadTask.snapshot.ref.getDownloadURL().then((url) => {
					console.log(url);
					resolve(url);
				});
			}
		);
	});
};

export const deleteAndUploadPicture = async (picture, product_picture) => {
	let file = await resizer(product_picture);
	return new Promise((resolve, reject) => {
		let name = picture;
		var storage = firebase.storage();
		var storageRef = storage.ref(`/images/${name}`);
		var deleteTask = storageRef.delete();
		deleteTask
			.then(() => {
				var storage = firebase.storage();
				var storageRef = storage.ref(`/images/${product_picture.name}`);
				var uploadTask = storageRef.put(file);

				uploadTask.on(
					firebase.storage.TaskEvent.STATE_CHANGED,
					(snapshot) => {
						var progress =
							Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(progress);
					},
					(error) => {
						console.log(error);
						reject(error);
					},
					() => {
						// uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

						uploadTask.snapshot.ref.getDownloadURL().then((url) => {
							console.log(url);
							resolve(url);
						});
					}
				);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
};

export const addProduct = (product) => {
	return api.post(productURL, { product }).then((res) => res.data);
};

export const updateProduct = (product) => {
	return api.put(productURL, { product }).then((res) => res.data);
};

export const updateBid = (bid_id) => {
	return api.put(bidsURL + "/highestBid", { bid_id }).then((res) => res.data);
};

export const confirmShipment = (product_id, bank_id) => {
	return api
		.put(productURL + "/shipment", { product_id, bank_id })
		.then((res) => res.data);
};

export const cancelAuction = (product_id) => {
	return api
		.put(productURL + "/cancellation", { product_id })
		.then((res) => res.data);
};

export const loadBidsWithUsers = (productId, firstPageIndex, lastPageIndex) => {
	return api
		.get(
			bidsURL +
				"/products/" +
				productId +
				"," +
				firstPageIndex +
				"," +
				lastPageIndex
		)
		.then((res) => res.data);
};

export const getSellerHistory = (userId, firstPageIndex, lastPageIndex) => {
	return api
		.get(
			productURL +
				"/history/" +
				userId +
				"," +
				firstPageIndex +
				"," +
				lastPageIndex
		)
		.then((res) => res.data);
};

export const getSellerCompleted = (userId, firstPageIndex, lastPageIndex) => {
	return api
		.get(
			productURL +
				"/completed/" +
				userId +
				"," +
				firstPageIndex +
				"," +
				lastPageIndex
		)
		.then((res) => res.data);
};

export const saveBankAccount = (account) => {
	return api.post(bankAccountURL, { account }).then((res) => res.data);
};

export const getSellerBankAccount = (id) => {
	return api.get(bankAccountURL + "/" + id).then((res) => res.data);
};

export const deleteSellerBankAccount = (id) => {
	return api.delete(bankAccountURL + "/" + id).then((res) => res.data);
};
