/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:
      process.env["NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"],
    NEXT_PUBLIC_GOOGLE_MAP_API: process.env["NEXT_PUBLIC_GOOGLE_MAP_API"],
    NEXT_PUBLIC_PROVISION_API: process.env["NEXT_PUBLIC_PROVISION_API"],
    NEXT_PUBLIC_APP_BASE_URL: process.env["NEXT_PUBLIC_APP_BASE_URL"],
    NEXT_PRIVATE_PROVISION_X_API_KEY: process.env["NEXT_PRIVATE_PROVISION_X_API_KEY"],
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
      {
        protocol: "https",
        hostname: "bgybyqnqoclsxyiizloj.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;