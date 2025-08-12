import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tg_user') || 'null');
    } catch {
      return null;
    }
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const tg = window?.Telegram?.WebApp;
      const u = tg?.initDataUnsafe?.user;
      if (u) {
        setUser(u);
        localStorage.setItem('tg_user', JSON.stringify(u));
      }
    } catch {}
    setReady(true);
  }, []);

  const name = user?.first_name || 'Гость';
  const lastName = user?.last_name ? ` ${user.last_name}` : '';
  const username = user?.username ? `@${user.username}` : null;
  const avatar = user?.photo_url || null;

  return (
    <div className="p-4">
      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            loading="lazy"
            src={avatar}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-sm opacity-70">{(name || 'Г')[0]}</span>
          </div>
        )}
        <div>
          <div className="text-lg">
            {name}
            {lastName}
          </div>
          {username && <div className="text-xs opacity-60">{username}</div>}
        </div>
      </div>

      {!ready && <div className="mt-3 text-xs opacity-60">Загрузка профиля</div>}
      {ready && !user && (
        <div className="mt-3 text-xs opacity-60">Оффлайн-режим: Telegram WebApp недоступен.</div>
      )}
    </div>
  );
}
