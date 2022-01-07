const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './config/webpack.doc.base.config.js'),
      },
      node: {
        extensions: ['.vue', '.ts'],
      },
    },
  },
  // extends的优先级也是从后往前的
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/ban-types": "off",
    '@typescript-eslint/no-var-requires': "off",
    'no-debugger': 'off'
  },
};
