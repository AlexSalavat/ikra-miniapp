// src/components/ProductionShowcase.js
import React from "react";
import production from "../data/production";
import ProductionCard from "./ProductionCard";

function ProductionShowcase() {
  return (
    <div className="max-w-4xl mx-auto mt-6 p-2">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Производство</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {production.map((item) => (
          <ProductionCard key={item.id} production={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductionShowcase;
