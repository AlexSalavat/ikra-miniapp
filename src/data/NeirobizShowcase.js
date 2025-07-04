import React from 'react';
import { useNavigate } from 'react-router-dom';
import neirobizServices from '../data/neirobizServices';

const NeirobizShowcase = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white px-3 pt-6 pb-20 max-w-lg mx-auto">
      {/* Заголовок и описание */}
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold mb-2">NeiroBiz</h1>
        <div className="text-lg mb-1 font-semibold">AI-сервисы и генерация упаковки</div>
        <p className="text-zinc-300 text-sm mb-3">
          Автоматизируйте бизнес с помощью нейросетей, ботов, дизайна и аналитики.
          <br />
          <span className="font-medium text-yellow-300">Оформите заявку — получайте результат быстрее конкурентов!</span>
        </p>
      </div>

      {/* Витрина услуг */}
      <div className="grid grid-cols-1 gap-4">
        {neirobizServices.map(service => (
          <div
            key={service.id}
            className="bg-zinc-900 rounded-xl shadow flex items-center gap-4 px-4 py-3 hover:bg-zinc-800 transition"
          >
            <div className="text-3xl">{service.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-base mb-1">{service.title}</div>
              <div className="text-zinc-400 text-xs mb-2">{service.short}</div>
              <button
                onClick={() => navigate(`/neirobiz/service/${service.id}`)}
                className="px-4 py-1 bg-blue-600 rounded-lg text-white text-xs font-semibold hover:bg-blue-700"
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeirobizShowcase;
