import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/planning-porker-google-meet",
  images: {
    unoptimized: true, // 画像最適化を無効化
  },
};

export default nextConfig;
