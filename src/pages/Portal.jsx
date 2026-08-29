import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut, Settings, CreditCard, Ticket, ShieldCheck, Download, User, Calendar, Bell } from 'lucide-react';
import SEO from '../components/SEO';

export default function Portal() {
  const { user, logout, loading } = useAuth();

  // If loading auth state, just render nothing or a spinner
  if (loading) return null;

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '6rem' }}>
      <SEO title="Member Portal" description="Manage your Capital Area Tibetan Association membership and profile." />
      {/* Portal Header */}
      <div className="bg-portal">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 800, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '0.25rem', color: 'white' }}>Welcome back, {user.name}!</h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={20} /> Member since 2026
                </p>
              </div>
            </div>
            <button onClick={logout} className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(10px)' }}>
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-5rem', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Membership Status Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.75rem', borderRadius: '16px' }}>
                <CreditCard size={28} />
              </div>
              <span className="badge" style={{ background: '#10B981', color: 'white' }}>{user.membershipStatus}</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Annual Membership</h3>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
              Your membership is active and automatically renews on <strong style={{ color: 'var(--color-heading)' }}>{user.expiryDate}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem' }}>Manage Billing</button>
              <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Digital Card
              </button>
            </div>
          </motion.div>

          {/* Member Benefits & Codes */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: '2rem', background: 'linear-gradient(135deg, white 0%, #F8FAFC 100%)' }}>
            <div style={{ display: 'inline-flex', background: 'rgba(0,98,255,0.1)', color: 'var(--color-primary)', padding: '0.75rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <Ticket size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Exclusive Perks</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'white', border: '1px dashed var(--color-primary)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>10% Hall Rental Discount</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Use code at checkout</p>
                </div>
                <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px' }}>
                  CATA-MEM-26
                </div>
              </div>

              <div style={{ background: 'white', border: '1px dashed #F59E0B', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>Event Tickets: $5 Off</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Automatically applied at RSVP</p>
                </div>
                <div style={{ color: '#F59E0B', padding: '0.5rem', fontWeight: 800, fontSize: '0.9rem' }}>
                  ACTIVE
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Profile Settings Placeholder */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.05)', color: 'var(--color-text)', padding: '0.75rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <Settings size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Profile Settings</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ padding: '1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s', border: '1px solid transparent' }} className="hover-border-gray">
                <span style={{ fontWeight: 500 }}>Personal Information</span>
                <span style={{ color: 'var(--color-text-light)' }}>→</span>
              </li>
              <li style={{ padding: '1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s', border: '1px solid transparent' }} className="hover-border-gray">
                <span style={{ fontWeight: 500 }}>Notification Preferences</span>
                <span style={{ color: 'var(--color-text-light)' }}>→</span>
              </li>
              <li style={{ padding: '1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s', border: '1px solid transparent' }} className="hover-border-gray">
                <span style={{ fontWeight: 500 }}>Donation History</span>
                <span style={{ color: 'var(--color-text-light)' }}>→</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        .hover-border-gray:hover {
          background-color: rgba(0,0,0,0.02);
          border-color: var(--color-border);
        }
      `}</style>
    </div>
  );
}
