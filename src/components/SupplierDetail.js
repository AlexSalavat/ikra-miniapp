import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const accent = "#38d8ff";
const bgBlock = "rgba(24,26,35,0.72)";
const shadow = "0 4px 22px rgba(0,0,0,0.4)";
const round = 22;

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, idx: 0 });

  const supplier = suppliers.find((s) => s.id === id);
  if (!supplier) {
    return (
      <div style={{ color: "#fff", padding: 30 }}>
        Поставщик не найден
      </div>
    );
  }

  const hasGallery = supplier.gallery && supplier.gallery.length > 0;

  return (
    <div
      style={{
        background: "#11141a",
        minHeight: "100vh",
        paddingBottom: 20,
        fontFamily: "inherit",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          margin: "0 0 10px 8px",
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
        }}
      >
        <svg
          width="21"
          height="21"
          style={{ marginRight: 2 }}
        >
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

      {/* Main Card */}
      <div
        style={{
          background: bgBlock,
          borderRadius: round,
          margin: "0 auto",
          boxShadow: shadow,
          maxWidth: 430,
          padding: "22px 22px 18px 22px",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo and Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 18,
              padding: 6,
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={supplier.logo}
              alt="logo"
              style={{
                width: 62,
                height: 62,
                borderRadius: 14,
                objectFit: "cover",
                background: "#181b20",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#fff",
                marginBottom: 3,
              }}
            >
              {supplier.name}
            </div>
            <div
              style={{
                color: "#8ab8ff",
                fontWeight: 500,
                fontSize: 13.5,
              }}
            >
              {supplier.city}
            </div>
          </div>
        </div>

        {/* Short description */}
        {supplier.shortDescription && (
          <div
            style={{
              color: "#e3e3e3",
              fontSize: 15.1,
              marginBottom: 16,
              fontWeight: 400,
              lineHeight: 1.45,
            }}
          >
            {supplier.shortDescription}
          </div>
        )}

        {/* Full description */}
        {supplier.fullDescription && (
          <div
            style={{
              color: "#cbd5e1",
              fontSize: 14.8,
              marginBottom: 16,
              lineHeight: 1.45,
            }}
          >
            {supplier.fullDescription}
          </div>
        )}

        {/* Advantages */}
        {supplier.advantages && supplier.advantages.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                color: accent,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              Преимущества:
            </div>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: 18,
                color: "#fff",
                fontSize: 14,
                lineHeight: 1.45,
              }}
            >
              {supplier.advantages.map((adv, i) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Delivery */}
        {supplier.delivery && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                color: accent,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              Доставка:
            </div>
            <div style={{ color: "#fff", fontSize: 14 }}>
              {supplier.delivery}
            </div>
          </div>
        )}

        {/* Volumes */}
        {supplier.volumes && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                color: accent,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              Объёмы:
            </div>
            <div style={{ color: "#fff", fontSize: 14 }}>
              {supplier.volumes}
            </div>
          </div>
        )}

        {/* Price list */}
        {supplier.priceList && (
          <div style={{ marginBottom: 14 }}>
            <a
              href={supplier.priceList}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: 12,
                background: accent,
                color: "#000",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Скачать прайс-лист
            </a>
          </div>
        )}

        {/* Contacts */}
        {supplier.contacts && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                color: accent,
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              Контакты:
            </div>
            <div style={{ color: "#fff", fontSize: 14 }}>
              {supplier.contacts.phone && (
                <div>Телефон: {supplier.contacts.phone}</div>
              )}
              {supplier.contacts.email && (
                <div>Email: {supplier.contacts.email}</div>
              )}
              {supplier.contacts.telegram && (
                <div>Telegram: {supplier.contacts.telegram}</div>
              )}
            </div>
          </div>
        )}

        {/* Gallery */}
        {hasGallery && (
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                color: "#abb8cc",
                fontSize: 13,
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Фото
            </div>
            <Swiper
              spaceBetween={8}
              slidesPerView={"auto"}
              style={{ paddingBottom: 4 }}
            >
              {supplier.gallery.map((img, i) => (
                <SwiperSlide key={i} style={{ width: "78%" }}>
                  <img
                    src={img}
                    alt={`gallery-${i}`}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 16,
                      border: "1px solid #19223a",
                      boxShadow: "0 2px 9px rgba(0,0,0,0.3)",
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

export default SupplierDetail;
