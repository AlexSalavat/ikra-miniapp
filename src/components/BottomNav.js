import { NavLink } from 'react-router-dom';
import { LayoutGrid, Newspaper, Store, User } from 'lucide-react';

function Item({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        [
          'flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-xs transition',
          isActive
            ? 'bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-500/30 shadow-[0_0_24px_-6px] shadow-cyan-500/40'
            : 'text-white/80 hover:text-white',
        ].join(' ')
      }
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      <span className="leading-none">{label}</span>
    </NavLink>
  );
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/5 backdrop-blur border-t border-white/10">
      <div className="bottom-nav-safe mx-auto max-w-screen-sm">
        <div className="px-3 py-2 grid grid-cols-4 gap-2">
          <Item to="/catalog" label="???????" Icon={LayoutGrid} />
          <Item to="/news" label="???????" Icon={Newspaper} />
          <Item to="/market" label="??????" Icon={Store} />
          <Item to="/profile" label="???????" Icon={User} />
        </div>
      </div>
    </nav>
  );
}
