import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ style = {}, children = "Назад" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: 'none',
        color: '#357cff',
        fontWeight: 500,
        fontSize: 16,
        padding: '6px 13px 6px 7px',
        borderRadius: 11,
        border: 'none',
        cursor: 'pointer',
        boxShadow: 'none',
        transition: 'color .15s',
        outline: 'none',
        ...style
      }}
    >
      <svg width="20" height="20" fill="none">
        <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {children}
    </button>
  );
};

export default BackButton;
