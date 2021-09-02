const { admin, db } = require("../util/admin");
const notifications = db.collection("notifications");

const { notification_status } = require("../util/constants");

const querySnapshotData = (querySnapshot) => {
	return querySnapshot?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
};

exports.fetchAllNotifications = () =>
	new Promise((resolve, reject) => {
		notifications
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve notification data";
				reject(msg);
			});
	});

exports.fetchUserNotification = (user_id) =>
	new Promise((resolve, reject) => {
		if (!user_id) {
			let msg = "User id is empty";
			reject(msg);
		}
		notifications
			.where("user_id", "==", user_id)
			.where("status", "==", notification_status.UNREAD)
			// .orderBy("createdAt", "desc")
			.get()
			.then((querySnapshot) => {
				const data = querySnapshotData(querySnapshot);
				resolve(data);
			})
			.catch((err) => {
				let msg = "Unable to retrieve User notifications";
				reject(msg);
			});
	});

exports.addNotification = async (req) =>
	await new Promise((resolve, reject) => {
		const { title, user_id } = req.body;
		const data = {
			user_id,
			title,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			status: notification_status.UNREAD,
		};

		notifications
			.add(data)
			.then((docRef) => resolve({ ...data, id: docRef.id }))
			.catch(() => {
				let msg = "Unable to add the notification";
				reject(msg);
			});
	});

exports.deleteNotification = (notificationId) =>
	new Promise((resolve, reject) => {
		notifications
			.doc(notificationId)
			.delete()
			.then(() => resolve())
			.catch(() => {
				let msg = "Unable to delete the notification";
				reject(msg);
			});
	});

exports.updateNotification = (notification) =>
	new Promise((resolve, reject) => {
		notification.status = notification_status.READ;
		notifications
			.doc(notification.id)
			.set({ ...notification }, { merge: true })
			.then(() => resolve(notification))
			.catch(() => {
				let msg = "Unable to update the notification status";
				reject(msg);
			});
	});
