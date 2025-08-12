/**
 * Telegram WebApp start_param -> SPA path
 * Поддержка: home, catalog, market:sell|buy, news:coast, supplier:<id>, lead[:supplier:<id>]
 */
(function routeStartParam() {
  try {
    if (window.__ikraStartParamDone) return;

    function parseStartParam(raw) {
      if (!raw || typeof raw !== 'string') return null;
      const [key, rest] = raw.split(':');
      switch (key) {
        case 'home':
          return '/';
        case 'catalog':
          return '/catalog';
        case 'market':
          return rest === 'sell' ? '/market/sell' : '/market/buy';
        case 'news':
          return '/news';
        case 'supplier':
          return rest ? `/supplier/${encodeURIComponent(rest)}` : null;
        case 'lead':
          if (rest && rest.startsWith('supplier')) {
            const [, sid] = raw.split(':'); // raw: "lead:supplier:<id>"
            return sid ? `/lead?supplier=${encodeURIComponent(sid)}` : '/lead';
          }
          return '/lead';
        default:
          return null;
      }
    }

    const tgParam = window?.Telegram?.WebApp?.initDataUnsafe?.start_param;
    const urlParam = new URLSearchParams(window.location.search).get('startapp');
    const target = parseStartParam(tgParam || urlParam);

    if (target && window.location.pathname + window.location.search !== target) {
      window.history.replaceState(null, '', target);
    }
  } catch (_) {
    // no-op
  } finally {
    window.__ikraStartParamDone = true;
  }
})();
