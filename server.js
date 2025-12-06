const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = 8080;
// Enable CORS
// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000'
  };
  app.use(cors(corsOptions));
// Serve static files
app.use(express.static(__dirname));
// Proxy /api requests to Grafana
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Authorization', 'Basic YWRtaW46YWRtaW4=');
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});