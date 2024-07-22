/** @type {import('next').NextConfig} */
const hostnameTrimmed = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/(https?:\/\/)?(www.)?/i, '')
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: hostnameTrimmed,
            port: '',
            pathname: '/storage/v1/object/public/**',
          },
        ],
      },
}

export default nextConfig;
