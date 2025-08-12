/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rickandmortyapi.com', pathname: '/api/character/avatar/**' }
    ]
  }
};
export default nextConfig;
