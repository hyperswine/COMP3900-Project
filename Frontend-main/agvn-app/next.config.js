/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Note: url-loader is deprecated in Next.js 15, using built-in asset handling instead
  webpack: (config) => {
    // Next.js 15 handles assets natively, but keeping custom config for compatibility
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig