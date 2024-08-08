/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
