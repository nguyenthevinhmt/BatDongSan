/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "deurdoich/image/**",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
