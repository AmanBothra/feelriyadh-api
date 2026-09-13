/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withOptimizedImages = require('next-optimized-images');

module.exports = withBundleAnalyzer(
  withOptimizedImages({
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    reactStrictMode: true,
    staticPageGenerationTimeout: 10000,
    images: {
      domains: ['feelriyadh.com', 'api.feelriyadh.com', '13.127.163.87'], // Add 'api.feelriyadh.com' to the domains
      loader: 'default',
    },
  }),
);
