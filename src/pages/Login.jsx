import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ValidatedInput from '../components/ValidatedInput';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to portal
  if (user) {
    return <Navigate to="/portal" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/portal');
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-login">
      <SEO title="Member Login" description="Log in to your Capital Area Tibetan Association member portal." />
      
      {/* Subtle floating elements */}
      <div className="aurora-orb primary" style={{ top: '10%', left: '10%', width: '300px', height: '300px', opacity: 0.5 }}></div>
      <div className="aurora-orb accent" style={{ bottom: '10%', right: '10%', width: '200px', height: '200px', animationDelay: '-5s', opacity: 0.5 }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="card"
        style={{ 
          width: '100%', 
          maxWidth: '480px', 
          position: 'relative', 
          zIndex: 10, 
          padding: '3rem 2.5rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(0,98,255,0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '1rem' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Member Login</h2>
          <p style={{ color: 'var(--color-text-light)' }}>Enter any email and password to test the portal.</p>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <ValidatedInput 
            label="Email Address" 
            type="email" 
            name="email" 
            placeholder="member@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <ValidatedInput 
            label="Password" 
            type="password" 
            name="password" 
            placeholder="••••••••" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              marginTop: '1rem', 
              fontSize: '1.1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? (
              <div style={{ width: '24px', height: '24px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            Not a member yet? <a href="/membership" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Join our community</a>
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
