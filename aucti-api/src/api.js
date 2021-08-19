require("dotenv").config();
const express = require("express");
let cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
let admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://auctiweb-default-rtdb.firebaseio.com"
  });
}

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

const app = express();
const router = express.Router();

const allowedOrigin = process.env.ALLOWED_ORIGIN_URL;

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin !== origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

router.use("/products", productsRouter);
router.use("/users", usersRouter);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
