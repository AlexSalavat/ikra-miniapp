import React from "react";
import { useParams } from "react-router-dom";
import suppliers from "../data/suppliers";
import CompanyProfile from "./CompanyProfile";

const SupplierDetail = () => {
  const { id } = useParams();
  const company = suppliers.find(item => item.id === id);

  if (!company) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-lg">
        Компания не найдена
      </div>
    );
  }

  return <CompanyProfile company={company} />;
};

export default SupplierDetail;
