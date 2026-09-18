import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      alert(`Subscribed ${email} to the newsletter!`);
      setEmail('');
    }
  };

  return (
    <footer style={{ 
      backgroundColor: '#0f172a', 
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('/footer-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom center',
      backgroundBlendMode: 'screen', // This ensures the black background of the image disappears and only the white mountains show faintly
      color: 'white', 
      paddingTop: '5rem', 
      paddingBottom: '2rem', 
      marginTop: 'auto', 
      borderTop: '4px solid var(--color-primary)',
      position: 'relative'
    }}>
      <div className="container grid grid-cols-4" style={{ gap: '3rem', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
        
        {/* Column 1: Brand & Mission */}
        <div>
          <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="CATA Logo" style={{ height: '32px', width: '32px', objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} />
            CATA
          </h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
            Preserving our rich Tibetan heritage and nurturing the next generation through community, culture, and service.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#facc15', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 'bold' }}>
              FB
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#facc15', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 'bold' }}>
              IG
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#facc15', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 'bold' }}>
              YT
            </a>
          </div>
        </div>
        
        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Home</Link></li>
            <li><Link to="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">About Us</Link></li>
            <li><Link to="/spotlight" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Spotlight</Link></li>
            <li><Link to="/membership" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Membership</Link></li>
            <li><Link to="/donate" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Donate</Link></li>
          </ul>
        </div>

        {/* Column 3: Programs & Clubs */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Programs</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/sundayschool" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Sunday School</Link></li>
            <li><Link to="/events" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Events Calendar</Link></li>
            <li><Link to="/club" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link">Community Clubs</Link></li>
          </ul>
        </div>
        
        {/* Column 4: Stay Connected */}
        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Stay Connected</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Subscribe to our newsletter for the latest updates.</p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: 'white', fontSize: '0.9rem', outline: 'none' }}
              required
            />
            <button type="submit" style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: '#facc15', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={18} />
            </button>
          </form>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#94a3b8' }}>
              <MapPin size={20} style={{ color: '#facc15', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>3101 Chichester Ln<br/>Fairfax, VA 22031</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8' }}>
              <Mail size={20} style={{ color: '#facc15', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9rem' }}>secretary@dctibetan.org</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="container" style={{ borderTop: '1px solid #1e293b', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Capital Area Tibetan Association. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</Link>
        </div>
      </div>
      
      <style>{`
        .footer-link:hover { color: white !important; }
        .social-icon:hover { color: var(--color-primary) !important; }
      `}</style>
    </footer>
  );
}
