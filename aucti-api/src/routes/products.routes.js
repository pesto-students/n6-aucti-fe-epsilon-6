const express = require("express");
const router = express.Router();
const Multer = require("multer");
const {
	fetchAllProducts,
	fetchSellerProducts,
	addProduct,
	deleteProduct,
	updateProduct,
	fetchProduct,
} = require("../services/products.service.js");

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	},
});

// const isAuthenticated = require('../middlewares');
// router.use(isAuthenticated);

router.get("/", (req, res) => {
	fetchAllProducts()
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/:productId", (req, res) => {
	const { productId } = req.params;
	fetchProduct(productId)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.get("/seller/:seller", (req, res) => {
	const { seller } = req.params;
	fetchSellerProducts(seller)
		.then((data) => res.json(data))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.post("/", multer.single("product_picture"), (req, res) => {
	addProduct(req)
		.then((data) => res.status(201).send(data))
		.catch((err) => {
			res.status(500).json({
				message: err,
			});
		});
});

router.delete("/:productId", (req, res) => {
	const { productId } = req.params;
	deleteProduct(productId)
		.then(() => res.status(204).send("Deleted successfully"))
		.catch((err) =>
			res.status(500).send({
				message: err,
			})
		);
});

router.put("/", (req, res) => {
	const { product } = req.body;
	updateProduct(product)
		.then((data) => res.status(200).send(data))
		.catch((err) =>
			res.status(500).json({
				message: err,
			})
		);
});

module.exports = router;
