import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Тестовый блок Tailwind */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-2xl p-6 rounded-2xl shadow-xl mb-5">
        Tailwind работает!
      </div>
      <h1 className="text-white text-3xl font-bold mb-3">Главная страница</h1>
      <p className="text-white/80 text-lg text-center">
        Если ты видишь этот градиентный блок выше — Tailwind настроен и работает!
      </p>
    </div>
  );
};

export default Home;
