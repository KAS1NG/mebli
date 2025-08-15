/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
}

export const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL);

export default nextConfig;
