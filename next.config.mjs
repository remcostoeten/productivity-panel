/* eslint-disable import/no-extraneous-dependencies, import/extensions */

const nextConfig = {
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}

export default nextConfig
