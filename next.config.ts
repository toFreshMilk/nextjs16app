import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    async rewrites() {
        return [
            // 브라우저의 /favicon.ico 요청이 [tenant]로 들어가지 않도록 전역 처리
            { source: '/favicon.ico', destination: '/favicons/default.svg' },
        ];
    },
};

export default nextConfig;
