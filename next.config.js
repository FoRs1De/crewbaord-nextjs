/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'crewboard.pp.ua', pathname: '**' },
      { protocol: 'http', hostname: 'localhost', pathname: '**' },
    ],
  },
};

module.exports = nextConfig;
