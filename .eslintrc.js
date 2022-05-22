module.exports = {
  rules: {
    'no-console': 'off',
    'comma-dangle': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0
  },

  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['@typescript-eslint']
};
