/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'crewboard.pp.ua', pathname: '**' },
      { protocol: 'http', hostname: 'localhost', pathname: '**' },
      {
        protocol: 'https',
        hostname: '0wl04j60-3000.euw.devtunnels.ms',
        pathname: '**',
      },
    ],
  },
  // uncomment this to enable polling in docker
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 200,
  //     aggregateTimeout: 100,
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;
