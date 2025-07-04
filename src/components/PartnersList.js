import React from 'react';

const PartnersList = ({ partners, showAll, onToggleAll }) => (
  <div className="mb-6">
    <div className="font-semibold text-base mb-1 text-center">
      🤝 Наши партнёры
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 justify-items-start mb-2">
      {partners.map((p, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 text-xs bg-black"
        >
          {p.type === 'image' ? (
            <img
              src={p.icon}
              alt={p.name}
              className="w-8 h-8 rounded-full object-cover bg-black border border-zinc-700"
              loading="lazy"
              onError={e => { e.target.src = '/images/no-logo.webp'; }}
            />
          ) : (
            <span className="text-2xl">{p.icon}</span>
          )}
          <span className="font-medium text-white whitespace-nowrap text-xs">
            {p.name}
          </span>
          <span className="text-zinc-400 whitespace-nowrap text-xs">
            ({p.city})
          </span>
          <span className="ml-1 text-zinc-400 whitespace-nowrap text-xs">
            {p.role}
          </span>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <button
        onClick={onToggleAll}
        className="mt-1 px-3 py-1 bg-zinc-700 text-white text-xs rounded hover:bg-zinc-600 shadow"
      >
        {showAll ? 'Скрыть список' : 'Показать всех'}
      </button>
    </div>
    {showAll && (
      <div className="mt-2 p-2 text-xs text-center text-zinc-300 bg-zinc-900 rounded-md shadow">
        ООО "Начикинское", ООО "Камчат-Рыба", ООО "Коль"
      </div>
    )}
  </div>
);

export default PartnersList;
