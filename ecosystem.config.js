module.exports = {
  apps: [
    {
      name: 'EventBackend',
      script: './App.js',
      cwd: '/home/ubuntu/EventBackend',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
