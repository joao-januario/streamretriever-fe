import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.jtvnw.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd3aqoihi2n8ty8.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
