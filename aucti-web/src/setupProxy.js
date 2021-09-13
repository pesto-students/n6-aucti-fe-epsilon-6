const proxy = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		proxy("/.netlify/functions/", {
			target: "https://aucti-api.netlify.app/.netlify/functions/api",
			pathRewrite: {
				"^/\\.netlify/functions": "",
			},
		})
	);
};
