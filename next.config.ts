import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  env: {
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  },
};

export default nextConfig;
