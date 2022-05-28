const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://i6d103.p.ssafy.io:8181/',
      changeOrigin: true,
    })
  );
};