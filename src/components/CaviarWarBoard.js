import React, { useState } from "react";

const DATA = [
  // ...твой массив, как есть...
];

const ORIGINS = ["Камчатка", "Сахалин", "Хабаровск"];

const Arrow = ({ up }) => (
  <span style={{ fontSize: 15, fontWeight: 900, marginLeft: 2, color: up ? "#22e472" : "#e03c3c" }}>
    {up ? "▲" : "▼"}
  </span>
);

const BoardCell = ({ value, prev, rub }) => {
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
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: 0.06,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      whiteSpace: 'nowrap'
    }}>
      {value}{rub && <span style={{ fontSize: 11, marginLeft: 2 }}>₽</span>}{arrow}
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
      padding: '18px 0 70px 0',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <button
        onClick={() => window.history.back()}
        style={{
          alignSelf: 'flex-start',
          marginLeft: 12,
          marginBottom: 9,
          padding: '6px 13px',
          borderRadius: 10,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >← Назад</button>
      <h1 style={{
        color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: 0.08, marginBottom: 11
      }}>Икорные войны</h1>
      <div style={{ display: 'flex', gap: 7, marginBottom: 12 }}>
        {ORIGINS.map(o => (
          <button
            key={o}
            style={{
              background: 'none',
              color: origin === o ? '#37e08a' : '#cfcfcf',
              border: `2px solid ${origin === o ? '#37e08a' : '#333'}`,
              borderRadius: 9,
              padding: '4.5px 13px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'border .15s'
            }}
            onClick={() => setOrigin(o)}
          >{o}</button>
        ))}
      </div>
      <div style={{
        width: '100%',
        maxWidth: 420,
        minWidth: 320,
        background: '#151518',
        borderRadius: 15,
        boxShadow: '0 2px 17px #1a1c1f50',
        overflow: 'hidden',
        padding: '2px 0 9px 0'
      }}>
        {/* Шапка таблицы */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 0.95fr 1.25fr 1.25fr 1fr',
          padding: '6px 10px',
          fontWeight: 800,
          color: '#e4e4e4',
          fontSize: 12.5,
          background: '#1e2025',
          borderBottom: '1.3px solid #26262c',
          textAlign: 'left',
        }}>
          <span style={{paddingLeft:2}}>Происх.</span>
          <span>Вид</span>
          <span>У производителя</span>
          <span>В Москве</span>
          <span style={{textAlign:'right', paddingRight:2}}>Дата</span>
        </div>
        {/* Данные */}
        {filterData.map((row, idx) => (
          <div key={idx} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 0.95fr 1.25fr 1.25fr 1fr',
            padding: '7px 10px',
            fontWeight: 500,
            fontSize: 13.2,
            color: '#fff',
            alignItems: 'center',
            borderBottom: idx === filterData.length - 1 ? 'none' : '1px solid #1a1a1f',
            textAlign: 'left',
          }}>
            <span style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.origin}</span>
            <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.kind}</span>
            <BoardCell value={row.producerPrice} prev={row.prevProducerPrice} rub />
            <BoardCell value={row.moscowPrice} prev={row.prevMoscowPrice} rub />
            <span style={{ fontWeight: 400, fontSize: 11.7, color: '#cfcfcf', justifySelf: 'end' }}>{row.date}</span>
          </div>
        ))}
      </div>
      <div style={{ color: '#aaa', fontSize: 12, marginTop: 13, textAlign: 'center' }}>
        Данные тестовые.<br />Позже подключим Google Sheets и график динамики цен!
      </div>
    </div>
  );
};

export default CaviarWarBoard;
