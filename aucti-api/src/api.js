require("dotenv").config();
const express = require("express");
let cors = require("cors");
const serverless = require("serverless-http");

const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const usersRouter = require("./routes/users.routes");
const bidsRouter = require("./routes/bids.routes");
const wishlistRouter = require("./routes/wishlist.routes");
const notificationRouter = require("./routes/notifications.routes");
const offersRouter = require("./routes/offers.routes");
const productsRouter = require("./routes/products.routes");
const publicRouter = require("./routes/public.routes");
const addressRouter = require("./routes/address.routes");
const bankAccountRouter = require("./routes/bankAccount.routes");

const allowedOrigin = process.env.ALLOWED_ORIGIN_URL;

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin === origin) {
      callback(null, true);
    } else {
      // callback(new Error("Not allowed by CORS"));
      callback(null, true);
    }
  },
};

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/public", publicRouter);
router.use("/bids", bidsRouter);
router.use("/wishlists", wishlistRouter);
router.use("/addresses", addressRouter);
router.use("/notifications", notificationRouter);
router.use("/bank", bankAccountRouter);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
