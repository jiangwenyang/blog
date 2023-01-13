/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      "@ricons/fluent": {
        transform: "@ricons/fluent/lib/{{member}}",
      },
      "@ricons/material": {
        transform: "@ricons/material/lib/{{member}}",
      },
    },
  },
  eslint: {
    dirs: ["pages", "components", "lib", "utils", "typings"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**.music.126.net",
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
