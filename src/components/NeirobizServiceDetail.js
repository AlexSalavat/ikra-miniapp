// src/components/NeirobizServiceDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../data/neirobiz";
import neirobizServices from "../data/neirobizServices";

export default function NeirobizServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const base = services.find(s => s.id === id);
  const visual = neirobizServices.find(s => s.id === id);
  const svc = { ...base, ...visual };

  if (!svc) {
    return <div className="text-white p-4">Сервис не найден</div>;
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10 p-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-[#23df81] font-semibold">← Назад</button>
        <h1 className="text-white font-bold">{svc.title}</h1>
      </div>

      <div className="max-w-[420px] mx-auto p-4">
        <img
          src={svc.image}
          alt={svc.title}
          className="w-full rounded-xl border border-white/10 mb-4"
          onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
        />

        <div className="text-white text-lg font-bold mb-2">{svc.title}</div>
        <div className="text-white/80 mb-4">{svc.full || svc.short}</div>

        {svc.checklist?.length > 0 && (
          <ul className="list-disc list-inside text-white/90 space-y-1 mb-4">
            {svc.checklist.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        )}

        <button
          className="w-full bg-[#23df81] text-black font-bold py-2 rounded-lg"
          onClick={() => alert("Связаться с NeiroBiz")}
        >
          Связаться
        </button>
      </div>
    </div>
  );
}
