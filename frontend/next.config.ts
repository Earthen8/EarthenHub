import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['100.107.249.94'],
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/:path*` : `${BACKEND_URL}/media/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*/`,
      },
      {
        source: '/static/:path*',
        destination: `${BACKEND_URL}/static/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'earthen.my.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;