require("dotenv").config();
const withPWA = require('next-pwa')
/** @type {import('next').NextConfig} */
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
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
};


module.exports = nextConfig;