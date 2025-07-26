// src/components/Market.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Market() {
  const navigate = useNavigate();
  return (
    <div className="max-w-lg mx-auto mt-8 p-2">
      <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">Маркет</h2>
      <div className="grid grid-cols-1 gap-8">
        {/* Карточка: Борт полный (Продать) */}
        <div
          className="cursor-pointer bg-neutral-900 rounded-2xl shadow-lg p-7 border-2 border-blue-500 hover:bg-blue-950 transition-all flex items-center"
          onClick={() => navigate("/market/sell/ikra")}
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-300 mb-1">Борт полный</h3>
            <p className="text-gray-300 text-sm">
              Дать объявление о продаже: икра, рыба, краб, морепродукты
            </p>
          </div>
          <span className="ml-5 text-3xl">🛒</span>
        </div>
        {/* Карточка: На охоте за уловом (Купить) */}
        <div
          className="cursor-pointer bg-neutral-900 rounded-2xl shadow-lg p-7 border-2 border-blue-500 hover:bg-blue-950 transition-all flex items-center"
          onClick={() => navigate("/market/buy")}
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-300 mb-1">На охоте за уловом</h3>
            <p className="text-gray-300 text-sm">
              Разместить запрос на покупку: ищу икру, краба, рыбу...
            </p>
          </div>
          <span className="ml-5 text-3xl">🔎</span>
        </div>
      </div>
    </div>
  );
}

export default Market;
