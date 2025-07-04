import React from 'react';
import neirobizServices from '../data/neirobizServices';

const Card = ({ title, description, image }) => (
  <div className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden border border-zinc-800 flex flex-row items-start gap-4 p-4 hover:scale-[1.01] transition-transform duration-150 mb-2">
    <picture>
      <source srcSet={image.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" />
      <img
        src={image || '/images/no-image.png'}
        alt={title}
        loading="lazy"
        className="w-20 h-20 min-w-[5rem] min-h-[5rem] object-cover rounded-xl bg-zinc-800"
        onError={e => { e.target.src = '/images/no-image.png'; }}
      />
    </picture>
    <div className="flex flex-col flex-1 justify-between h-full">
      <div>
        <div className="font-bold text-base mb-1 text-white">{title}</div>
        <div className="text-zinc-300 text-sm mb-2">{description}</div>
      </div>
      <div className="mt-2 text-right">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-xl text-xs shadow"
          onClick={() => window.open('https://t.me/your_bot_support', '_blank')}
        >
          Получить консультацию
        </button>
      </div>
    </div>
  </div>
);

const NeirobizScreen = () => (
  <div className="max-w-2xl mx-auto py-6 px-2 min-h-screen">
    <h1 className="text-2xl font-extrabold text-white mb-6 text-center">NeiroBiz: AI-сервисы для вашего бизнеса</h1>
    <div className="flex flex-col gap-4">
      {neirobizServices.map(service => (
        <Card key={service.id} {...service} />
      ))}
    </div>
  </div>
);

export default NeirobizScreen;
