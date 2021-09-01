const express = require("express");
const router = express.Router();

const {
	fetchAllUsers,
	addSeller,
	addBuyer,
	addAdmin,
	deleteUser,
	updateUser,
	fetchUser,
} = require("../services/users.service");

router.get("/", (req, res) => {
	fetchAllUsers()
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/:userId", (req, res) => {
	const { userId } = req.params;
	fetchUser(userId)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.post("/seller", (req, res) => {
	addSeller(req)
		.then((data) => res.status(201).send(data))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

router.post("/buyer", (req, res) => {
	addBuyer(req)
		.then((id) => res.status(201).send(id))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

router.post("/admin", (req, res) => {
	addAdmin(req)
		.then((id) => res.status(201).send(id))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

router.delete("/:userId", (req, res) => {
	const { userId } = req.params;
	deleteUser(userId)
		.then(() => res.status(204).send("Deleted successfully"))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.put("/", (req, res) => {
	const { user } = req.body;
	updateUser(user)
		.then((data) => res.status(200).send(data))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

module.exports = router;
