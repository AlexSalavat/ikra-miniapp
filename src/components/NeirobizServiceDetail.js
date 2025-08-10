// src/components/NeirobizServiceDetail.js
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import services from "../data/neirobiz";

/* helpers */
const getService = (id) => services.find(s => String(s.id) === String(id));

export default function NeirobizServiceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const svc = useMemo(() => getService(id), [id]);

  if (!svc) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col">
        <Header onBack={() => navigate(-1)} title="Услуга" />
        <div className="flex-1 flex items-center justify-center text-white/80">
          Услуга не найдена
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      <Header onBack={() => navigate(-1)} title={svc.title} />

      <div className="max-w-[420px] mx-auto px-3 pt-3 space-y-3">
        {/* Хиро-блок */}
        <div className="glass-card p-2">
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
            <div className="w-full aspect-[16/10] bg-black/30">
              {/* Картинка берётся из витрины по id, если есть */}
              <img
                src={`/images/neirobiz-${svc.id}.webp`}
                alt={svc.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "/images/no-image.webp"; }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
              <div className="text-white font-extrabold text-[18px] leading-tight">
                {svc.icon ? <span className="mr-2 align-[-2px]">{svc.icon}</span> : null}
                {svc.title}
              </div>
              {svc.short && (
                <div className="mt-1 text-white/85 text-[13px] leading-snug">
                  {svc.short}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Что входит / ценность */}
        <div className="glass-card p-3">
          <div className="text-white font-semibold text-[15px] mb-1">Что получите</div>
          <div className="text-white/90 text-[14px] leading-relaxed">
            {svc.full || svc.short}
          </div>

          {Array.isArray(svc.checklist) && svc.checklist.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {svc.checklist.map((p, i) => (
                <li
                  key={i}
                  className="text-white/95 text-[14px] flex items-start gap-2"
                >
                  <span className="mt-[3px] inline-block w-[6px] h-[6px] rounded-full bg-[rgba(59,175,218,0.95)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Пакеты / как работаем (пример статичного блока) */}
        <div className="glass-card p-3">
          <div className="text-white font-semibold text-[15px] mb-1">Как работаем</div>
          <ul className="space-y-1.5 text-white/90 text-[14px]">
            <li>• Бриф (1–2 звонка) — уточняем задачи, сроки, KPI.</li>
            <li>• Предложение и таймлайн — прозрачный план и этапы.</li>
            <li>• Запуск и итерации — быстрые циклы, показываем промежуточный результат.</li>
            <li>• Сдача и поддержка — доработки по фидбэку, сопровождение по запросу.</li>
          </ul>
        </div>

        {/* Контакты / CTA */}
        <div className="glass-card p-3">
          <div className="text-white font-semibold text-[15px] mb-2">Связаться</div>
          <div className="grid grid-cols-2 gap-2">
            <Button href="https://t.me/ikra_neirobiz" label="Telegram" icon="tg" />
            <Button href="https://wa.me/79999999999" label="WhatsApp" icon="wa" />
            <Button href="mailto:hello@neirobiz.ai" label="Email" icon="mail" />
            <Button href="tel:+79999999999" label="Позвонить" icon="call" />
          </div>

          {/* Короткая форма-линк (опция) */}
          <a
            href="https://t.me/ikra_neirobiz"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 w-full rounded-lg py-2 px-3 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
              <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
            </svg>
            Оставить заявку в Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

/* UI bits */
function Header({ onBack, title }) {
  return (
    <div className="sticky top-0 z-20 w-full bg-black/75 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[420px] mx-auto px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
        >
          <svg width="20" height="20" fill="none">
            <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-semibold">Назад</span>
        </button>
        <h2 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">
          {title || "Услуга"}
        </h2>
        <span className="w-16" />
      </div>
    </div>
  );
}

function Button({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full text-white border-white/10 bg-white/10 hover:bg-white/15"
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
      {icon === "mail" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )}
      {icon === "call" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.72 19.72 0 01-8.63-3.12A19.72 19.72 0 013.2 6.18 2 2 0 015.09 4h3a2 2 0 012 1.72c.07.64.2 1.28.39 1.9a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.62.19 1.26.32 1.9.39A2 2 0 0122 16.92z" />
        </svg>
      )}
      {label}
    </a>
  );
}
