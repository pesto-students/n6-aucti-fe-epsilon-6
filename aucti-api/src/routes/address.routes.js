const express = require("express");
const router = express.Router();

const {
	addAddress,
	deleteAddress,
	fetchUserAddress,
	fetchAllAddress,
} = require("../services/address.service");

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

router.get("/", (req, res) => {
	fetchAllAddress()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/:user", (req, res) => {
	const { user } = req.params;
	fetchUserAddress(user)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
	const { address } = req.body;
	addAddress(address)
		.then((data) => res.status(201).send(data))
		.catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	deleteAddress(id)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

module.exports = router;
