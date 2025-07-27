import React from "react";
import suppliers from "../data/suppliers";
import { useNavigate } from "react-router-dom";

const CARD_SIZE = 120;

export default function Catalog() {
  const navigate = useNavigate();

  // Выровнять до 18 карточек с пустышками
  const all = [
    ...suppliers,
    ...Array.from({ length: Math.max(0, 18 - suppliers.length) }, (_, i) => ({
      id: `empty-${i}`,
      name: "Место свободно",
      region: "",
      logo: "",
      isPlaceholder: true,
    })),
  ];

  return (
    <div className="bg-black min-h-screen pt-4 pb-20 flex flex-col items-center">
      <button
        onClick={() => window.history.back()}
        style={{
          color: "#357cff",
          background: "none",
          border: "none",
          fontWeight: 500,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 5,
          alignSelf: "flex-start",
          marginLeft: 10,
        }}
      >
        <svg width="18" height="18" fill="none" style={{ verticalAlign: "-3px" }}>
          <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 15,
          width: "100%",
          maxWidth: 420,
        }}
      >
        {all.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => !item.isPlaceholder && navigate(`/supplier/${item.id}`)}
            className="relative bg-[#16181e] rounded-[17px] overflow-hidden cursor-pointer aspect-[0.92/1] flex items-end justify-center"
            style={{ minHeight: CARD_SIZE, boxShadow: "0 2px 10px #19192426" }}
          >
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => { e.target.src = "/images/no-logo.webp"; }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#292936] to-[#23232a]">
                <span className="text-[#bababa] font-semibold text-[14px] text-center opacity-90 whitespace-pre-line leading-snug">
                  {item.isPlaceholder ? "Место\nсвободно" : "Лого\nв разработке"}
                </span>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "7px 0 6px 0",
                background: "linear-gradient(0deg,#18181b 90%,transparent)",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13.4,
                  textShadow: "0 1.5px 7px #16171b",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
              >
                {item.name}
              </span>
              {item.region && (
                <span
                  style={{
                    color: "#32e0a8",
                    fontWeight: 600,
                    fontSize: 10.5,
                  }}
                >
                  {item.region}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
