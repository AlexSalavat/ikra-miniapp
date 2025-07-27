import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logistics from "../data/logistics";
import styles from "../styles/LogisticsShowcase.module.css";

const REGIONS = ['Камчатка', 'Владивосток', 'Сахалин', 'Хабаровск'];

const LogisticsShowcase = () => {
  const [region, setRegion] = useState(REGIONS[0]);
  const navigate = useNavigate();
  const filtered = logistics.filter(item => item.region === region);

  const cards = [
    ...filtered.slice(0, 10),
    ...Array.from({ length: Math.max(0, 10 - filtered.length) }, (_, i) => ({
      id: `placeholder-${i}`,
      name: "Место свободно",
      logo: "",
      empty: true,
    }))
  ];

  return (
    <div className={styles.wrap}>
      {/* Кнопка назад */}
      <div style={{ marginBottom: 18 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: '#192542',
            color: '#3B82F6',
            fontWeight: 600,
            fontSize: 15,
            padding: '7px 17px 7px 14px',
            borderRadius: 11,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 1px 4px #24305a11',
            transition: 'background .15s',
          }}
        >
          <svg width="20" height="20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Назад
        </button>
      </div>
      <div className={styles.regionFilter}>
        {REGIONS.map(r => (
          <button
            key={r}
            className={r === region ? styles.regionActive : styles.regionBtn}
            onClick={() => setRegion(r)}
            type="button"
          >
            {r}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {cards.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`${styles.card} ${item.empty ? styles.empty : ""}`}
            title={item.name}
          >
            <div className={styles.imgBox}>
              {item.logo && !item.empty ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className={styles.logo}
                  onError={e => { e.target.src = "/images/no-image.webp"; }}
                />
              ) : (
                <img
                  src={"/images/no-image.webp"}
                  alt={item.name}
                  className={styles.logo}
                />
              )}
            </div>
            <span className={styles.name}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogisticsShowcase;
