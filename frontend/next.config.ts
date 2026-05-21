import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['100.107.249.94'],
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${BACKEND_URL}/admin/:path*`,
      },
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
  skipTrailingSlashRedirect: true,
};

export default nextConfig;