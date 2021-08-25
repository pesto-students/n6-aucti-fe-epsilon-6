const express = require("express");
const router = express.Router();

const {
	addBid,
	deleteBid,
	fetchAllBids,
	fetchUserBids,
	updateBid,
} = require("../services/bids.service");

router.get("/", (req, res) => {
	fetchAllBids()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/:user", (req, res) => {
	const { user } = req.params;
	fetchUserBids(user)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
	addBid(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => res.status(500).json(err));
});

router.delete("/:bidId", (req, res) => {
	const { bidId } = req.params;
	deleteBid(bidId)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

router.put("/", (req, res) => {
	const { bid } = req.body;
	updateBid(bid)
		.then(() => res.status(200).send("Bid updated successfully"))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
