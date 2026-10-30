import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/thanos',
        destination: '/writeups/thanos',
      },
      {
        source: '/h1b-data',
        destination: 'https://h1b-wage-map-rho.vercel.app/h1b-data',
      },
      {
        source: '/h1b-data/:path*',
        destination: 'https://h1b-wage-map-rho.vercel.app/h1b-data/:path*',
      },
      {
        source: '/learn-cs',
        destination: 'https://workbench-alpha-seven.vercel.app/learn-cs',
      },
      {
        source: '/learn-cs/:path*',
        destination: 'https://workbench-alpha-seven.vercel.app/learn-cs/:path*',
      },
      {
        source: '/ne-trip',
        destination: 'https://ne-trip.vercel.app/ne-trip',
      },
      {
        source: '/ne-trip/:path*',
        destination: 'https://ne-trip.vercel.app/ne-trip/:path*',
      },
    ];
  },
};

export default nextConfig;
