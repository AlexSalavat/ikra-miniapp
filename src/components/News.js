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
    description: 'Аналитика, сравнение, факты о рынке икры',
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
    description: 'Stories с рейсов, портов, заводов',
    image: '/images/no-image.webp',
  },
];

const CARD_SIZE = 200; // px

const News = () => {
  return (
    <div className="bg-black min-h-screen p-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-8 text-center">Рынок / Новости побережья</h1>
        <div className="grid grid-cols-2 gap-8 justify-items-center">
          {newsSections.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
              style={{
                width: CARD_SIZE,
                height: CARD_SIZE,
              }}
            >
              <div
                className="bg-zinc-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center w-full h-full px-2 py-4"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.19), 0 1.5px 8px 0 rgba(80,80,80,0.09)',
                  transition: 'box-shadow 0.18s',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover rounded-xl mb-2 bg-zinc-800"
                  style={{
                    width: 100,
                    height: 100,
                    marginBottom: 10,
                  }}
                  onError={e => { e.target.src = '/images/no-image.webp'; }}
                />
                <h3
                  className="text-white font-semibold"
                  style={{
                    fontSize: '13px',
                    marginBottom: 4,
                    fontWeight: 700,
                  }}
                >
                  {item.emoji} {item.title}
                </h3>
                <p
                  className="text-zinc-300"
                  style={{
                    fontSize: '11.5px',
                    lineHeight: '1.35',
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
