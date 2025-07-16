/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "", // если есть конкретный порт, укажи его, иначе оставь пустым
        pathname: "/**", // разрешает все пути
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", 
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
