// Биржевой экран "Икорные войны" с тестовыми данными
import React, { useState } from "react";

const DATA = [
  {
    date: "2025-07-08",
    origin: "Камчатка",
    kind: "Горбуша",
    producerPrice: 6200,
    moscowPrice: 7100,
    prevProducerPrice: 6000,
    prevMoscowPrice: 7000,
  },
  {
    date: "2025-07-08",
    origin: "Камчатка",
    kind: "Кета",
    producerPrice: 6300,
    moscowPrice: 7200,
    prevProducerPrice: 6400,
    prevMoscowPrice: 7350,
  },
  {
    date: "2025-07-08",
    origin: "Камчатка",
    kind: "Кижуч",
    producerPrice: 7600,
    moscowPrice: 8250,
    prevProducerPrice: 7500,
    prevMoscowPrice: 8150,
  },
  {
    date: "2025-07-08",
    origin: "Сахалин",
    kind: "Горбуша",
    producerPrice: 6250,
    moscowPrice: 7300,
    prevProducerPrice: 6270,
    prevMoscowPrice: 7400,
  },
  {
    date: "2025-07-08",
    origin: "Сахалин",
    kind: "Кета",
    producerPrice: 6380,
    moscowPrice: 7350,
    prevProducerPrice: 6300,
    prevMoscowPrice: 7250,
  },
  {
    date: "2025-07-08",
    origin: "Хабаровск",
    kind: "Кета",
    producerPrice: 6500,
    moscowPrice: 7450,
    prevProducerPrice: 6450,
    prevMoscowPrice: 7500,
  },
  {
    date: "2025-07-07",
    origin: "Камчатка",
    kind: "Горбуша",
    producerPrice: 6000,
    moscowPrice: 7000,
    prevProducerPrice: 6000,
    prevMoscowPrice: 7000,
  },
  {
    date: "2025-07-07",
    origin: "Сахалин",
    kind: "Горбуша",
    producerPrice: 6270,
    moscowPrice: 7400,
    prevProducerPrice: 6270,
    prevMoscowPrice: 7400,
  },
  {
    date: "2025-07-07",
    origin: "Хабаровск",
    kind: "Кета",
    producerPrice: 6450,
    moscowPrice: 7500,
    prevProducerPrice: 6450,
    prevMoscowPrice: 7500,
  },
];

const ORIGINS = ["Камчатка", "Сахалин", "Хабаровск"];

const Arrow = ({ up }) => (
  <span style={{ fontSize: 16, fontWeight: 900, marginLeft: 3, color: up ? "#22e472" : "#e03c3c" }}>
    {up ? "▲" : "▼"}
  </span>
);

const BoardCell = ({ value, prev, rub, small }) => {
  let color = "#fff";
  let arrow = null;
  if (prev !== undefined) {
    if (value > prev) {
      color = "#22e472";
      arrow = <Arrow up />;
    } else if (value < prev) {
      color = "#e03c3c";
      arrow = <Arrow up={false} />;
    } else {
      color = "#cfcfcf";
    }
  }
  return (
    <span style={{
      color,
      fontWeight: small ? 400 : 600,
      fontSize: small ? 13 : 16,
      letterSpacing: small ? 0 : 0.08,
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }}>
      {value}{rub && <span style={{fontSize:13, marginLeft:2}}>₽</span>}{arrow}
    </span>
  );
};

const CaviarWarBoard = () => {
  const [origin, setOrigin] = useState('Камчатка');
  const filterData = DATA.filter(row => row.origin === origin);

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      padding: '32px 0 80px 0',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <h1 style={{
        color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: 0.12, marginBottom: 19
      }}>Икорные войны</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 21 }}>
        {ORIGINS.map(o => (
          <button
            key={o}
            style={{
              background: origin === o ? '#24252a' : '#17171b',
              color: origin === o ? '#fff' : '#bdbdbd',
              border: 'none', borderRadius: 9, padding: '7px 19px', fontWeight: 600, fontSize: 14, cursor: 'pointer'
            }}
            onClick={() => setOrigin(o)}
          >{o}</button>
        ))}
      </div>
      <div style={{
        width: '100%',
        maxWidth: 480,
        minWidth: 320,
        background: '#151518',
        borderRadius: 15,
        boxShadow: '0 2px 17px #1a1c1f50',
        overflow: 'hidden',
        padding: '3px 0 11px 0'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr 1.2fr 1.2fr 0.9fr',
          padding: '9px 16px',
          fontWeight: 800,
          color: '#e4e4e4',
          fontSize: 14,
          background: '#1e2025',
          borderBottom: '1.5px solid #26262c',
        }}>
          <span>Происхождение</span>
          <span>Вид</span>
          <span>Цена у производителя</span>
          <span>Цена в Москве</span>
          <span style={{textAlign:'right'}}>Дата</span>
        </div>
        {filterData.map((row, idx) => (
          <div key={idx} style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr 1.2fr 1.2fr 0.9fr',
            padding: '10px 16px',
            fontWeight: 500,
            fontSize: 15.2,
            color: '#fff',
            alignItems: 'center',
            borderBottom: idx === filterData.length - 1 ? 'none' : '1.1px solid #1a1a1f',
          }}>
            <span style={{fontWeight: 700}}>{row.origin}</span>
            <span style={{fontWeight: 600}}>{row.kind}</span>
            <BoardCell value={row.producerPrice} prev={row.prevProducerPrice} rub />
            <BoardCell value={row.moscowPrice} prev={row.prevMoscowPrice} rub />
            <span style={{ fontWeight: 400, fontSize: 13.3, color: '#cfcfcf', justifySelf: 'end' }}>{row.date}</span>
          </div>
        ))}
      </div>
      <div style={{color:'#aaa',fontSize:13,marginTop:17}}>Данные тестовые. <br/> Позже подключим Google Sheets и график динамики цен!</div>
    </div>
  );
};

export default CaviarWarBoard;
