import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['100.107.249.94'],
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'http://127.0.0.1:8000/media/:path*',
      },
    ];
  },
};

export default nextConfig;
