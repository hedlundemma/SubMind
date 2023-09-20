require('dotenv').config();
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/subscriptionDetails/:slug',
        destination: '/subscriptionDetails/:slug',
      },
    ];
  },
    reactStrictMode: true,
    env: {
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    }
  };
  