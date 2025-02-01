import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export",
  basePath: "/planning-porker-google-meet",
  distDir: 'docs',
};

export default nextConfig;
