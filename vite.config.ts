import { join } from 'path';
import { defineConfig } from 'vite';
import htmlConfig from 'vite-plugin-html-config';
import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

import htmlConfigOptions from './config/html-config';
import manifest from './config/manifest';

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
    htmlConfig(htmlConfigOptions),
    preact({ devtoolsInProd: false }),
    tsconfigPaths({ root: __dirname }),
  ],
});