/** @type {import('@craco/craco').CracoConfig} */

// Плагин, который вычищает warning "Critical dependency: the request of a dependency is an expression"
// из всех уровней компиляции (включая дочерние).
class SilenceCriticalDependencyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('SilenceCriticalDependencyPlugin', (stats) => {
      const re = /Critical dependency: the request of a dependency is an expression/;

      const strip = (comp) => {
        if (!comp || !Array.isArray(comp.warnings)) return;
        comp.warnings = comp.warnings.filter(
          (w) => !re.test((w && (w.message || w.toString())) || '')
        );
        if (Array.isArray(comp.children)) comp.children.forEach(strip);
      };

      // top-level
      strip(stats.compilation);

      // multi-compiler (на всякий)
      if (Array.isArray(stats.stats)) {
        stats.stats.forEach((s) => strip(s.compilation));
      }
    });
  }
}

module.exports = {
  webpack: {
    configure: (config) => {
      // Оставим и штатный ignoreWarnings  как запасной парашют
      const re = /Critical dependency: the request of a dependency is an expression/;
      const asFn = (w) => re.test(((w && (w.message || w.toString())) || ''));
      config.ignoreWarnings = [...(config.ignoreWarnings || []), asFn];
      return config;
    },
    plugins: [
      new SilenceCriticalDependencyPlugin(),
    ],
  },
};
