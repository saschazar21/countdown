module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'preact',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  globals: {
    JSX: 'readonly',
  },
};
