/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/prop-types': 'off',
  },
};
