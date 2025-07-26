// src/components/Catalog.js
import React from "react";
import suppliers from "../data/suppliers";
import SupplierCard from "./SupplierCard";
import { useNavigate } from "react-router-dom";

function Catalog() {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto mt-6 p-2">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Каталог поставщиков</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onClick={() => navigate(`/supplier/${supplier.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
