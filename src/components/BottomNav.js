// src/components/BottomNav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/catalog",
    label: "Каталог",
    icon: (
      <svg width="28" height="28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#3B82F6" strokeWidth="2" />
        <rect x="8" y="10" width="4" height="8" rx="1" fill="#3B82F6" />
      </svg>
    ),
  },
  {
    to: "/news",
    label: "Новости",
    icon: (
      <svg width="28" height="28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#3B82F6" strokeWidth="2" />
        <path d="M8 10H20" stroke="#3B82F6" strokeWidth="2" />
        <path d="M8 14H20" stroke="#3B82F6" strokeWidth="2" />
      </svg>
    ),
  },
  {
    to: "/market/sell/ikra", // по умолчанию в икорный маркет
    label: "Маркет",
    icon: (
      <svg width="28" height="28" fill="none">
        <rect x="6" y="8" width="16" height="12" rx="3" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="14" cy="14" r="3" fill="#3B82F6" />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Профиль",
    icon: (
      <svg width="28" height="28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="14" cy="11" r="4" fill="#3B82F6" />
        <ellipse cx="14" cy="21" rx="6" ry="3" fill="#3B82F6" opacity="0.7" />
      </svg>
    ),
  },
];

function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900 border-t border-blue-900 flex justify-around items-center h-16 shadow-xl">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center px-2 pt-1 transition-all ${
            location.pathname.startsWith(item.to)
              ? "text-blue-400 font-bold"
              : "text-blue-300 opacity-80"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default BottomNav;
