import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutList, Newspaper, Store, User } from "lucide-react";

const tabs = [
  { label: "Каталог", icon: LayoutList, path: "/catalog" },
  { label: "Новости", icon: Newspaper, path: "/news" },
  { label: "Маркет", icon: Store, path: "/market", highlight: true },
  { label: "Профиль", icon: User, path: "/profile" }
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 flex justify-around z-30 py-2 shadow-xl">
      {tabs.map((tab, i) => {
        const active = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`
              flex flex-col items-center justify-center flex-1 gap-0.5
              transition-all duration-150
              ${active ? "text-sky-400 font-bold" : "text-zinc-400"}
              ${tab.highlight ? "bg-gradient-to-t from-sky-900/40 via-sky-900/10 rounded-xl" : ""}
              ${active && tab.highlight ? "shadow-[0_2px_14px_#38bdf83a]" : ""}
              py-1.5
            `}
            style={{
              fontSize: 13.5,
              ...(tab.highlight ? { minWidth: 90 } : {})
            }}
          >
            <Icon size={tab.highlight ? 29 : 26} strokeWidth={2.2} />
            <span style={{ marginTop: 2 }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
