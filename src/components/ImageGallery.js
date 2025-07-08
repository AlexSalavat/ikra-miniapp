import React, { useState } from 'react';

const galleryBoxStyle = {
  width: 220,
  height: 220,
  borderRadius: 18,
  overflow: 'hidden',
  boxShadow: '0 6px 32px 0 rgba(60,40,10,0.13), 0 2px 8px 0 rgba(0,0,0,0.18)',
  background: 'linear-gradient(97deg, #fffbe5 0%, #fff3ce 100%)',
  margin: '0 auto 16px auto',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 28,
  height: 44,
  background: 'rgba(36,30,15,0.22)',
  color: '#fff',
  border: 'none',
  borderRadius: 15,
  fontSize: 22,
  fontWeight: 700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  opacity: 0.78,
  transition: 'background .16s'
};

const dotStyle = isActive => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  margin: '0 4px',
  background: isActive ? '#d8b572' : '#dadada',
  opacity: isActive ? 1 : 0.6,
  transition: 'background .18s'
});

export default function ImageGallery({ images }) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={galleryBoxStyle}>
        <img
          src="/images/no-image.webp"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 18,
            background: '#f2ede4',
            opacity: 0.7
          }}
        />
      </div>
    );
  }

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div style={galleryBoxStyle}>
      {images.length > 1 && (
        <>
          <button style={{ ...arrowStyle, left: 5 }} onClick={prev} aria-label="Назад">
            &#8592;
          </button>
          <button style={{ ...arrowStyle, right: 5 }} onClick={next} aria-label="Вперёд">
            &#8594;
          </button>
        </>
      )}
      <img
        src={images[idx]}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 18,
          background: '#f2ede4',
          transition: 'opacity .28s, transform .21s cubic-bezier(.4,2,.2,1)',
          boxShadow: '0 2px 7px 0 rgba(180,120,20,0.10)'
        }}
        onError={e => { e.target.src = '/images/no-image.webp'; }}
      />
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 12,
          display: 'flex', justifyContent: 'center'
        }}>
          {images.map((_, i) => (
            <span key={i} style={dotStyle(i === idx)} />
          ))}
        </div>
      )}
    </div>
  );
}
