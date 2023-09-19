require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;

// next.config.js
module.exports = {
  // experimental: {
  //   reactServerComponents: true,
  // },
  reactStrictMode: true,
  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
};
