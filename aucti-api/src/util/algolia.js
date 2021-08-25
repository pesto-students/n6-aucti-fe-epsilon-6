const algoliasearch = require("algoliasearch");

const client = algoliasearch(
	process.env.APLLICATION_ID,
	process.env.ADMIN_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

module.exports = { index };
