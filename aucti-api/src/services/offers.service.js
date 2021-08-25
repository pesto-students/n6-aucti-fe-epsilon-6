const { admin, db } = require("../util/admin");
const offers = db.collection("offers");

const { offer_status } = require("../util/constants");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllOffers = () =>
	new Promise((resolve, reject) => {
		offers
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve offers data";
				reject(msg);
			});
	});

exports.fetchAllOfferPersentage = (persentage) =>
	new Promise((resolve, reject) => {
		if (!persentage) {
			let msg = "persentage is empty";
			reject(msg);
		}
		offers
			.where("offer", "==", persentage)
			.where("status", "==", offer_status.LIVE)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve persentage offer";
				reject(msg);
			});
	});

exports.fetchProductOffer = (productId) =>
	new Promise((resolve, reject) => {
		if (!productId) {
			let msg = "productId is empty";
			reject(msg);
		}
		offers
			.where("product_id", "==", productId)
			.where("status", "==", offer_status.LIVE)
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve product offer";
				reject(msg);
			});
	});

exports.addOffer = async (req) =>
	await new Promise((resolve, reject) => {
		const { product_id, offer } = req.body;
		const data = {
			product_id,
			offer,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			status: offer_status.LIVE,
		};

		offers
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the offer";
				reject(msg);
			});
	});

exports.deleteOffer = (offerId) =>
	new Promise((resolve, reject) => {
		offers
			.doc(offerId)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the offer";
				reject(msg);
			});
	});

exports.updateOffer = (offer) =>
	new Promise((resolve, reject) => {
		offer.status = offer_status.STOP;
		offers
			.doc(offer.id)
			.set({ ...offer }, { merge: true })
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to update the offer status";
				reject(msg);
			});
	});
