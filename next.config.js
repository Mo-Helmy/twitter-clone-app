/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'project-twitter-clone-app.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
