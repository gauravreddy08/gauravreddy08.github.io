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
    ];
  },
};

export default nextConfig;
