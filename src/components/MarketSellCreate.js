import React, { useState } from "react";

const categories = [
  { value: "ikra", label: "Икра" },
  { value: "ryba", label: "Рыба" },
  { value: "krab", label: "Краб" },
  { value: "more", label: "Морепродукты" },
];

export default function MarketSellCreate() {
  const [form, setForm] = useState({
    title: "",
    category: categories[0].value,
    company: "",
    region: "",
    price: "",
    contact: "",
    description: "",
    documents: "",
    warehouse: "",
    payment: "",
    images: [],
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleFiles(e) {
    setForm(f => ({ ...f, images: Array.from(e.target.files) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.price || !form.contact) {
      setError("Заполните обязательные поля: название, цена, контакты.");
      return;
    }
    setSending(true);
    // Здесь должна быть логика отправки (API-запрос или др.)
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      // сброс формы или редирект, если нужно
    }, 1100);
  }

  if (success) {
    return (
      <div style={{
        minHeight: "100vh", background: "#000", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}>
        <div style={{
          color: "#23df81", fontSize: 22, fontWeight: 800, marginBottom: 18, textAlign: "center"
        }}>Спасибо!<br />Объявление отправлено на модерацию</div>
        <a href="/market" style={{
          color: "#2678f3", fontWeight: 700, fontSize: 16, textDecoration: "underline"
        }}>← Вернуться к объявлениям</a>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "16px 0 64px 0",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 410,
        background: "#18191e",
        borderRadius: 22,
        boxShadow: "0 4px 18px #10151c33",
        padding: "26px 19px 19px 19px",
        margin: "0 auto"
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: 21,
          marginBottom: 16,
          textAlign: "center",
          letterSpacing: ".02em"
        }}>Новое объявление</div>
        <form onSubmit={handleSubmit}>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600, color:"#6ee7b7"}}>Категория</label><br/>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
            >
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Название объявления *</label><br/>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Например: Икра кеты солёная, 2024"
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
              required
            />
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Компания / Продавец</label><br/>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Название организации"
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
            />
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Регион / Город</label><br/>
            <input
              name="region"
              value={form.region}
              onChange={handleChange}
              placeholder="Камчатка, Владивосток и т.д."
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
            />
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Цена *</label><br/>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Например: 3200 ₽/кг"
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
              required
            />
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Контакты для связи *</label><br/>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Телефон, e-mail, Telegram"
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
              required
            />
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Описание</label><br/>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Подробнее о продукте, условиях доставки и т.д."
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                minHeight: 60,
                outline: "none",
                resize: "vertical"
              }}
            />
          </div>

          <div style={{marginBottom:13, display: "flex", gap: 9}}>
            <div style={{flex:1}}>
              <label style={{fontSize:13.5, fontWeight:600}}>Документы</label><br/>
              <input
                name="documents"
                value={form.documents}
                onChange={handleChange}
                placeholder="Меркурий, Честный знак и др."
                style={{
                  width: "100%",
                  padding: "7px 8px",
                  background: "#23232a",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 14,
                  marginTop: 2,
                  fontWeight: 500,
                  outline: "none"
                }}
              />
            </div>
            <div style={{flex:1}}>
              <label style={{fontSize:13.5, fontWeight:600}}>Склад</label><br/>
              <input
                name="warehouse"
                value={form.warehouse}
                onChange={handleChange}
                placeholder="Адрес хранения"
                style={{
                  width: "100%",
                  padding: "7px 8px",
                  background: "#23232a",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 14,
                  marginTop: 2,
                  fontWeight: 500,
                  outline: "none"
                }}
              />
            </div>
          </div>

          <div style={{marginBottom:13}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Оплата</label><br/>
            <input
              name="payment"
              value={form.payment}
              onChange={handleChange}
              placeholder="Безнал, наличный"
              style={{
                width: "100%",
                padding: "7px 8px",
                background: "#23232a",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 14,
                marginTop: 2,
                fontWeight: 500,
                outline: "none"
              }}
            />
          </div>

          <div style={{marginBottom:17}}>
            <label style={{fontSize:13.5, fontWeight:600}}>Фото (до 3 файлов)</label><br/>
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              style={{
                marginTop: 3,
                color: "#a2a2a2",
                background: "#23232a",
                border: "none",
                borderRadius: 8,
                fontSize: 13.5
              }}
            />
            {form.images && form.images.length > 0 && (
              <div style={{marginTop: 7, display: "flex", gap: 7}}>
                {form.images.slice(0,3).map((img, idx) => (
                  <div key={idx} style={{
                    width: 54, height: 54, borderRadius: 11, overflow: "hidden", background: "#181c20",
                    border: "1.3px solid #2a2c32", display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      style={{width: "100%", height: "100%", objectFit: "cover"}}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <div style={{ color: "#f55757", fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <button
            type="submit"
            disabled={sending}
            style={{
              background: "#2678f3",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 11,
              padding: "12px 0",
              fontSize: 15.6,
              width: "100%",
              border: "none",
              cursor: sending ? "not-allowed" : "pointer",
              marginTop: 2,
              boxShadow: "0 2px 9px #2678f330",
              opacity: sending ? 0.65 : 1,
              letterSpacing: ".01em",
              transition: "opacity .17s"
            }}
          >{sending ? "Отправка..." : "Разместить объявление"}</button>
        </form>
      </div>
    </div>
  );
}
