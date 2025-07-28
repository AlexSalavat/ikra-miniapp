import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Универсальная красивая кнопка "Назад" с синей иконкой.
 * Используй <BackButton /> в любом месте.
 * Можно передать text и color.
 */
export default function BackButton({ text = "Назад", color = "#2678f3", style = {}, ...props }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={props.onClick || (() => navigate(-1))}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: "none",
        border: "none",
        color,
        fontWeight: 700,
        fontSize: 15.8,
        cursor: "pointer",
        padding: "2.5px 0 15px 2px",
        outline: "none",
        ...style
      }}
      type="button"
    >
      <span style={{
        width: 34,
        height: 34,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: color,
        borderRadius: '50%',
        marginRight: 2,
        flexShrink: 0,
      }}>
        <svg width="19" height="19" fill="none" viewBox="0 0 19 19">
          <path d="M12.5 5.3L8 9.5L12.5 13.7"
            stroke="#fff"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span style={{ color, fontWeight: 700, fontSize: 15.8, lineHeight: 1 }}>
        {text}
      </span>
    </button>
  );
}
