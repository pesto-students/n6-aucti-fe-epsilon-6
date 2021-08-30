import axios from "axios";
import { bidsURL, productURL, userURL } from "../api";
import { firebase, auth, firestore } from "../../config/firebase";

export const getSellerProducts = (userId, firstPageIndex, lastPageIndex) => {
	return axios
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
	return axios.get(productURL + "/insights/" + userId).then((res) => res.data);
};

export const uploadPicture = (product_picture) => {
	return new Promise((resolve, reject) => {
		let file = product_picture;
		var storage = firebase.storage();
		var storageRef = storage.ref(`/images/${file.name}`);
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

export const deleteAndUploadPicture = (picture, product_picture) => {
	return new Promise((resolve, reject) => {
		let name = picture;
		var storage = firebase.storage();
		var storageRef = storage.ref(`/images/${name}`);
		var deleteTask = storageRef.delete();
		deleteTask
			.then(() => {
				let file = product_picture;
				var storage = firebase.storage();
				var storageRef = storage.ref(`/images/${file.name}`);
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
	return axios.post(productURL, { product }).then((res) => res.data);
};

export const updateProduct = (product) => {
	return axios.put(productURL, { product }).then((res) => res.data);
};

export const loadBidsWithUsers = (productId, firstPageIndex, lastPageIndex) => {
	return axios
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
