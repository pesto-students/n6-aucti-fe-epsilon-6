const express = require("express");
const router = express.Router();

const {
	addOffer,
	deleteOffer,
	fetchAllOfferPersentage,
	fetchAllOffers,
	fetchProductOffer,
	updateOffer,
} = require("../services/offers.service");

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

router.get("/", (req, res) => {
	fetchAllOffers()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/:productId", (req, res) => {
	const { productId } = req.params;
	fetchProductOffer(productId)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/offer/:percentage", (req, res) => {
	const { percentage } = req.params;
	fetchAllOfferPersentage(percentage)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
	addOffer(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => res.status(500).json(err));
});

router.delete("/:offerId", (req, res) => {
	const { offerId } = req.params;
	deleteOffer(offerId)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

router.put("/", (req, res) => {
	const { notification } = req.body;
	updateOffer(notification)
		.then(() => res.status(200).send("Offer updated successfully"))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
