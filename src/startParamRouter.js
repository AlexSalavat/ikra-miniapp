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
        case 'lead': {
          // lead  OR  lead:supplier:<id>
          const parts = raw.split(':');
          const sid = parts.length >= 3 ? parts[2] : null;
          return sid ? `/lead?supplier=${encodeURIComponent(sid)}` : '/lead';
        }
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
