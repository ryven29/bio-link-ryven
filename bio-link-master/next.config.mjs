/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['c.top4top.io', 'd.top4top.io', 'e.top4top.io', 'f.top4top.io', 'g.top4top.io', 'h.top4top.io', 'i.top4top.io'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig
