import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['100.107.249.94'],
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: `${BACKEND_URL}/media/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `${BACKEND_URL}/static/:path*`,
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
