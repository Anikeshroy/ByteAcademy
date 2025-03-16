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
};

export default nextConfig;
