import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Users, Building, Heart, Gift, CheckCircle2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';
import SEO from '../components/SEO';


export default function Donate() {
  const [amount, setAmount] = useState(100);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('One-time');
  const [fund, setFund] = useState('General Fund');
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const frequencies = ['One-time', 'Monthly Recurring'];
  const funds = ['General Fund', 'Language School', 'Building Fund'];

  const recentDonations = [
    { name: 'Anonymous', amount: 100, fund: 'General Fund' },
    { name: 'Tenzin C.', amount: 50, fund: 'Language School' },
    { name: 'Sonam W.', amount: 250, fund: 'Building Fund' },
    { name: 'Anonymous', amount: 25, fund: 'General Fund' },
    { name: 'Lobsang D.', amount: 100, fund: 'Language School' },
    { name: 'Anonymous', amount: 500, fund: 'Building Fund' },
  ];

  const tiers = [
    { value: 25, label: '$25', impact: 'Supplies', icon: Book },
    { value: 50, label: '$50', impact: '1 Student', icon: Users },
    { value: 100, label: '$100', impact: 'Operations', icon: Building },
    { value: 250, label: '$250', impact: 'Sponsorship', icon: Heart },
    { value: 'Custom', label: 'Custom', impact: 'Any Amount', icon: Gift }
  ];
  return (
    <div>
      <SEO title="Donate" description="Support the Capital Area Tibetan Association. Your donation helps preserve our culture." />
      <section className="section bg-events" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Support Our Mission</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Your support helps us preserve Tibetan culture, organize community events, support youth programs, 
            care for our elders, and strengthen our community for future generations.
          </p>
        </div>
      </section>

      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="aurora-orb primary" style={{ top: '10%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        
        <div className="container" style={{ paddingTop: '2rem', position: 'relative', zIndex: 10 }}>
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>Make a Secure Donation</h2>
          
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', padding: '0.35rem', borderRadius: '50px', marginBottom: '2rem', position: 'relative' }}>
            {frequencies.map(freq => (
              <div 
                key={freq}
                onClick={() => setFrequency(freq)}
                style={{ 
                  flex: 1, textAlign: 'center', padding: '0.75rem', cursor: 'pointer',
                  position: 'relative', zIndex: 1,
                  fontWeight: 600, fontSize: '0.95rem',
                  color: frequency === freq ? 'var(--color-primary)' : 'var(--color-text-light)',
                  transition: 'color 0.3s'
                }}
              >
                {frequency === freq && (
                  <motion.div 
                    layoutId="freqHighlight"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'white', borderRadius: '50px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: -1 }}
                  />
                )}
                {freq}
              </div>
            ))}
          </div>

          <p style={{ fontWeight: 500, marginBottom: '1rem' }}>Select Amount:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {tiers.map(tier => {
              const isSelected = tier.value === 'Custom' ? isCustom : (!isCustom && amount === tier.value);
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (tier.value === 'Custom') {
                      setIsCustom(true);
                    } else {
                      setIsCustom(false);
                      setAmount(tier.value);
                    }
                  }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '1.25rem 0.5rem', borderRadius: '16px', cursor: 'pointer',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid rgba(0, 98, 255, 0.1)',
                    backgroundColor: isSelected ? 'rgba(0, 98, 255, 0.05)' : 'white',
                    boxShadow: isSelected ? '0 10px 30px rgba(0, 98, 255, 0.2)' : '0 4px 12px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={24} style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-light)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: isSelected ? 'var(--color-primary)' : 'var(--color-text)', marginBottom: '0.25rem' }}>{tier.label}</span>
                </motion.div>
              );
            })}
          </div>

          {isCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: '2rem' }}
            >
              <label style={{ fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Enter Custom Amount:</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--color-text)', fontSize: '1.2rem' }}>$</span>
                <input
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(Number(e.target.value));
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 2.5rem',
                    borderRadius: '12px',
                    border: '2px solid var(--color-primary)',
                    fontSize: '1.2rem',
                    outline: 'none',
                    background: 'rgba(0,98,255,0.02)'
                  }}
                  placeholder="0.00"
                />
              </div>
            </motion.div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: 500, marginBottom: '1rem' }}>Fund Allocation:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: 'rgba(0,0,0,0.05)', padding: '0.35rem', borderRadius: '16px' }}>
              {funds.map(f => (
                <div 
                  key={f}
                  onClick={() => setFund(f)}
                  style={{ 
                    flex: '1 1 auto', textAlign: 'center', padding: '0.75rem 1rem', cursor: 'pointer',
                    position: 'relative', zIndex: 1,
                    fontWeight: 600, fontSize: '0.85rem',
                    color: fund === f ? 'var(--color-primary)' : 'var(--color-text-light)',
                    transition: 'color 0.3s'
                  }}
                >
                  {fund === f && (
                    <motion.div 
                      layoutId="fundHighlight"
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: -1 }}
                    />
                  )}
                  {f}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showCheckout && !isSuccess && (
              <motion.button 
                key="proceed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCheckout(true)} 
                className="btn btn-accent" 
                style={{ width: '100%', fontSize: '1.25rem', padding: '1rem' }}
              >
                Proceed to Checkout
              </motion.button>
            )}

            {showCheckout && !isSuccess && (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                style={{ marginTop: '1rem' }}
              >
                <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,98,255,0.05)', borderRadius: '16px', border: '1px solid rgba(0,98,255,0.1)', marginBottom: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Complete your Donation</h3>
                  <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>You will be redirected to our secure Stripe checkout page.</p>
                  <a 
                    href="https://buy.stripe.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ display: 'block', width: '100%', padding: '1rem', textDecoration: 'none' }}
                  >
                    Donate ${amount} via Stripe
                  </a>
                </div>
                <button onClick={() => setShowCheckout(false)} className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '12px' }}>Cancel</button>
              </motion.div>
            )}

            {isSuccess && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ textAlign: 'center', padding: '2.5rem 2rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '24px', border: '1px dashed rgba(16, 185, 129, 0.3)' }}
              >
                <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: '#10B981', marginBottom: '1.5rem' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Thank you for your generosity!</h3>
                <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: '2rem' }}>Your <strong style={{ color: 'var(--color-heading)' }}>${amount}</strong> donation to the {fund} has been successfully processed.</p>
                <button onClick={() => { setIsSuccess(false); setShowCheckout(false); }} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Make another donation</button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <p className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
            🔒 Payments are securely processed. The Tibetan Association is a registered 501(c)(3) non-profit organization. All donations are tax-deductible.
          </p>
        </div>
      </div>

      {/* Wall of Gratitude Marquee */}
      <div style={{ padding: '4rem 0', marginTop: '4rem', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-heading)' }}>Wall of Gratitude</h3>
          <p style={{ color: 'var(--color-text-light)' }}>Thank you to our recent supporters for making our mission possible.</p>
        </div>
        
        <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
          {/* Gradient Masks for fade effect at edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, #F8FAFC, transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, #F8FAFC, transparent)', zIndex: 2 }} />
          
          <motion.div 
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
            style={{ display: 'flex', gap: '2rem', padding: '1rem 0', whiteSpace: 'nowrap' }}
          >
            {[...recentDonations, ...recentDonations].map((donation, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '1.25rem', 
                  padding: '1.25rem 2.5rem', background: 'white', 
                  borderRadius: '50px', border: '1px solid var(--color-border)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ background: 'rgba(0,98,255,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)', display: 'flex' }}>
                  <Heart size={20} fill="var(--color-primary)" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-heading)', marginBottom: '0.1rem' }}>{donation.name} donated ${donation.amount}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>to {donation.fund}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      </section>

    </div>
  );
}
