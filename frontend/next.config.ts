import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js → NestJS backend proxy
  // Frontend'den /api/* çağrıları backend'e yönlendirilir.
  // Bu sayede CORS karmaşası yaşamadan fetch('/api/...') kullanabilirsiniz.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
