// src/components/NeirobizServiceDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import servicesRaw from '../data/neirobiz';
import cardsRaw from '../data/neirobizServices';

const services = Array.isArray(servicesRaw) ? servicesRaw : [];
const cards = Array.isArray(cardsRaw) ? cardsRaw : [];

export default function NeirobizServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const base = services.find((s) => s.id === id);
  const visual = cards.find((s) => s.id === id);
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
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10 p-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-[#23df81] font-semibold">
          ← Назад
        </button>
        <h1 className="text-white font-bold truncate">{svc.title || visual?.title}</h1>
      </div>

      <div className="max-w-[420px] mx-auto p-4 space-y-4">
        {/* Обложка */}
        {visual?.image && (
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={visual.image}
              alt={svc.title || visual?.title}
              className="w-full h-auto object-cover"
              onError={(e) => (e.currentTarget.src = '/images/no-image.webp')}
            />
          </div>
        )}

        {/* Текст */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="text-white text-lg font-bold mb-1">{svc.title || visual?.title}</div>
          <div className="text-white/80 text-[14.5px] leading-relaxed">
            {svc.full || svc.short || visual?.description}
          </div>
        </div>

        {/* Чеклист (если есть) */}
        {Array.isArray(svc.checklist) && svc.checklist.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <div className="text-white font-semibold mb-2">Что вы получите</div>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              {svc.checklist.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <a
          href="https://t.me/your_contact_here"
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#2678f3] to-[#44e2ff] text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-110 transition"
        >
          Связаться
        </a>
      </div>
    </div>
  );
}
