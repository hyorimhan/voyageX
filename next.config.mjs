import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uvjnwqdttdhvwexypdhx.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'readme-typing-svg.demolab.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'science.nasa.gov',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
          outputPath: 'static/assets/',
          publicPath: '/_next/static/assets/',
        },
      },
    });

    return config;
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,

  env: {
    NEXT_PUBLIC_CRYPTO_KEY: process.env.NEXT_PUBLIC_CRYPTO_KEY,
  },
};

export default nextConfig;
