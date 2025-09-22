import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "@tailwindcss/postcss": {},
  // Enable static exports for better caching
  output: "standalone",

  // Configure headers for video caching
  async headers() {
    return [
      {
        source: "/videoclip-short.mp4",
        headers: [
          {
            key: "Cache-Control",
            // Cache video for 1 year (31536000 seconds)
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
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
