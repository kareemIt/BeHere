module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
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
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/Routes/home',
      },
      {
        source: '/profile',
        destination: '/Routes/profile',
      },
      {
        source: '/search',
        destination: '/Routes/search',
      },
      {
        source: '/login',
        destination: '/Routes/login',
      },
      {
        source: '/register',
        destination: '/Routes/register',
      },
      {
        source: '/:username',
        destination: '/Routes/profile?username=:username',
      },
      // Add more routes if needed
    ];
  },
  productionBrowserSourceMaps: false,
  experimental: {
    externalDir: true,
  },
};
