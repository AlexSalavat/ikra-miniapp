// src/components/BottomNav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Главная",
    icon: (
      <svg width="28" height="28" fill="none"><path d="M4 14L14 5L24 14V23A1 1 0 0123 24H5A1 1 0 014 23V14Z" stroke="#FFD700" strokeWidth="2" /></svg>
    ),
  },
  {
    to: "/catalog",
    label: "Витрина",
    icon: (
      <svg width="28" height="28" fill="none"><rect x="4" y="6" width="20" height="16" rx="3" stroke="#FFD700" strokeWidth="2" /><rect x="8" y="10" width="4" height="8" rx="1" fill="#FFD700" /></svg>
    ),
  },
  {
    to: "/news",
    label: "Новости",
    icon: (
      <svg width="28" height="28" fill="none"><rect x="4" y="6" width="20" height="16" rx="3" stroke="#FFD700" strokeWidth="2" /><path d="M8 10H20" stroke="#FFD700" strokeWidth="2" /><path d="M8 14H20" stroke="#FFD700" strokeWidth="2" /></svg>
    ),
  },
  {
    to: "/profile",
    label: "Профиль",
    icon: (
      <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="13" stroke="#FFD700" strokeWidth="2" /><circle cx="14" cy="11" r="4" fill="#FFD700" /><ellipse cx="14" cy="21" rx="6" ry="3" fill="#FFD700" opacity="0.7" /></svg>
    ),
  },
];

function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900 border-t border-yellow-800 flex justify-around items-center h-16 shadow-xl">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center px-2 pt-1 ${
            location.pathname === item.to
              ? "text-yellow-400 font-bold"
              : "text-yellow-300 opacity-80"
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
