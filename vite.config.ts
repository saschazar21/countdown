import { join } from 'path';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

import manifest from './config/manifest.json';

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest,
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV !== 'production' ? 'inline' : false,
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production'
          ? '[hash:6]'
          : '[name]_[local]__[hash:6]',
    },
    postcss: join(__dirname, './postcss.config.js'),
  },
  plugins: [
    VitePWA(pwaConfig),
    preact({ devtoolsInProd: false }),
    tsconfigPaths({ root: __dirname }),
  ],
});
