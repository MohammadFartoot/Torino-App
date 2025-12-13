/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{
            source: '/tour',
            destination: '/',
            permanent: true,
        }]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '6500',
                pathname: '/static/images/**',
            },
        ],
    }
};

export default nextConfig;
