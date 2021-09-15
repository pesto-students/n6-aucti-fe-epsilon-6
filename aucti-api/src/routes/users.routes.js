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
	fetchBidUser,
} = require("../services/users.service");

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

router.get("/", (req, res) => {
	fetchAllUsers()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/:userId", (req, res) => {
	const { userId } = req.params;
	fetchUser(userId)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post("/seller", (req, res) => {
	addSeller(req)
		.then((data) => res.status(201).send(data))
		.catch((err) => res.status(500).json(err));
});

router.post("/buyer", (req, res) => {
	addBuyer(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => res.status(500).json(err));
});

router.post("/admin", (req, res) => {
	addAdmin(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => res.status(500).json(err));
});

router.delete("/:userId", (req, res) => {
	const { userId } = req.params;
	deleteUser(userId)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

router.put("/", (req, res) => {
	const { user } = req.body;
	updateUser(user)
		.then(() => res.status(200).send("User updated"))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
