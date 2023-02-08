/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['flagcdn.com', 'img-c.udemycdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/ibracloud/**',
      },
    ],
  },
  env: {
    JWT_SECRET: '81c22437ee74c0f5dab069dfc6974f6fcdc33c4ead860b08b260b024',
    CLOUD_UPDATE_PRESET: 'dalali-app',
    CLOUD_NAME: 'ibracloud',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/ibracloud/image/upload',
    TWILIO_ACCOUNT_SID: 'ACda836bed25d83d6722dec2c617fd02c5',
    TWILIO_AUTH_TOKEN: '18c2ce1f89e8433aacf9c47aa63b8c3c',
    SENDGRID_API_KEY:
      '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',
    TOKEN_IPINFO: '02e51a55907d59',
  },
};

module.exports = nextConfig;
