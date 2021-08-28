const express = require("express");
const router = express.Router();

const {
	addWishlist,
	deleteWishlist,
	fetchAllWishlist,
	fetchUserWishlist,
} = require("../services/wishlist.service");

router.get("/", (req, res) => {
	fetchAllWishlist()
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/:user", (req, res) => {
	const { user } = req.params;
	fetchUserWishlist(user)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.post("/", (req, res) => {
	addWishlist(req)
		.then((id) => res.status(201).send(id))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

router.delete("/:wishlistId", (req, res) => {
	const { wishlistId } = req.params;
	deleteWishlist(wishlistId)
		.then(() => res.status(204).send("Deleted successfully"))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

module.exports = router;
