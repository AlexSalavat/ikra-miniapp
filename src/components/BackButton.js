import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  text = "Назад",
  color = "#2678f3",
  bg = "#23232a",
  style = {},
  ...props
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={props.onClick || (() => navigate(-1))}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: bg,
        border: "none",
        color,
        fontWeight: 600,
        fontSize: 15.5,
        cursor: "pointer",
        borderRadius: 11,
        padding: "7px 17px 7px 13px",
        marginBottom: 9,
        boxShadow: "none",
        ...style
      }}
      type="button"
    >
      <svg width="19" height="19" fill="none" viewBox="0 0 19 19" style={{ marginRight: 5 }}>
        <path
          d="M12.5 5.3L8 9.5L12.5 13.7"
          stroke={color}
          strokeWidth="2.0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {text}
    </button>
  );
}
