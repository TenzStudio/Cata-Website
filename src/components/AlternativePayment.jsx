import { useState } from 'react';
import { Smartphone, Wallet, QrCode, MapPin } from 'lucide-react';

export default function AlternativePayment({ amountValue, type, onSuccess }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
          <QrCode size={120} strokeWidth={1} color="var(--color-primary)" />
        </div>
        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Pay with Venmo</h4>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Scan the QR code above or send your {amountValue} {type} to <strong>@CATA-Venmo</strong>.
        </p>
      </div>

      <button 
        onClick={onSuccess} 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '1rem', borderRadius: '12px' }}
      >
        I have completed my payment
      </button>
    </div>
  );
}
