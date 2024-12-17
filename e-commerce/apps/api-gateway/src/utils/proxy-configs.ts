export const proxyConfig: UrlProxy[] = [
  {
    targetUrl: 'http://trendyol:3003',
    includedPaths: ['api/v1/trendyol/'],
    pathRewrite: { '^/api/v1/trendyol': '' },
  },
  {
    targetUrl: 'http://e-commerce:3002',
    includedPaths: ['api/v1/e-commerce/'],
    pathRewrite: { '^/api/v1/e-commerce': '' },
  },
  {
    targetUrl: 'http://n11:3005',
    includedPaths: ['api/v1/n11/'],
    pathRewrite: { '^/api/v1/n11': '' },
  },
];

export type UrlProxy = {
  includedPaths: string[];
  targetUrl: string;
  pathRewrite?: { [regexp: string]: string };
};
