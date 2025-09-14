/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // allows build to succeed even if ESLint errors exist
  },
}

module.exports = nextConfig
