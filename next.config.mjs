/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.ibb.co.com", // ImgBB er asset image link domain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
