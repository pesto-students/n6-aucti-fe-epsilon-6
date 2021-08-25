const { admin, db } = require("../util/admin");
const bids = db.collection("bids");

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

exports.fetchUserBids = (user_id) =>
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
				resolve(data);
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
		};
		console.log(data);
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
		if (!bid.bid_price) {
			let msg = "Bid price must not be empty";
			reject(msg);
		}
		bids
			.doc(bid.id)
			.set({ ...bid }, { merge: true })
			.then(resolve())
			.catch(() => {
				let msg = "Unable to update the bid";
				reject(msg);
			});
	});
