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
      alert('Неверный код');
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
        <h1 className="text-2xl font-bold mb-3">Вход в админку</h1>
        <form onSubmit={enter} className="space-y-3">
          <input
            className="w-full px-3 py-2 rounded bg-white/10 border border-white/20"
            placeholder="Код администратора"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="px-4 py-2 rounded bg-cyan-600 hover:brightness-110">Войти</button>
        </form>
        <p className="mt-3 text-white/70 text-sm">
          Пока вход по коду. Позже включим нормальный логин.
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
              aria-label="Назад"
              className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 hover:brightness-110"
            >
              Назад
            </button>
          )}
          <h1 className="text-2xl font-bold">Админка</h1>
        </div>
        <button onClick={logout} className="px-3 py-1 rounded bg-white/10 border border-white/20">
          Выйти
        </button>
      </div>
      <Outlet />
    </div>
  );
}
