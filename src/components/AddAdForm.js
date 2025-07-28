import React, { useState } from "react";

const INITIAL_FORM = {
  type: "sell",           // "sell" (Борт полный) или "buy" (Забирай)
  title: "",
  company: "",
  price: "",
  category: "",
  region: "",
  contact: "",
  description: "",
  warehouse: "",
  payment: "",
  documents: "",
  image: null, // файл или строка
};

const CATEGORIES = [
  { value: "", label: "Выбери категорию" },
  { value: "ikra", label: "Икра" },
  { value: "ryba", label: "Рыба" },
  { value: "krab", label: "Краб" },
  { value: "more", label: "Морепродукты" },
];

export default function AddAdForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.category || !form.contact) {
      alert("Заполни хотя бы название, категорию и контакты!");
      return;
    }
    // Фейковый id, в реальном проекте будет другой
    const newAd = { ...form, id: Date.now(), image: preview || "/images/no-image.webp" };
    onSubmit?.(newAd);
    setForm(INITIAL_FORM);
    setPreview(null);
    alert("Объявление отправлено на модерацию (или в демо — добавлено)!");
  }

  return (
    <div style={{
      background: "#111114",
      borderRadius: 18,
      maxWidth: 420,
      margin: "32px auto 0 auto",
      padding: "20px 18px 23px 18px",
      boxShadow: "0 2px 17px #181a2269"
    }}>
      <form onSubmit={handleSubmit}>
        {/* Тип объявления */}
        <div style={{ display: "flex", gap: 17, marginBottom: 14 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            <input
              type="radio"
              name="type"
              value="sell"
              checked={form.type === "sell"}
              onChange={handleChange}
            />
            <span style={{ color: "#1dcb7b", fontWeight: 700, fontSize: 14.5 }}>Борт полный</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            <input
              type="radio"
              name="type"
              value="buy"
              checked={form.type === "buy"}
              onChange={handleChange}
            />
            <span style={{ color: "#378fff", fontWeight: 700, fontSize: 14.5 }}>Забирай</span>
          </label>
        </div>

        {/* Категория */}
        <select name="category" value={form.category} onChange={handleChange}
          style={{ marginBottom: 11, padding: "7px 9px", borderRadius: 8, fontWeight: 600, width: "100%" }}>
          {CATEGORIES.map(cat =>
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          )}
        </select>

        {/* Название */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Название объявления"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%", fontWeight: 700 }}
        />
        {/* Фото */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: "#aaa", fontSize: 13 }}>Фото:</label><br />
          <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ marginTop: 4 }} />
          {preview && (
            <div style={{ marginTop: 7 }}>
              <img src={preview} alt="preview" style={{ width: 110, borderRadius: 13 }} />
            </div>
          )}
        </div>
        {/* Компания */}
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Компания (необязательно)"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />
        {/* Цена */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Цена (например, 3100 ₽/кг)"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />
        {/* Регион */}
        <input
          name="region"
          value={form.region}
          onChange={handleChange}
          placeholder="Регион"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />
        {/* Контакты */}
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Контакты для связи"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />
        {/* Описание */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Краткое описание"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%", minHeight: 48 }}
        />
        {/* Склад */}
        <input
          name="warehouse"
          value={form.warehouse}
          onChange={handleChange}
          placeholder="Склад (адрес)"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />
        {/* Оплата */}
        <input
          name="payment"
          value={form.payment}
          onChange={handleChange}
          placeholder="Варианты оплаты"
          style={{ marginBottom: 10, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />
        {/* Документы */}
        <input
          name="documents"
          value={form.documents}
          onChange={handleChange}
          placeholder="Документы (Меркурий, Честный знак...)"
          style={{ marginBottom: 13, padding: "8px 9px", borderRadius: 8, width: "100%" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #3B82F6, #63f6f7)",
            color: "#181a22",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 10,
            padding: "13px 0",
            marginTop: 10,
            boxShadow: "0 2px 13px #61d3f633",
            cursor: "pointer"
          }}
        >Разместить объявление</button>
      </form>
    </div>
  );
}
