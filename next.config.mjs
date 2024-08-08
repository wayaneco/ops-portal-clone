/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
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
    ],
  },
};

export default nextConfig;
