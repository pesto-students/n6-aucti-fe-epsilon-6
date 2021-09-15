const express = require("express");
const router = express.Router();

const {
	addBid,
	deleteBid,
	fetchAllBids,
	fetchUserIdBids,
	fetchUserBids,
	updateBid,
	fetchUserInsights,
	fetchBuyerBidHistory,
	fetchProductBids,
	selectHighestBid,
	makePayment,
	fetchBuyerBidCompleted,
	getBidPaymentProduct,
} = require("../services/bids.service");

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

router.get("/", (req, res) => {
	fetchAllBids()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});
router.get("/user/:user_id", (req, res) => {
	const user_id = req.params.user_id;
	fetchUserIdBids(user_id)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/:user_id,:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchUserBids(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/insights/:user_id", (req, res) => {
	const { user_id } = req.params;
	fetchUserInsights(user_id)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/history/:user_id,:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchBuyerBidHistory(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/completed/:user_id,:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchBuyerBidCompleted(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get(
	"/products/:product_id,:firstPageIndex,:lastPageIndex",
	(req, res) => {
		fetchProductBids(req.params)
			.then((data) => res.json(data))
			.catch((err) => res.status(500).json(err));
	}
);

router.post("/", (req, res) => {
	addBid(req)
		.then((data) => res.status(201).send(data))
		.catch((err) => res.status(500).json(err));
});

router.post("/payment", (req, res) => {
	makePayment(req)
		.then((msg) => res.status(201).send(msg))
		.catch((err) => res.status(500).json(err));
});

router.get("/bidPayemnt/:bidId", (req, res) => {
	const { bidId } = req.params;

	getBidPaymentProduct(bidId)
		.then((data) => res.json(data))
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
		.then((data) => res.json(data))
		.catch((err) => res.status(500).json(err));
});

router.put("/highestBid", (req, res) => {
	const { bid_id } = req.body;
	selectHighestBid(bid_id)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
