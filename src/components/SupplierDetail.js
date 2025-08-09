import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import suppliers from "../data/suppliers";
import CompanyProfile from "./CompanyProfile";

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = suppliers.find((item) => item.id === id);

  if (!company) {
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="max-w-md mx-auto w-full px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
              aria-label="Назад"
            >
              <svg width="20" height="20" fill="none">
                <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold">Назад</span>
            </button>
            <h2 className="ml-auto mr-auto text-white font-bold text-lg">Поставщик</h2>
            <span className="w-16" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-white/80 text-base px-4">
          Компания не найдена
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto w-full px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
            aria-label="Назад"
          >
            <svg width="20" height="20" fill="none">
              <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">
            {company.name}
          </h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Профиль */}
      <CompanyProfile company={company} />
    </div>
  );
};

export default SupplierDetail;
