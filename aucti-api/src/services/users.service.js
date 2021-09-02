const { admin, db } = require("../util/admin");

const { validateAddUser, validateUser } = require("../util/validators");
const users = db.collection("users");

const { account_status, role } = require("../util/constants");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllUsers = () =>
	new Promise((resolve, reject) => {
		users
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve categories";
				reject(msg);
			});
	});

exports.fetchUser = (userId) =>
	new Promise((resolve, reject) => {
		if (!userId) {
			let msg = "userId is empty";
			reject(msg);
		}

		db.doc(`/users/${userId}`)
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				let user = querySnapshot.data();
				user.id = querySnapshot.id;
				console.log(user);
				resolve(user);
			})
			.catch((err) => {
				console.log(err);
				let msg = "Unable to retrieve user";
				console.log(msg);
				reject(msg);
			});
	});

exports.addSeller = (req) =>
	new Promise((resolve, reject) => {
		const { alias_name, address, phone_number } = req.body;
		const data = {
			createdAt: admin.firestore().FieldValue.serverTimestamp(),
			account_status: account_status.PENDING,
			alias_name,
			address,
			phone_number,
			role: role.SELLER,
			rating: 0,
		};
		const { valid, errors } = validateUser(data);
		if (!valid) resolve(errors);
		users
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the Seller";
				reject(msg);
			});
	});

exports.addBuyer = (req) =>
	new Promise((resolve, reject) => {
		const { alias_name, address, phone_number } = req.body;
		const data = {
			createdAt: admin.firestore().FieldValue.serverTimestamp(),
			account_status: account_status.PENDING,
			alias_name,
			address,
			phone_number,
			role: role.BUYER,
			rating: 0,
		};
		const { valid, errors } = validateUser(data);
		if (!valid) resolve(errors);
		users
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the Buyer";
				reject(msg);
			});
	});

exports.addAdmin = (req) =>
	new Promise((resolve, reject) => {
		const { alias_name, address, phone_number } = req.body;
		const data = {
			createdAt: admin.firestore().FieldValue.serverTimestamp(),
			account_status: account_status.PENDING,
			alias_name,
			address,
			phone_number,
			role: role.ADMIN,
			rating: 0,
		};
		const { valid, errors } = validateUser(data);
		if (!valid) resolve(errors);
		users
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the Admin";
				reject(msg);
			});
	});

exports.deleteUser = (id) =>
	new Promise((resolve, reject) => {
		users
			.doc(id)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the User";
				reject(msg);
			});
	});

exports.updateUser = (user) =>
	new Promise((resolve, reject) => {
		const { valid, errors } = validateUser(user);
		if (!valid) resolve(errors);
		users
			.doc(user.id)
			.set({ ...user }, { merge: true })
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to update the User";
				reject(msg);
			});
	});
