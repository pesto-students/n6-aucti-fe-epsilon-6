const nodeExternals = require("webpack-node-externals");

const Dotenv = require("dotenv-webpack");

// @see https://github.com/netlify/netlify-lambda#webpack-configuration
module.exports = {
	externals: [nodeExternals()],
	plugins: [new Dotenv()],
};
