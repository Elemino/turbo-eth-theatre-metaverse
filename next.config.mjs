import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
  },
  swcMinify: true,
  env: {
    mode=: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_URL:http://localhost:3001,
    NEXTAUTH_URL:http://localhost:3001,

DATABASE_NAME=iztalents_collector
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { subsets: ['latin'] },
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /icon/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/icon/] },
      loader: 'next-image-loader',
      options: { assetPrefix: '' },
    })
    return config
  },
}

export default nextConfig
