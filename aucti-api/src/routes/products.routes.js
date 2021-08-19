const express = require('express');
const router = express.Router();
const Multer = require('multer');
const {
	fetchAllProducts,
	fetchSellerProducts,
	addProduct,
	deleteProduct,
	updateProduct,
} = require('../services/products.service.js');

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	},
});

router.get('/', (req, res) => {
	fetchAllProducts()
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.get('/seller', (req, res) => {
	const { seller_id } = req.query;
	fetchSellerProducts(seller_id)
		.then((data) => res.json(data))
		.catch((err) => res.status(500).send(err));
});

router.post('/', multer.single('product_picture'), (req, res) => {
	addProduct(req)
		.then((id) => res.status(201).send(id))
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while adding product.',
			});
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
		.catch((err) => res.status(500).send(err));
});

module.exports = router;
