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
  },
  async headers() {
    return [
      {
        // Cache video file for 1 year — loop plays from browser cache (0 bytes re-download)
        source: '/:path*.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.youtube.com https://youtube.com;",
          },
        ],
      },
    ]
  },
}

export default nextConfig
