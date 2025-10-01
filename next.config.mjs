/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // i18n: {
  //   locales: ['en', 'de', 'es'], // English, Deutsch, Español
  //   defaultLocale: 'en',
  // },
}

export default nextConfig
