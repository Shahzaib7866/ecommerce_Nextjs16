/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

export default nextConfig

