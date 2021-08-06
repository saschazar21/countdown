import { join } from 'path';
import { defineConfig } from 'vite';
import htmlConfig from 'vite-plugin-html-config';
import preact from '@preact/preset-vite';
import svg from 'vite-plugin-react-svg';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

import htmlConfigOptions from './config/html-config';
import manifest from './config/manifest';
import svgoConfig from './svgo.config';

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
    svg({
      defaultExport: 'component',
      svgo: true,
      svgoConfig,
      svgProps: {
        role: 'presentation',
      },
      titleProp: true,
    }),
    tsconfigPaths({ root: __dirname }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
    },
  },
});
