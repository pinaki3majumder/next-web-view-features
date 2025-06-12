import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // enable static export
  basePath: isProd ? '/your-repo-name' : '',
  trailingSlash: true,
};

export default nextConfig;
