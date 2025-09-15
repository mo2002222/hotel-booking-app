// /** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === "production";

// const nextConfig = {
//   output: "export",
//   trailingSlash: true,
//   basePath: isProd ? "/hotel-booking-app" : "",
//   assetPrefix: isProd ? "/hotel-booking-app/" : "",
//   images: { unoptimized: true },
//   eslint: { ignoreDuringBuilds: true },
//   typescript: { ignoreBuildErrors: true },
// };

// export default nextConfig;



const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/hotel-booking-app' : '',
  assetPrefix: isProd ? '/hotel-booking-app/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
