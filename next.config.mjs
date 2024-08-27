/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mrwallpaper.com",
        port: "",
        pathname:
          "/images/hd/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.jpg",
      },
      {
        protocol: "https",
        hostname: "xlnxhzbfgeyvztecqtom.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
