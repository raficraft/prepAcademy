/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: process.env.API_KEY,
  },
  serverRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },

  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "fr"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "fr",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  },
};

module.exports = nextConfig;
