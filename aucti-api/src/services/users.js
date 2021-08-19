const { admin, db } = require('../util/admin');
const users = db.collection('users');

exports.fetchAllUsers = () =>
	new Promise((resolve, reject) => {
		users
			//   .orderBy("order", "asc")
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

exports.addSeller = (createdAt, account_status, alias_name, address, phone_number, role, rating) =>
	new Promise((resolve, reject) => {
		const data = {
			createdAt: admin.firestore().FieldValue.serverTimestamp(),
			account_status: 'pending',
			alias_name,
			address,
			phone_number,
			role: 'seller',
			rating,
		};
		users
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = 'Unable to add the task';
				reject(msg);
			});
	});

exports.addBuyer = (createdAt, account_status, alias_name, address, phone_number, role, rating) =>
	new Promise((resolve, reject) => {
		const data = {
			createdAt: admin.firestore().FieldValue.serverTimestamp(),
			account_status: 'approved',
			alias_name,
			address,
			phone_number,
			role: 'buyer',
			rating,
		};
		users
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = 'Unable to add the task';
				reject(msg);
			});
	});

exports.addAdmin = (createdAt, account_status, alias_name, address, phone_number, role, rating) =>
	new Promise((resolve, reject) => {
		const data = {
			createdAt: admin.firestore().FieldValue.serverTimestamp(),
			account_status: 'approved',
			alias_name,
			address,
			phone_number,
			role: 'admin',
			rating,
		};
		users
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = 'Unable to add the task';
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
				let msg = 'Unable to delete the category';
				reject(msg);
			});
	});

exports.updateUser = (user) =>
	new Promise((resolve, reject) => {
		users
			.doc(user.id)
			.set({ ...user }, { merge: true })
			.then(() => resolve())
			.catch(() => {
				let msg = 'Unable to update category';
				reject(msg);
			});
	});
