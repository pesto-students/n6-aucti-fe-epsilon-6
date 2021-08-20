const express = require('express');
const router = express.Router();
const Multer = require('multer');
const {
	fetchAllProducts,
	fetchSellerProducts,
	addProduct,
	deleteProduct,
	updateProduct,
	fetchProduct,
} = require('../services/products.service.js');

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	},
});

// const isAuthenticated = require('../middlewares');
// router.use(isAuthenticated);

router.get('/', (req, res) => {
	fetchAllProducts()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get('/:productId', (req, res) => {
	const { productId } = req.params;
	fetchProduct(productId)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get('/seller/:seller', (req, res) => {
	const { seller } = req.params;
	fetchSellerProducts(seller)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post('/', multer.single('product_picture'), (req, res) => {
	addProduct(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete('/:productId', (req, res) => {
	const { productId } = req.params;
	deleteProduct(productId)
		.then(() => res.status(200).send('Deleted successfully'))
		.catch((err) => res.status(500).send(err));
});

router.put('/', (req, res) => {
	const { product } = req.body;
	updateProduct(product)
		.then(() => res.status(200).send('Product updated'))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
