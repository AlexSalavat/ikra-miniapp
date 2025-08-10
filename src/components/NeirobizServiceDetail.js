// src/components/NeirobizServiceDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../data/neirobiz";
import neirobizServices from "../data/neirobizServices";

const CONTACT_TG = "your_contact_here"; // <- замени на свой @username без @

export default function NeirobizServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const base = services.find((s) => s.id === id);
  const visual = neirobizServices.find((s) => s.id === id);
  const svc = base || visual;

  if (!svc) {
    return (
      <div className="bg-black min-h-screen text-white p-6">
        <button onClick={() => navigate(-1)} className="text-[#23df81] mb-3">
          ← Назад
        </button>
        Сервис не найден
      </div>
    );
  }

  const title = svc.title || visual?.title || "Сервис";
  const heroImg = visual?.image || "";
  const lead = svc.short || visual?.description || "";
  const full = svc.full || "";

  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[420px] mx-auto px-3 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
            aria-label="Назад"
          >
            <svg width="20" height="20" fill="none">
              <path
                d="M13 5l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">
            {title}
          </h2>
          <span className="w-16" />
        </div>
      </div>

      <div className="max-w-[420px] mx-auto px-3 pt-3 space-y-3">
        {/* Hero / визуал */}
        <div className="glass-card p-2">
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
            <div className="w-full aspect-[16/10] bg-black/35">
              {heroImg ? (
                <img
                  src={heroImg}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0a182a] via-[#1b2b40] to-[#221f4c]" />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
              <div className="text-white font-extrabold text-[18px] leading-tight">
                {title}
              </div>
              {base?.icon && (
                <div className="mt-1">
                  <span className="px-2.5 py-1 rounded-full text-[12px] font-bold text-white border border-white/15 bg-white/10 backdrop-blur-sm">
                    {base.icon}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Короткое описание (лид) */}
        {!!lead && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-[13px] mb-1">Что получаете</div>
            <div className="text-white text-[14.5px] leading-relaxed">{lead}</div>
          </div>
        )}

        {/* Полное описание */}
        {!!full && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-[13px] mb-1">Подробности</div>
            <div className="text-white/95 text-[14px] leading-relaxed whitespace-pre-line">
              {full}
            </div>
          </div>
        )}

        {/* Чек-лист выгод */}
        {Array.isArray(svc.checklist) && svc.checklist.length > 0 && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-[13px] mb-1">Почему это работает</div>
            <ul className="list-disc pl-5 space-y-1.5 text-white/95 text-[14px]">
              {svc.checklist.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Контакты / CTA */}
        <div className="glass-card p-3">
          <div className="text-white font-semibold text-[15px] mb-2">Связаться</div>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://t.me/${CONTACT_TG}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full text-white border-white/10 bg-white/10 hover:bg-white/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 15.47l-.37 5.2c.53 0 .76-.23 1.04-.51l2.5-2.41 5.18 3.79c.95.52 1.62.25 1.88-.88l3.41-16.02.01-.01c.3-1.4-.5-1.95-1.4-1.6L2.2 9.4c-1.36.53-1.34 1.28-.23 1.62l5.2 1.62L19.4 6.1c.6-.38 1.14-.17.7.21" />
              </svg>
              Telegram
            </a>
            <a
              href={`mailto:hello@neirobiz.local`}
              className="inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full text-white border-white/10 bg-white/10 hover:bg-white/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Email
            </a>
          </div>

          {/* Доп. примечание */}
          <div className="text-white/60 text-[12.5px] mt-2">
            Опишите задачу в 2–3 предложениях — вернёмся с идеей и сроками в этот же день.
          </div>
        </div>
      </div>
    </div>
  );
}
