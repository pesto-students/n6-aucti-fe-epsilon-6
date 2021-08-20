require('dotenv').config();
const express = require('express');
let cors = require('cors');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/products.routes');
const usersRouter = require('./routes/users.routes');
const bidsRouter = require('./routes/bids.routes');
const wishlistRouter = require('./routes/wishlist.routes');
const notificationRouter = require('./routes/notifications.routes');
const offersRouter = require('./routes/offers.routes');

const app = express();
const router = express.Router();

const allowedOrigin = process.env.ALLOWED_ORIGIN_URL;

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigin !== origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/bids', bidsRouter);
router.use('/wishlists', wishlistRouter);
router.use('/notifications', notificationRouter);
router.use('/offers', offersRouter);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
