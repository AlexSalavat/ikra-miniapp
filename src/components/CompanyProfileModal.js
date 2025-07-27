import React from 'react';
import CompanyProfile from './CompanyProfile';

const modalStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.63)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'auto',
  padding: '18px 0',
};

const innerStyle = {
  background: '#18181c',
  borderRadius: 21,
  maxWidth: 420,
  width: '94vw',
  boxShadow: '0 7px 40px #0007',
  padding: '0 0 20px 0',
  position: 'relative',
  maxHeight: '92vh',
  overflowY: 'auto',
};

export default function CompanyProfileModal({ company, onClose }) {
  if (!company) return null;
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={innerStyle} onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 17,
            top: 11,
            zIndex: 2,
            fontSize: 22,
            color: '#bbb',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color .18s'
          }}
          onMouseOver={e => e.currentTarget.style.color = '#37e08a'}
          onMouseOut={e => e.currentTarget.style.color = '#bbb'}
        >×</button>
        <div style={{ padding: '0 18px' }}>
          <CompanyProfile company={company} />
        </div>
      </div>
    </div>
  );
}
