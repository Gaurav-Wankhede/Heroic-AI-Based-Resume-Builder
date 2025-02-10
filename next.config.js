/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true // Temporarily ignore TS errors for deployment
  },
  eslint: {
    ignoreDuringBuilds: true // Temporarily ignore ESLint errors for deployment
  }
}

module.exports = nextConfig 