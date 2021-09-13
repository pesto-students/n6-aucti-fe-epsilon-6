const { admin, db } = require("../util/admin");
const bankAccounts = db.collection("bankAccounts");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchUserBankDetails = (user_id) =>
	new Promise((resolve, reject) => {
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}
		bankAccounts
			.where("user_id", "==", user_id)
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

exports.addBankAccount = async (req) =>
	await new Promise((resolve, reject) => {
		const {
			user_id,
			account_name,
			bank_name,
			branch_name,
			account_no,
			ifsc_code,
		} = req;
		const data = {
			user_id,
			account_name,
			bank_name,
			branch_name,
			account_no,
			ifsc_code,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		};

		bankAccounts
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the bank details";
				reject(msg);
			});
	});

exports.deleteBankAccounts = (id) =>
	new Promise((resolve, reject) => {
		bankAccounts
			.doc(id)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the bank account details";
				reject(msg);
			});
	});
