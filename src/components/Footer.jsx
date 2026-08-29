import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-white)', padding: 'var(--spacing-lg) 0 var(--spacing-sm) 0', marginTop: 'auto' }}>
      <div className="container grid grid-cols-3" style={{ marginBottom: 'var(--spacing-md)' }}>
        <div>
          <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Tibetan Association</h3>
          <p style={{ color: 'var(--color-white)', opacity: 0.8, marginBottom: '1rem', maxWidth: '300px' }}>
            Connecting our community through culture, service, and unity for generations to come.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--color-white)', marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/about" style={{ color: 'var(--color-white)', opacity: 0.8 }}>About Us</Link></li>
            <li><Link to="/events" style={{ color: 'var(--color-white)', opacity: 0.8 }}>Events Calendar</Link></li>
            {/* <li><Link to="/rentals" style={{ color: 'var(--color-white)', opacity: 0.8 }}>Rent Hall</Link></li> */}
            <li><Link to="/membership" style={{ color: 'var(--color-white)', opacity: 0.8 }}>Membership</Link></li>
            <li><Link to="/donate" style={{ color: 'var(--color-white)', opacity: 0.8 }}>Make a Donation</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: 'var(--color-white)', marginBottom: '1rem' }}>Contact Us</h4>
          <p style={{ color: 'var(--color-white)', opacity: 0.8, marginBottom: '0.5rem' }}>Email: secretary@dctibetan.org</p>
          <p style={{ color: 'var(--color-white)', opacity: 0.8 }}>3101 Chichester Ln<br/>Fairfax, VA 22031</p>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--spacing-sm)', textAlign: 'center', color: 'var(--color-white)', opacity: 0.6, fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} Tibetan Association. All rights reserved.</p>
      </div>
    </footer>
  );
}
