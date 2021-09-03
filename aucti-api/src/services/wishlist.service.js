const { admin, db } = require("../util/admin");
const wishlist = db.collection("wishlist");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllWishlist = () =>
	new Promise((resolve, reject) => {
		wishlist
			.orderBy("createdAt", "desc")
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

exports.fetchUserWishlist = (user_id) =>
	new Promise((resolve, reject) => {
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}
		wishlist
			.where("user_id", "==", user_id)
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve User wishlist";
				reject(msg);
			});
	});

exports.addWishlist = async (req) =>
	await new Promise((resolve, reject) => {
		try{
		const { user_id, product_id } = req.body;
		console.log(user_id, product_id)
		const data = {
			user_id,
			product_id,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		};

		wishlist
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch((e) => {
				let msg = "Unable to add the product to wishlist";
				console.log(e)
				reject(msg);
			});
		}
		catch(e){
			console.log(e)
		}
	});


exports.deleteWishlist = (wishlistID) =>
	new Promise((resolve, reject) => {
		wishlist
			.doc(wishlistID)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the wishlist";
				reject(msg);
			});
	});
