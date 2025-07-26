// src/components/SupplierCard.js
import React from "react";

function SupplierCard({ supplier, onClick }) {
  return (
    <div
      className="
        cursor-pointer
        bg-neutral-900
        rounded-2xl
        shadow
        p-4
        flex flex-col
        items-center
        hover:shadow-lg
        transition
        active:bg-blue-950
        active:shadow-blue-500/30
      "
      onClick={onClick}
    >
      <img
        src={supplier.logo || "/images/no-image.webp"}
        alt={supplier.name}
        className="w-20 h-20 object-cover rounded-xl mb-3"
      />
      <h3 className="font-bold text-blue-200 text-center mb-1">{supplier.name}</h3>
      <p className="text-gray-400 text-sm text-center mb-2">{supplier.location}</p>
      <p className="text-gray-300 text-xs text-center">{supplier.description}</p>
    </div>
  );
}

export default SupplierCard;
