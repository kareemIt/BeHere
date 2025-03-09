// next.config.js

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Replace '*' with your domain if needed
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Authorization, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  },
  productionBrowserSourceMaps: false,
  experimental: {
    externalDir: true, // This helps if you're using code outside the Next.js app directory
  },
  // Optional: Specify Node.js version for Vercel
  engines: {
    node: ">=16.8.0" // Ensure compatibility with Vercel's environment
  }
};
