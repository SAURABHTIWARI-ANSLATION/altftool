/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/altftool",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.poki.com",
        pathname: "/**",
      },
    ],
  },

  reactStrictMode: false,
  reactCompiler: false,

  experimental: {
    workerThreads: false,
    cpus: 2,
  },
};

export default nextConfig;
