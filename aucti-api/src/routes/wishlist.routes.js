const express = require("express");
const router = express.Router();

const {
	addWishlist,
	deleteWishlist,
	fetchAllWishlist,
	fetchUserWishlist,
} = require("../services/wishlist.service");

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

router.get("/", (req, res) => {
	fetchAllWishlist()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/:user", (req, res) => {
	const { user } = req.params;
	fetchUserWishlist(user)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post("/", (req, res) => {
	addWishlist(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => res.status(500).json(err));
});

router.delete("/:wishlistId", (req, res) => {
	const { wishlistId } = req.params;
	deleteWishlist(wishlistId)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

module.exports = router;
