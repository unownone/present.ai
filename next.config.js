/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexel.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
