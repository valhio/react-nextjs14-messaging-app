/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com', // Github
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Google
            },
            {
                protocol: 'https',
                hostname: 'scontent.fsof10-1.fna.fbcdn.net', // Facebook
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // Cloudinary
            }
        ],
        // domains is deprecated
        // domains: [
        //     'ui-avatars.com',
        //     'avatars.githubusercontent.com', // Github
        //     'res.cloudinary.com', // Facebook
        //     'lh3.googleusercontent.com', // Google
        //     'scontent.xx.fbcdn.net', // Facebook
        //     'scontent.fsof10-1.fna.fbcdn.net'
        // ],
    }
}

module.exports = nextConfig
