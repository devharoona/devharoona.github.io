/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'live.staticflickr.com' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
    ],
  },
};

module.exports = nextConfig;
