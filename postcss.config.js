/* eslint-disable @typescript-eslint/no-var-requires */

const cssnano = require('cssnano');
const cssimport = require('postcss-import');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [cssimport({ path: ['src'] }), presetEnv(), cssnano()],
};
