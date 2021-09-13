const express = require("express");
const router = express.Router();

const {
	fetchAllProducts,
	fetchSellerProducts,
	addProduct,
	deleteProduct,
	updateProduct,
	fetchProduct,
	fetchSellerInsights,
	fetchSellerHistory,
	updateProductShipment,
	fetchSellerCompleted,
	updateProductRecieved,
	updateProductDispute,
	cancelAuction,
	fetchProductPerUser,
	fetchAllLatestProducts,
	fetchAllHotProducts,
} = require("../services/products.service.js");

const isAuthenticated = require("../middlewares");
router.use(isAuthenticated);

// routerPublic.get("/all/:firstPageIndex,:lastPageIndex", (req, res) => {
// 	fetchAllProducts(req.params)
// 		.then((data) => res.json(data))
// 		.catch((err) => res.status(500).send(err));
// });

// routerPublic.get("/latest/:firstPageIndex,:lastPageIndex", (req, res) => {
// 	fetchAllLatestProducts(req.params)
// 		.then((data) => res.json(data))
// 		.catch((err) => res.status(500).send(err));
// });

// routerPublic.get("/hot/:firstPageIndex,:lastPageIndex", (req, res) => {
// 	fetchAllHotProducts(req.params)
// 		.then((data) => res.json(data))
// 		.catch((err) => res.status(500).send(err));
// });

// routerPublic.get("/:productId", (req, res) => {
// 	const { productId } = req.params;
// 	fetchProduct(productId)
// 		.then((data) => res.json(data))
// 		.catch((err) => res.status(500).send(err));
// });

router.get("/product/:productId,:userId", (req, res) => {
	fetchProductPerUser(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/seller/:seller_id,:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchSellerProducts(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/product/:productId,:userId", (req, res) => {
	fetchProductPerUser(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/seller/:seller", (req, res) => {
	const { seller } = req.params;
	fetchSellerProducts(seller)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/insights/:seller_id", (req, res) => {
	const { seller_id } = req.params;

	fetchSellerInsights(seller_id)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get("/history/:seller_id,:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchSellerHistory(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get(
	"/completed/:seller_id,:firstPageIndex,:lastPageIndex",
	(req, res) => {
		fetchSellerCompleted(req.params)
			.then((data) => res.json(data))
			.catch((err) => res.status(500).send(err));
	}
);

router.post("/", (req, res) => {
	const { product } = req.body;
	addProduct(product)
		.then((data) => res.status(201).send(data))
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:productId", (req, res) => {
	const { productId } = req.params;
	deleteProduct(productId)
		.then(() => res.status(200).send("Deleted successfully"))
		.catch((err) => res.status(500).send(err));
});

router.put("/", (req, res) => {
	const { product } = req.body;
	updateProduct(product)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json(err));
});

router.put("/shipment", (req, res) => {
	const { product_id, bank_id } = req.body;
	updateProductShipment(product_id, bank_id)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json(err));
});

router.put("/cancellation", (req, res) => {
	const { product_id } = req.body;
	cancelAuction(product_id)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json(err));
});

router.put("/receieved", (req, res) => {
	const { product_id } = req.body;
	updateProductRecieved(product_id)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json(err));
});

router.put("/dispute", (req, res) => {
	const { product_id } = req.body;
	updateProductDispute(product_id)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
