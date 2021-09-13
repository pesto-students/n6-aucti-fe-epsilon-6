const express = require("express");

const routerPublic = express.Router();
const {
	fetchAllProducts,
	fetchProduct,
	fetchAllLatestProducts,
	fetchAllHotProducts,
} = require("../services/products.service.js");

routerPublic.get("/all/:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchAllProducts(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

routerPublic.get("/latest/:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchAllLatestProducts(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

routerPublic.get("/hot/:firstPageIndex,:lastPageIndex", (req, res) => {
	fetchAllHotProducts(req.params)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

routerPublic.get("/:productId", (req, res) => {
	const { productId } = req.params;
	fetchProduct(productId)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

module.exports = routerPublic;
