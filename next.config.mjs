/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"ipfs.io",
        port:"",
        pathname:"/**"
      }
    ],
  },
};

export default nextConfig;
