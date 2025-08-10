// src/components/NeirobizServiceDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../data/neirobiz";
import neirobizServices from "../data/neirobizServices";

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

  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[420px] mx-auto w-full px-4 py-3 flex items-center gap-3">
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
          <h1 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">
            {svc.title || visual?.title}
          </h1>
          <span className="w-16" />
        </div>
      </div>

      {/* Контент */}
      <div className="max-w-[420px] mx-auto p-4 space-y-4">
        {/* Обложка */}
        {visual?.image && (
          <div className="glass-card p-2">
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
              <div className="w-full aspect-[16/10] bg-black/40">
                <img
                  src={visual.image}
                  alt={svc.title || visual?.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Текстовый блок */}
        <div className="glass-card p-3">
          <div className="text-white font-extrabold text-[18px] mb-1">
            {svc.title || visual?.title}
          </div>
          <div className="text-white/90 text-[14px] leading-relaxed">
            {svc.full || svc.short || visual?.description}
          </div>

          {svc.checklist?.length > 0 && (
            <ul className="list-disc list-inside text-white/90 space-y-1 mt-3">
              {svc.checklist.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA — связаться */}
        <div className="glass-card p-3">
          <div className="text-white font-semibold text-[15px] mb-2">Связаться</div>
          <a
            href="https://t.me/your_contact_here"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#2678f3] to-[#44e2ff] text-white font-bold py-2.5 rounded-xl hover:brightness-110 transition"
          >
            Написать в Telegram
          </a>
          <div className="text-white/60 text-[12px] mt-2">
            Укажем стоимость, сроки, покажем примеры и соберём ТЗ.
          </div>
        </div>
      </div>
    </div>
  );
}
