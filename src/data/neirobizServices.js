import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../data/neirobiz";
import cards from "../data/neirobizServices";

// helpers
const normalizePhone = (phone = "") =>
  phone.replace(/[^\d+]/g, "").replace(/^8/, "+7");

function findService(id) {
  const base = services.find(s => s.id === id);
  const card = cards.find(c => c.id === id);
  if (!base && !card) return null;
  return {
    id,
    icon: base?.icon || "✨",
    title: base?.title || card?.title || "Услуга",
    short: base?.short || card?.description || "",
    full: base?.full || "",
    checklist: base?.checklist || [],
    image: card?.image || "/images/no-image.webp",
  };
}

function ActionBtn({ href, label, icon, disabled }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full";
  const palette = disabled
    ? "opacity-40 pointer-events-none bg-white/10 border-white/10"
    : "text-white border-white/10 bg-white/10 hover:bg-white/15";
  return (
    <a
      href={href || "#"}
      target={href ? "_blank" : undefined}
      rel="noreferrer"
      className={`${base} ${palette}`}
    >
      {icon === "tg" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.04 15.47l-.37 5.2c.53 0 .76-.23 1.04-.51l2.5-2.41 5.18 3.79c.95.52 1.62.25 1.88-.88l3.41-16.02.01-.01c.3-1.4-.5-1.95-1.4-1.6L2.2 9.4c-1.36.53-1.34 1.28-.23 1.62l5.2 1.62L19.4 6.1c.6-.38 1.14-.17.7.21" />
        </svg>
      )}
      {icon === "wa" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3.5A10 10 0 004.3 17.8L3 22l4.3-1.3A10 10 0 1020 3.5zm-8 17a8.8 8.8 0 01-4.5-1.2l-.3-.2-2.6.8.8-2.5-.2-.3A8.8 8.8 0 1112 20.5zm4.9-6.4c-.3-.2-1.6-.8-1.8-.9-.3-.1-.5-.2-.7.2-.2.3-.9 1-.9 1.2-.2.2-.3.2-.6 0s-1.2-.4-2.3-1.5c-.8-.8-1.3-1.7-1.5-2-.2-.3 0-.4.2-.6l.5-.6c.2-.2.2-.3.3-.5s0-.4-.1-.5c-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4s-1 1-1 2.5 1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.2-.2-.4-.3-.7-.5z" />
        </svg>
      )}
      {icon === "call" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.72 19.72 0 01-8.63-3.12A19.72 19.72 0 013.2 6.18 2 2 0 015.09 4h3a2 2 0 012 1.72c.07.64.2 1.28.39 1.9a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.62.19 1.26.32 1.9.39A2 2 0 0122 16.92z" />
        </svg>
      )}
      {icon === "mail" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )}
      {label}
    </a>
  );
}

export default function NeirobizServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const svc = useMemo(() => findService(id), [id]);

  // Контакты — возьмём из единого места (можешь вынести в .env или отдельный data)
  const CONTACTS = {
    telegram: "@moreisol_yg",
    phone: "+7 985 550 57 47",
    email: "info@moreisol.ru",
    site: "https://t.me/moreisol_yg", // пример — поменяешь под себя
  };

  const phoneNorm = CONTACTS.phone ? normalizePhone(CONTACTS.phone) : "";
  const tg = CONTACTS.telegram?.replace(/^@/, "") || "";
  const wa = phoneNorm ? `https://wa.me/${phoneNorm.replace("+", "")}` : "";
  const tel = phoneNorm ? `tel:${phoneNorm}` : "";
  const mailto = CONTACTS.email ? `mailto:${CONTACTS.email}` : "";
  const site =
    CONTACTS.site && (CONTACTS.site.startsWith("http") ? CONTACTS.site : `https://${CONTACTS.site}`);

  if (!svc) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        Услуга не найдена
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/75 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
          >
            <svg width="20" height="20" fill="none">
              <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">NeiroBiz</h2>
          <span className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-3 pt-3 space-y-3">
        {/* Баннер */}
        <div className="glass-card p-2">
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
            <div className="w-full aspect-[16/10] bg-black/35">
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
              />
            </div>
            {/* Заголовок */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
              <div className="text-white font-extrabold text-[18px] leading-tight flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-[12px] font-bold text-white border border-white/15 bg-white/10 backdrop-blur-sm">
                  {svc.icon}
                </span>
                {svc.title}
              </div>
              {svc.short && (
                <div className="mt-1 text-white/85 text-[13px]">{svc.short}</div>
              )}
            </div>
          </div>
        </div>

        {/* Описание */}
        {(svc.full || svc.short) && (
          <div className="glass-card p-3">
            <div className="text-white font-semibold text-[15px] mb-1">Описание</div>
            <div className="text-white/90 text-[14px] leading-relaxed whitespace-pre-line">
              {svc.full || svc.short}
            </div>
          </div>
        )}

        {/* Чеклист преимуществ */}
        {svc.checklist?.length > 0 && (
          <div className="glass-card p-3">
            <div className="text-white font-semibold text-[15px] mb-1">Что получите</div>
            <ul className="list-disc pl-5 space-y-1.5 text-white/95 text-[14px]">
              {svc.checklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Контакты */}
        <div className="glass-card p-3">
          <div className="text-white font-semibold text-[15px] mb-2">Связаться</div>
          <div className="grid grid-cols-2 gap-2">
            <ActionBtn
              href={tg ? `https://t.me/${tg}` : ""}
              label="Telegram"
              icon="tg"
              disabled={!tg}
            />
            <ActionBtn
              href={wa || ""}
              label="WhatsApp"
              icon="wa"
              disabled={!wa}
            />
            <ActionBtn
              href={tel || "#"}
              label="Позвонить"
              icon="call"
              disabled={!tel}
            />
            <ActionBtn
              href={mailto || "#"}
              label="Email"
              icon="mail"
              disabled={!mailto}
            />
          </div>

          {site && (
            <a
              href={site}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 w-full rounded-lg py-2 px-3 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
              </svg>
              {site.replace(/^https?:\/\//, "")}
            </a>
          )}

          <div className="mt-2 grid gap-1 text-white/90 text-[13px]">
            {CONTACTS.phone && <div>Тел.: {CONTACTS.phone}</div>}
            {CONTACTS.email && <div>E‑mail: {CONTACTS.email}</div>}
            {CONTACTS.telegram && <div>Telegram: {CONTACTS.telegram}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
