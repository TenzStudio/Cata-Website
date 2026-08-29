import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { path: '/', label: 'Home', end: true },
  { path: '/events', label: 'Events' },
  { path: '/programs', label: 'Programs' },
  // { path: '/rentals', label: 'Rentals' },
  { path: '/membership', label: 'Membership' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/spotlight', label: 'Spotlight' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Floating Pill Nav */}
      <nav className="desktop-only" style={{ position: 'fixed', top: '24px', left: '0', right: '0', zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div className="nav-floating-pill" style={{ pointerEvents: 'auto' }}>
          <Link to="/" style={{ color: 'var(--color-secondary)', fontWeight: 800, paddingRight: '1rem', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
            CATA
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => isActive ? "pill-link active" : "pill-link"} 
                end={link.end}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill" 
                        className="nav-pill-bg" 
                        transition={{ type: "spring", stiffness: 500, damping: 30 }} 
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 2 }}>{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          
          {user ? (
            <Link to="/portal" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem', marginLeft: '1rem', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}>Portal</Link>
          ) : (
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem', marginLeft: '1rem', border: '1px solid var(--color-text-light)', color: 'var(--color-text)' }}>Login</Link>
          )}
          
          <Link to="/donate" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem', marginLeft: '0.5rem' }}>Donate</Link>
        </div>
      </nav>

      {/* Mobile Floating Glassy Nav */}
      <nav className="mobile-only mobile-nav-container">
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(16px)', 
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.5)', 
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
          borderRadius: isOpen ? '24px' : '100px',
          overflow: 'hidden',
          transition: 'border-radius 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.5rem' }}>
            <Link to="/" style={{ color: 'var(--color-secondary)', fontWeight: 800, fontSize: '1.25rem' }}>
              CATA
            </Link>
            <button aria-label="Toggle mobile menu" onClick={toggleMenu} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center' }}>
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem' }}>
                  <NavLink to="/" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Home</NavLink>
                  <NavLink to="/events" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Events</NavLink>
                  <NavLink to="/programs" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Programs</NavLink>
                  {/* <NavLink to="/rentals" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Rentals</NavLink> */}
                  <NavLink to="/membership" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Membership</NavLink>
                  <NavLink to="/gallery" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Gallery</NavLink>
                  <NavLink to="/spotlight" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Spotlight</NavLink>
                  <NavLink to="/about" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>About</NavLink>
                  
                  {user ? (
                    <NavLink to="/portal" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block', color: 'var(--color-primary)' }}>Member Portal</NavLink>
                  ) : (
                    <NavLink to="/login" onClick={toggleMenu} className="pill-link" style={{ textAlign: 'center', display: 'block' }}>Login</NavLink>
                  )}
                  
                  <Link to="/donate" onClick={toggleMenu} className="btn btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}>Donate</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      
      <style>{`
        @media (min-width: 901px) { .mobile-only { display: none !important; } }
        @media (max-width: 900px) { .desktop-only { display: none !important; } }
      `}</style>
    </>
  );
}
