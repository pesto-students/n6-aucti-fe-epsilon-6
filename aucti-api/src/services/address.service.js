const { admin, db } = require("../util/admin");
const addresses = db.collection("addresses");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllAddress = () =>
	new Promise((resolve, reject) => {
		addresses
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve wishlist data";
				reject(msg);
			});
	});

exports.fetchUserAddress = (user_id) =>
	new Promise((resolve, reject) => {
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}
		addresses
			.where("user_id", "==", user_id)
			// .orderBy("createdAt", "desc")
			// .startAt(startAt)
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.addAddress = async (req) =>
	await new Promise((resolve, reject) => {
		const { user_id, address, city, state, zip } = req;
		const data = {
			user_id,
			address,
			city,
			state,
			zip,
			country: "India",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		};

		addresses
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the address";
				reject(msg);
			});
	});

exports.deleteAddress = (id) =>
	new Promise((resolve, reject) => {
		addresses
			.doc(id)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the wishlist";
				reject(msg);
			});
	});
