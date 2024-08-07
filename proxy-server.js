const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://practical.mytdigital.tech',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding to the target
    },
}));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});