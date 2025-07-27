import React, { useState } from "react";
import logistics from "../data/logistics";

const REGIONS = ["Камчатка", "Владивосток", "Сахалин", "Хабаровск"];

export default function LogisticsShowcase() {
  const [region, setRegion] = useState(REGIONS[0]);
  const filtered = logistics.filter(x => x.address.includes(region));

  return (
    <div className="bg-black min-h-screen pb-20 pt-4 flex flex-col items-center">
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
      <div style={{
        display: "flex",
        gap: 5,
        marginBottom: 11,
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
      }}>
        {REGIONS.map(r => (
          <button
            key={r}
            style={{
              background: region === r ? "#23232a" : "none",
              color: region === r ? "#2678f3" : "#bababa",
              border: `1.1px solid ${region === r ? "#2678f3" : "#222"}`,
              borderRadius: 8,
              padding: "4px 12px",
              fontWeight: 700,
              fontSize: 11.4,
              minWidth: 66,
              cursor: "pointer",
              lineHeight: "1.13"
            }}
            onClick={() => setRegion(r)}
          >{r}</button>
        ))}
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
          width: "100%",
          maxWidth: 390,
        }}
      >
        {(filtered.length > 0 ? filtered : logistics.slice(0, 10)).map(item => (
          <div
            key={item.id}
            className="relative bg-[#16181e] rounded-[15px] overflow-hidden aspect-[1.1/1] flex items-end justify-center"
            style={{ minHeight: 128, boxShadow: "0 2px 10px #19192416" }}
          >
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => { e.target.src = "/images/no-image.webp"; }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#242439] to-[#23232a]">
                <span className="text-[#bababa] font-semibold text-[13.5px] text-center opacity-90 whitespace-pre-line leading-snug">
                  Лого в разработке
                </span>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "6px 0 5px 0",
                background: "linear-gradient(0deg,#18181b 92%,transparent)",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  textShadow: "0 1.5px 7px #191b21",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                }}
              >
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
