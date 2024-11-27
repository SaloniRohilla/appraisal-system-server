import { createProxyMiddleware } from 'http-proxy-middleware';

export function middleware(req, res) {
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, 
  })(req, res);
}
