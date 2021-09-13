const express = require("express");
const {
	addBankAccount,
	fetchUserBankDetails,
	deleteBankAccounts,
} = require("../services/bankAccount.service");
const router = express.Router();

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

router.get("/:user", (req, res) => {
	const { user } = req.params;
	fetchUserBankDetails(user)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
	const { account } = req.body;
	addBankAccount(account)
		.then((data) => res.status(201).send(data))
		.catch((err) => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	deleteBankAccounts(id)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

module.exports = router;
