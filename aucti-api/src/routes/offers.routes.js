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

router.get("/", (req, res) => {
	fetchAllOffers()
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/:productId", (req, res) => {
	const { productId } = req.params;
	fetchProductOffer(productId)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/offer/:percentage", (req, res) => {
	const { percentage } = req.params;
	fetchAllOfferPersentage(percentage)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.post("/", (req, res) => {
	addOffer(req)
		.then((id) => res.status(201).send(id))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

router.delete("/:offerId", (req, res) => {
	const { offerId } = req.params;
	deleteOffer(offerId)
		.then(() => res.status(204).send("Deleted successfully"))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.put("/", (req, res) => {
	const { notification } = req.body;
	updateOffer(notification)
		.then((data) => res.status(200).send(data))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

module.exports = router;
