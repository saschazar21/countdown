import pkg from '../package.json';

export default {
  name: pkg.displayName,
  short_name: pkg.displayName,
  description: pkg.description,
  icons: [
    {
      src: '/icons/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/android-chrome-256x256.png',
      sizes: '256x256',
      type: 'image/png',
    },
  ],
  theme_color: pkg.color,
  background_color: pkg.color,
  display: 'standalone',
};
