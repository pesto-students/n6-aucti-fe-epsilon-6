require('dotenv').config();
const express = require('express');
let cors = require('cors');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/products.routes');
const usersRouter = require('./routes/users.routes');

const app = express();
const router = express.Router();

const allowedOrigin ='http:// localhost:9000'
// process.env.ALLOWED_ORIGIN_URL;

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

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
