/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        openaiKey: process.env.OPENAI_API_KEY,
    },
};

module.exports = nextConfig;
