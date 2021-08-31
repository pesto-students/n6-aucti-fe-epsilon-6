const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/.netlify/functions/api/",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true,
    })
  );
};
