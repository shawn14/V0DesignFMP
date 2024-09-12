/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'cdn.snapi.dev'], // Add this line to allow images from FMP
  },
  async rewrites() {
    return [
      {
        source: '/api/fmp/:path*',
        destination: 'https://financialmodelingprep.com/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
