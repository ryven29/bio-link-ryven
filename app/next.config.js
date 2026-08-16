/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost', 'c.top4top.io', 'd.top4top.io', 'e.top4top.io', 'f.top4top.io', 'g.top4top.io', 'h.top4top.io', 'i.top4top.io'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
