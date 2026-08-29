import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function StripePaymentForm({ amountLabel, amountValue, amount, type, email, name, onSuccess, buttonText = "Process Payment" }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      // 1. Fetch Payment Intent client secret from backend
      const response = await fetch('http://localhost:5001/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, type, email, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      // 2. Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name || 'Anonymous',
            email: email || 'unknown@example.com',
          },
        }
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
      } else {
        // Success!
        setIsProcessing(false);
        onSuccess(result.paymentIntent);
      }
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#1e293b',
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#94a3b8'
        }
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444'
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Card Details
        </label>
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(255,255,255,0.8)', 
          border: error ? '1px solid #ef4444' : '1px solid var(--color-border)', 
          borderRadius: '12px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}>
          <CardElement options={cardStyle} />
        </div>
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>

      <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600 }}>{amountLabel || "Total Due Today:"}</span>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
          {amountValue}
        </span>
      </div>

      <button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="btn btn-accent" 
        style={{ 
          width: '100%', 
          padding: '1rem', 
          borderRadius: '12px', 
          fontSize: '1.1rem', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '0.5rem',
          opacity: (!stripe || isProcessing) ? 0.7 : 1,
          cursor: (!stripe || isProcessing) ? 'not-allowed' : 'pointer'
        }}
      >
        {isProcessing ? (
          <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        ) : (
          <>
            <CreditCard size={20} />
            {buttonText}
          </>
        )}
      </button>

      {/* Define CSS animation for spinner in line just for simplicity, usually this goes in global CSS */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
