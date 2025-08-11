import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ADMIN_CODE = process.env.REACT_APP_ADMIN_CODE || '';

export default function AdminLayout() {
  const [ok, setOk] = useState(false);
  const [code, setCode] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOk(localStorage.getItem('admin_ok') === '1');
  }, []);

  const enter = (e) => {
    e.preventDefault();
    if (code.trim() === String(ADMIN_CODE)) {
      localStorage.setItem('admin_ok', '1');
      setOk(true);
    } else {
      alert('РќРµРІРµСЂРЅС‹Р№ РєРѕРґ');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_ok');
    setOk(false);
    setCode('');
  };

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/admin', { replace: true });
  };

  if (!ok) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-3">Р’С…РѕРґ РІ Р°РґРјРёРЅРєСѓ</h1>
        <form onSubmit={enter} className="space-y-3">
          <input
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
            placeholder="РљРѕРґ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="px-4 py-2 rounded bg-cyan-600 hover:brightness-110">Р’РѕР№С‚Рё</button>
        </form>
        <p className="mt-3 text-white/70 text-sm">
          РџРѕРєР° РІС…РѕРґ РїРѕ РєРѕРґСѓ. РџРѕР·Р¶Рµ РІРєР»СЋС‡РёРј РЅРѕСЂРјР°Р»СЊРЅС‹Р№
          Р»РѕРіРёРЅ.
        </p>
      </div>
    );
  }

  const notRoot = pathname !== '/admin';

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {notRoot && (
            <button
              onClick={goBack}
              aria-label="РќР°Р·Р°Рґ"
              className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 hover:brightness-110"
            >
              РќР°Р·Р°Рґ
            </button>
          )}
          <h1 className="text-2xl font-bold">РђРґРјРёРЅРєР°</h1>
        </div>
        <button onClick={logout} className="px-3 py-1 rounded bg-white/10 border border-white/20">
          Р’С‹Р№С‚Рё
        </button>
      </div>
      <Outlet />
    </div>
  );
}
