require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: "/subscriptionDetails/:slug",
        destination: "/subscriptionDetails/:slug",
      },
    ];
  },
  reactStrictMode: true,

  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
});
