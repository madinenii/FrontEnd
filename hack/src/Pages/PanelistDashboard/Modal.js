import React from 'react';
import './MyComponent.css'; // Import CSS for MyComponent


const Modal = ({ onClose, onAccept, onReject, children }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '5px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>X</button>
        {children}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button className="btn" onClick={onAccept}>Accept</button>
          <button className="btn" onClick={onReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
