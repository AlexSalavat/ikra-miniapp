import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_FORM = {
  type: 'sell', // "sell" (Борт полный) или "buy" (Забирай)
  title: '',
  company: '',
  price: '',
  category: '',
  region: '',
  contact: '',
  description: '',
  warehouse: '',
  payment: '',
  documents: '',
  image: null,
};

const CATEGORIES = [
  { value: '', label: 'Выбери категорию' },
  { value: 'ikra', label: 'Икра' },
  { value: 'ryba', label: 'Рыба' },
  { value: 'krab', label: 'Краб' },
  { value: 'more', label: 'Морепродукты' },
];

export default function AddAdForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm((f) => ({ ...f, image: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.category || !form.contact) {
      alert('Заполни хотя бы название, категорию и контакты!');
      return;
    }
    const newAd = { ...form, id: Date.now(), image: preview || '/images/no-image.webp' };
    onSubmit?.(newAd);
    setForm(INITIAL_FORM);
    setPreview(null);
    alert('Объявление отправлено на модерацию (или в демо — добавлено)!');
    navigate('/market/sell'); // вернуться к списку после отправки
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px 0 60px 0',
      }}
    >
      <div
        style={{
          background: '#18181f',
          borderRadius: 21,
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 3px 16px #1013194d',
          padding: '23px 19px 25px 19px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: 20,
            marginBottom: 17,
            letterSpacing: '.015em',
          }}
        >
          Разместить объявление
        </h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Тип объявления */}
          <div style={{ display: 'flex', gap: 17, marginBottom: 15, justifyContent: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <input
                type="radio"
                name="type"
                value="sell"
                checked={form.type === 'sell'}
                onChange={handleChange}
                style={{ accentColor: '#23df81', width: 17, height: 17 }}
              />
              <span style={{ color: '#23df81', fontWeight: 700, fontSize: 14.2 }}>Борт полный</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <input
                type="radio"
                name="type"
                value="buy"
                checked={form.type === 'buy'}
                onChange={handleChange}
                style={{ accentColor: '#38d8ff', width: 17, height: 17 }}
              />
              <span style={{ color: '#38d8ff', fontWeight: 700, fontSize: 14.2 }}>Забирай</span>
            </label>
          </div>

          {/* Категория */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{
              marginBottom: 10,
              padding: '10px 10px',
              borderRadius: 10,
              fontWeight: 600,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.7,
              marginTop: 2,
              outline: 'none',
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Название */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название объявления"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              fontWeight: 700,
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Фото */}
          <div style={{ marginBottom: 13 }}>
            <label style={{ color: '#b9b9b9', fontSize: 13, fontWeight: 600 }}>Фото:</label>
            <br />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{
                marginTop: 4,
                color: '#fff',
              }}
            />
            {preview && (
              <div style={{ marginTop: 7 }}>
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: 108, borderRadius: 14, boxShadow: '0 2px 12px #181a1a44' }}
                />
              </div>
            )}
          </div>

          {/* Компания */}
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Компания (необязательно)"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Цена */}
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Цена (например, 3100 ₽/кг)"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Регион */}
          <input
            name="region"
            value={form.region}
            onChange={handleChange}
            placeholder="Регион"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Контакты */}
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Контакты для связи"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Описание */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Краткое описание"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              minHeight: 48,
              fontWeight: 500,
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.6,
              outline: 'none',
            }}
          />

          {/* Склад */}
          <input
            name="warehouse"
            value={form.warehouse}
            onChange={handleChange}
            placeholder="Склад (адрес)"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Оплата */}
          <input
            name="payment"
            value={form.payment}
            onChange={handleChange}
            placeholder="Варианты оплаты"
            style={{
              marginBottom: 9,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Документы */}
          <input
            name="documents"
            value={form.documents}
            onChange={handleChange}
            placeholder="Документы (Меркурий, Честный знак...)"
            style={{
              marginBottom: 13,
              padding: '10px 10px',
              borderRadius: 10,
              width: '100%',
              background: '#1f2329',
              color: '#fff',
              border: 'none',
              fontSize: 13.8,
              outline: 'none',
            }}
          />

          {/* Кнопка */}
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #44e2ff 0%, #357cff 100%)',
              color: '#fff',
              fontWeight: 800,
              fontSize: 16.5,
              border: 'none',
              borderRadius: 12,
              padding: '14px 0',
              marginTop: 10,
              boxShadow: '0 2px 13px #43e4f355',
              cursor: 'pointer',
              letterSpacing: '.01em',
              transition: 'background 0.18s',
            }}
          >
            Разместить объявление
          </button>
        </form>
      </div>
    </div>
  );
}
