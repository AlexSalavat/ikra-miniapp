/** @type {import('@craco/craco').CracoConfig} */
module.exports = {
  webpack: {
    configure: (config) => {
      const isCriticalExpr = (msg) =>
        typeof msg === 'string'
          ? msg.includes('Critical dependency: the request of a dependency is an expression')
          : (msg?.message || '').includes('Critical dependency: the request of a dependency is an expression');

      // Точечно гасим варнинг и, по возможности, только из SDK
      const fromTelegramSdk = (w) => (w?.module?.resource || '').includes('@telegram-apps/sdk');

      config.ignoreWarnings = [
        (w) => isCriticalExpr(w) && fromTelegramSdk(w),
      ];
      return config;
    },
  },
};
