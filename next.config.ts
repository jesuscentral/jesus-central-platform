import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    stroyblokPrefix: process.env.NEXT_PUBLIC_STORYBLOK_PREFIX,
  },
  async redirects() {
    return [
      {
        source: `/${process.env.NEXT_PUBLIC_BASE_PATH}`,
        destination: "/",
        permanent: true,
      },
      {
        source: `/${process.env.NEXT_PUBLIC_BASE_PATH}/:path*`,
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/agenda",
        permanent: true,
      },
      {
        source: "/global",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/videoclip-short.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        // Apply caching to all static assets
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
