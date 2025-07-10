import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TODO: Remove this after fixing types (temporary workaround)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
