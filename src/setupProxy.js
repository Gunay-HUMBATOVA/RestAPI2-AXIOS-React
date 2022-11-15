const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite: { "^/api1": ""},
};

module.exports = function (app) {
    app.use(createProxyMiddleware("/api1", proxy));
};
