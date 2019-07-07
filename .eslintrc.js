/**
 * This file uses JS (not JSON) so we can have comments and object literals.
 * PLEASE DO NOT ADD CONDITIONALS OR DYNAMIC CODE. Keep this file as pure data.
 */

module.exports = {
  plugins: ['prettier', 'svelte3'],
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    // NB: please leave this at the end so it can override all other rules!
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['warn', {singleQuote: true, trailingComma: 'es5'}],
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  settings: {
  },
  globals: {
  }
};
