/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'], // Додаємо домен Firebase
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/products',
                permanent: true, // або false для тимчасового редиректу
            },
        ];
    },
};

export default nextConfig;
