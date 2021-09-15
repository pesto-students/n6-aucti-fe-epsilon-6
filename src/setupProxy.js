const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    proxy('/.netlify/functions/', {
      // target: "http://localhost:9000/",
      target: 'https://aucti-be.netlify.app/.netlify/functions/api',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    }),
  );
};
