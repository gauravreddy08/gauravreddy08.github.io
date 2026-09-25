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
    ];
  },
};

export default nextConfig;
