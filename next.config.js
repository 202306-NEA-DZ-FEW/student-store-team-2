const withPWA = require('next-pwa')({
        dest: "public",
        register: true,
        skipWaiting: true,
       
})

module.exports = {
    eslint: {
        dirs: ["src"],
    },
    
    reactStrictMode: true,
    images: {

        domains: [
                    'images.unsplash.com',
                    'lh3.googleusercontent.com',
                    'firebasestorage.googleapis.com',
                    'tailwindui.com',
                    'images.placeholders.dev',
                    "res.cloudinary.com",
                    "via.placeholder.com", 
                    "leadershipmemphis.org",
                    "source.unsplash.com",
                    'media.licdn.com',
                ],
    },
    
}

