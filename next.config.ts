import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ajustes',
        destination: '/settings',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
