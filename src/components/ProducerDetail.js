// src/components/ProducerDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducer } from '../lib/useProducers';

export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producer, loading, error } = useProducer(id);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Производитель (debug)</h2>
          <span className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-3">
        {loading && <div className="text-white/80">Загрузка…</div>}
        {error && <div className="text-red-400">Ошибка: {String(error.message || error)}</div>}

        <pre className="text-xs bg-white/5 p-3 rounded border border-white/10 overflow-x-auto">
          {JSON.stringify(
            {
              id,
              loading,
              error: error ? String(error.message || error) : null,
              producer,
              tip: 'Если producer = null — id не найден ни в БД, ни в мок-данных.',
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
