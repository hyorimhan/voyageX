import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uvjnwqdttdhvwexypdhx.supabase.co',
      },
    ],
  },
};

export default nextConfig;
