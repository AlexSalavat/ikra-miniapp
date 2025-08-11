import { Link, useLocation } from 'react-router-dom';

function NavItem({ to, label }) {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to + '/'));
  const base = 'px-3 py-2 rounded-lg transition';
  const state = isActive ? 'bg-white/10' : 'opacity-90 hover:opacity-100';
  return (
    <Link to={to} className={`${base} ${state}`} aria-current={isActive ? 'page' : undefined}>
      {label}
    </Link>
  );
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/5 backdrop-blur border-t border-white/10 bottom-nav-safe">
      <div className="mx-auto max-w-screen-sm px-4 py-2 flex items-center justify-between text-sm">
        <NavItem to="/" label="Р”РѕРјРѕР№" />
        <NavItem to="/catalog" label="РљР°С‚РµРіРѕСЂРёРё" />
        <NavItem to="/market" label="РћР±СЉСЏРІР»РµРЅРёСЏ" />
        <NavItem to="/profile" label="РџСЂРѕС„РёР»СЊ" />
      </div>
    </nav>
  );
}
