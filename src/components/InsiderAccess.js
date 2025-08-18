import React from 'react';
import { Link } from 'react-router-dom';

export default function InsiderAccess() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Инсайдерский доступ</h1>
      <p className="text-sm text-gray-600">
        Раздел доступен только партнёрам. Оставьте заявку — свяжемся.
      </p>
      <Link to="/lead" className="inline-block rounded-xl bg-black text-white px-4 py-2">
        Оставить заявку
      </Link>
    </div>
  );
}
