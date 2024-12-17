import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { proxyConfig } from './utils/proxy-configs';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const handleProxy = (config) => {
      return createProxyMiddleware({
        target: config.targetUrl,
        changeOrigin: true,
        pathRewrite: config.pathRewrite,
        on: {
          proxyReq: (proxyReq, req, res) => {},
          proxyRes: (proxyRes, req, res) => {
            proxyRes.pipe(res); // Pipe
          },
          error: (err, req, res) => {
            console.error('API Gateway proxy error', {
              method: req.method,
              'req-body': (req as any).body,
              url: req.url,
              err,
            });
            (res as Response).status(503).send('API Gateway error');
          },
        },
      });
    };

    for (const config of proxyConfig) {
      if (
        config.includedPaths.filter((includePath) =>
          req.path.match(includePath),
        ).length > 0
      ) {
        const proxyMiddleware = handleProxy(config);

        return proxyMiddleware(req, res, next); // <-- This ensures proxy middleware is applied
      }
    }

    // If no proxy config matches, proceed to the next middleware
    next();
  }
}
