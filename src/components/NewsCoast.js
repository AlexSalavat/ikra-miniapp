import React from 'react';

export default function NewsCoast() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Новости побережья</h1>
      <p className="text-sm text-gray-600">
        Здесь могла бы быть ваша аналитика за 7 дней, цены на икру/рыбу, логистика и т.п.
      </p>
      {/* Пример карточек */}
      <div className="grid grid-cols-1 gap-3">
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-gray-500">Камчатка · сегодня</div>
          <div className="font-semibold">Лососёвая идёт, цена стабильно ↑</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm text-gray-500">Сахалин · вчера</div>
          <div className="font-semibold">Шторм — задержки рейсов 12–24ч</div>
        </div>
      </div>
    </div>
  );
}
