import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api-dev.mrcoachpro.in',
      },
      {
        protocol: 'https',
        hostname: 'api.mrcoachpro.in',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'mrcoachpro.vercel.app',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/shop/:path*',
        destination: '/products/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
