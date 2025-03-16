/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable PWA optimization
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure headers for PWA
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // Fix deployment issues
  output: 'standalone',
  poweredByHeader: false,
  
  // Ensure images are properly handled
  images: {
    domains: [],
    remotePatterns: [],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  
  // Vercel deployment configuration
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL || 'localhost:3000',
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'development',
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
