import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import suppliers from '../data/suppliers';

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const supplier = suppliers.find((item) => item.id === id);

  if (!supplier) {
    return <div style={{ padding: '20px' }}>Поставщик не найден</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        ← Назад
      </button>

      <img
        src={supplier.logo}
        alt={supplier.name}
        style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '12px' }}
      />

      <h2>{supplier.name}</h2>
      <p><strong>📍 Регион:</strong> {supplier.region}</p>
      <p><strong>📦 Продукты:</strong> {supplier.products}</p>
      {supplier.verified && <p><strong>🏆 Статус:</strong> Проверенный поставщик</p>}

      <p style={{ marginTop: '20px' }}>{supplier.fullDescription}</p>

      <h3>📇 Контакты</h3>
      <ul>
        <li>Телеграм: {supplier.contacts.telegram}</li>
        <li>Телефон: {supplier.contacts.phone}</li>
        <li>Email: {supplier.contacts.email}</li>
      </ul>

      {supplier.certs?.length > 0 && (
        <>
          <h3>📑 Сертификаты</h3>
          <ul>
            {supplier.certs.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </>
      )}

      {supplier.gallery?.length > 0 && (
        <>
          <h3>📸 Фото</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {supplier.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="gallery"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SupplierDetail;
