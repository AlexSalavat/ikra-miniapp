import React from 'react';

const newsSections = [
  {
    emoji: '⚓',
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: '/images/new.webp',
  },
  {
    emoji: '🧾',
    title: 'Икорные войны',
    description: 'Анализ, сравнение, скандалы и успехи производителей',
    image: '/images/war.webp',
  },
  {
    emoji: '🏆',
    title: 'ТОП производители',
    description: 'Рейтинги поставщиков, доверие рынка, динамика',
    image: '/images/pk.webp',
  },
  {
    emoji: '📸',
    title: 'Фото и видео',
    description: 'Stories c рейсов, портов, заводов',
    image: '/images/no-image.webp',
  },
];

const News = () => {
  return (
    <div className="bg-black min-h-screen p-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-8 text-center">Рынок / Новости побережья</h1>
        <div className="grid grid-cols-2 gap-7">
          {newsSections.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-[1.025] transition-all min-h-[310px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[130px] h-[130px] object-cover rounded-2xl mb-4 bg-zinc-800 shadow-md"
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
              <h3 className="mt-1 text-xl font-bold text-white">{item.emoji} {item.title}</h3>
              <p className="text-zinc-300 text-base mt-3">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
