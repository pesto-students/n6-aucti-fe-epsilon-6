const { admin, db } = require("../util/admin");
const { fetchProduct } = require("./products.service");
const wishlist = db.collection("wishlist");
const bids = db.collection("bids");

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
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				Promise.all(
					data.map((bid) =>
						fetchProduct(bid.product_id)
							.then((product) => {
								return {
									...bid,
									product: {
										id: product.id,
										title: product.title,
										base_price: product.base_price,
										auction_status: product.auction_status,
									},
								};
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							})
					)
				)
					.then((list) => {
						Promise.all(
							list.map((bid) =>
								bids
									.where("product_id", "==", bid.product_id)
									.get()
									.then((querySnapshot) => {
										const data = querySnapshotData(querySnapshot);

										let maxValue = 0;
										if (data.length > 0) {
											maxValue = Math.max.apply(
												Math,
												data.map(function (o) {
													return parseInt(o.bid_price);
												})
											);
										}

										return {
											...bid,
											product: {
												...bid.product,
												highest_bid: maxValue,
											},
										};
									})
									.catch((err) => {
										let msg = "Unable to retrieve User bids";
										console.log(err);
										reject(msg);
									})
							)
						)
							.then((finalList) => {
								resolve(finalList);
							})
							.catch((err) => {
								let msg = "Unable to retrieve User bids";
								console.log(err);
								reject(msg);
							});
					})
					.catch((err) => {
						let msg = "Unable to retrieve User bids";
						console.log(err);
						reject(msg);
					});
			})
			.catch((err) => {
				let msg = "Unable to retrieve User bids";
				console.log(err);
				reject(msg);
			});
	});

exports.addWishlist = async (req) =>
	await new Promise((resolve, reject) => {
		const { user_id, product_id } = req.body;
		const data = {
			user_id,
			product_id,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		};

		wishlist
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the product to wishlist";
				reject(msg);
			});
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
