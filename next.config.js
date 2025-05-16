/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Set to false to prevent double socket connections in development
    env: {
      // Environment variables
      N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/debate'
    }
  };
  
  module.exports = nextConfig;