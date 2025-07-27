import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ className = "" }) {
  const navigate = useNavigate();
  return (
    <button
      className={`flex items-center gap-1 text-blue-400 hover:text-blue-600 bg-transparent border-none px-1 py-2 text-base font-normal cursor-pointer transition ${className}`}
      style={{ boxShadow: "none", outline: "none" }}
      onClick={() => navigate(-1)}
    >
      <svg width="20" height="20" fill="none">
        <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Назад</span>
    </button>
  );
}

export default BackButton;
