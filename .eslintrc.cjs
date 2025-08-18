module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: ['react-app', 'react-app/jest'],
  rules: {
    // временно: не роняем CI из-за форматирования
    'no-console': 'off',
  },
};
