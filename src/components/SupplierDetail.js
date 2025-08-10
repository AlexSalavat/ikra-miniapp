import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const accent = "#38d8ff";
const bgBlock = "#181a23";
const shadow = "0 4px 22px #19283d44";
const round = 22;

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, idx: 0 });
  const supplier = suppliers.find((p) => String(p.id) === id);

  if (!supplier) {
    return (
      <div style={{ color: "#fff", padding: 30 }}>Поставщик не найден</div>
    );
  }

  return (
    <div style={{ background: "#11141a", minHeight: "100vh", paddingBottom: 20 }}>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        style={{
          margin: "0 0 0 8px",
          background: "none",
          border: "none",
          color: accent,
          display: "flex",
          alignItems: "center",
          fontSize: 18,
          fontWeight: 700,
          gap: 7,
          cursor: "pointer",
          marginTop: 16,
          marginBottom: 10,
        }}
      >
        <svg width="21" height="21">
          <path
            d="M13.5 5.5L8.7 11L13.5 16.5"
            stroke={accent}
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </button>

      {/* CARD */}
      <div
        style={{
          background: bgBlock,
          borderRadius: round,
          margin: "0 auto",
          boxShadow: shadow,
          maxWidth: 430,
          padding: "22px 22px 18px 22px",
          marginBottom: 26,
        }}
      >
        {/* Логотип и название */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <img
            src={supplier.logo}
            alt="logo"
            style={{
              width: 62,
              height: 62,
              borderRadius: 16,
              background: "#181b20",
              objectFit: "cover",
              boxShadow: "0 1px 5px #19223b33",
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>{supplier.name}</div>
            <div style={{ color: "#1edc80", fontWeight: 500, fontSize: 13 }}>{supplier.shortDescription}</div>
          </div>
        </div>

        {/* Описание */}
        <div
          style={{
            color: "#e3e3e3",
            fontSize: 15.1,
            marginBottom: 16,
            fontWeight: 400,
            lineHeight: 1.45,
          }}
        >
          {supplier.fullDescription}
        </div>

        {/* Преимущества */}
        {supplier.advantages && supplier.advantages.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: accent, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
              Преимущества
            </div>
            <ul style={{ paddingLeft: 18, color: "#cfd6e3", fontSize: 14, lineHeight: 1.4 }}>
              {supplier.advantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Доставка и объёмы */}
        {supplier.delivery && (
          <div style={{ marginBottom: 10, color: "#9bbcff", fontSize: 14 }}>
            🚚 {supplier.delivery}
          </div>
        )}
        {supplier.volumes && (
          <div style={{ marginBottom: 16, color: "#9bbcff", fontSize: 14 }}>
            📦 {supplier.volumes}
          </div>
        )}

        {/* Сертификаты */}
        {supplier.certs && supplier.certs.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: accent, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
              Сертификаты
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {supplier.certs.map((cert, i) => (
                <span
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    padding: "5px 10px",
                    borderRadius: 12,
                    fontSize: 13,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Контакты */}
        <div style={{ marginTop: 20 }}>
          <div style={{ color: accent, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
            Контакты
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {supplier.contacts?.phone && (
              <ContactButton
                href={`tel:${supplier.contacts.phone}`}
                label="Позвонить"
                icon="phone"
              />
            )}
            {supplier.contacts?.email && (
              <ContactButton
                href={`mailto:${supplier.contacts.email}`}
                label="Email"
                icon="mail"
              />
            )}
            {supplier.contacts?.telegram && (
              <ContactButton
                href={`https://t.me/${supplier.contacts.telegram.replace("@", "")}`}
                label="Telegram"
                icon="tg"
              />
            )}
            {supplier.contacts?.phone && (
              <ContactButton
                href={`https://wa.me/${supplier.contacts.phone.replace("+", "")}`}
                label="WhatsApp"
                icon="wa"
              />
            )}
          </div>
        </div>

        {/* Галерея */}
        {supplier.gallery && supplier.gallery.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              style={{ borderRadius: 16, overflow: "hidden" }}
            >
              {supplier.gallery.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt="фото"
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactButton = ({ href, label, icon }) => {
  const icons = {
    phone: "📞",
    mail: "✉️",
    tg: "📨",
    wa: "💬",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: "1 1 calc(50% - 8px)",
        textAlign: "center",
        background: "rgba(255,255,255,0.06)",
        padding: "10px 0",
        borderRadius: 12,
        color: "#fff",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 600,
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span style={{ fontSize: 16, marginRight: 6 }}>{icons[icon]}</span>
      {label}
    </a>
  );
};

export default SupplierDetail;
