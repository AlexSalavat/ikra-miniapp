// src/components/LogisticsShowcase.js
import React from "react";
import logistics from "../data/logistics";
import LogisticsCard from "./LogisticsCard";

function LogisticsShowcase() {
  return (
    <div className="max-w-4xl mx-auto mt-6 p-2">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Логистика ДВ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {logistics.map((item) => (
          <LogisticsCard key={item.id} logistics={item} />
        ))}
      </div>
    </div>
  );
}

export default LogisticsShowcase;
