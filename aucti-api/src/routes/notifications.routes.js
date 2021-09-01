const express = require("express");
const router = express.Router();

const {
	addNotification,
	deleteNotification,
	fetchAllNotifications,
	fetchUserNotification,
	updateNotification,
} = require("../services/notifications.service");

router.get("/", (req, res) => {
	fetchAllNotifications()
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/:user", (req, res) => {
	const { user } = req.params;
	fetchUserNotification(user)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.post("/", (req, res) => {
	addNotification(req)
		.then((id) => res.status(201).send(id))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

router.delete("/:notificationId", (req, res) => {
	const { notificationId } = req.params;
	deleteNotification(notificationId)
		.then(() => res.status(204).send("Deleted successfully"))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.put("/", (req, res) => {
	const { notification } = req.body;
	updateNotification(notification)
		.then((data) => res.status(200).send(data))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

module.exports = router;
