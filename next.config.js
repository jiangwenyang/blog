/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "components", "lib", "utils", "typings"],
  },
};

module.exports = nextConfig;
