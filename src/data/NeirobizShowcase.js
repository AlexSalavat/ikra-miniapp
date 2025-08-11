// src/components/NeirobizShowcase.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import services from "../data/neirobiz";
import cards from "../data/neirobizServices";
import s from "../styles/NeirobizCategory.module.css";

// убираем эмодзи из заголовка
const stripEmoji = (t = "") => t.replace(/\p{Extended_Pictographic}/gu, "").trim();

function mergeServices() {
  const map = Object.fromEntries(services.map(svc => [svc.id, svc]));
  return cards.map(card => {
    const base = map[card.id] || {};
    return {
      ...card,
      title: stripEmoji(base.title || card.title || ""),
      short: base.short || card.description || "",
    };
  });
}

export default function NeirobizShowcase() {
  const navigate = useNavigate();
  const items = useMemo(mergeServices, []);

  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "20px 0 80px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 440, padding: "0 14px" }}>
        <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: ".02em" }}>NeiroBiz</h1>
        <div style={{ color: "#b5e0fe", fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>AI‑сервисы и генерация упаковки</div>
        <div style={{ color: "rgba(255,255,255,.7)", fontSize: 13, marginTop: 4 }}>
          Автоматизируйте бизнес через ботов, мини‑приложения, дизайн и аналитику.{" "}
          <span style={{ color: "#23df81", fontWeight: 700 }}>Оформите заявку — результат быстрее.</span>
        </div>
      </div>

      <div className={s.wrap} style={{ width: "100%", marginTop: 14 }}>
        <div className={s.grid}>
          {items.map(item => (
            <button
              key={item.id}
              className={s.card}
              onClick={() => navigate(`/neirobiz/service/${item.id}`)}
            >
              <div className={s.thumb}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={s.img}
                  onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
                />
                {/* мини-пилюля (можно иконку/метку заменить/убрать) */}
                <span className={s.pill}>AI</span>
              </div>
              <div className={s.title} title={item.title}>{item.title}</div>
              <div className={s.desc}>{item.short}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
