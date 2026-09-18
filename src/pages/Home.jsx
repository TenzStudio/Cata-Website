import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import useIsMobile from '../hooks/useIsMobile';
import { events } from '../data/events';
import { clubs } from '../data/club';
import SEO from '../components/SEO';
import { BookOpen, Music, Users, Heart } from 'lucide-react';

const IconMap = {
  BookOpen,
  Music,
  Users,
  Heart
};

function AnimatedCounter({ from = 0, to, duration = 2.5, suffix = "" }) {
  const nodeRef = useRef();
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView, suffix]);

  return <span ref={nodeRef} style={{ display: 'inline-block' }}>{from}{suffix}</span>;
}

export default function Home() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const isMobile = useIsMobile();
  
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const processedEvents = events.map(e => {
    const eventDate = new Date(e.date + 'T00:00:00');
    return { ...e, status: eventDate < now ? 'Completed' : 'Upcoming' };
  });

  const sortedEvents = processedEvents
    .filter(e => e.status === 'Upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcomingEvents = sortedEvents.slice(0, 2);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      alert("Thanks for subscribing!");
    }, 1500);
  };

  return (
    <div>
      <SEO 
        title="Home" 
        description="Welcome to the Capital Area Tibetan Association. We are dedicated to preserving Tibetan heritage and connecting our community."
      />
      {/* Hero Section */}
      <section className="bg-mountain" style={{ textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6))', zIndex: 1 }}></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            poster="/events_hero.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            {/* Local Hero Video */}
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="container hero-content" style={{ position: 'relative', zIndex: 2, paddingBottom: '10rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            <span className="tibetan-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-accent)' }}>བཀྲ་ཤིས་བདེ་ལེགས</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            Connecting Our Tibetan Community Through Culture, Service, and Unity
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem auto' }}
          >
            Welcome to our online home. We are dedicated to preserving Tibetan heritage, supporting our elders, and empowering the next generation.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/events" className="btn btn-accent">View Upcoming Events</Link>
            <Link to="/donate" className="btn btn-white" >Support Our Mission</Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Counters */}
      <section style={{ position: 'relative', marginTop: '-80px', zIndex: 10, padding: '0 2rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.85)', 
              backdropFilter: 'blur(20px)', 
              borderRadius: '24px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              padding: '3rem 2rem',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '2rem',
              border: '1px solid rgba(255,255,255,0.5)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1 }}>
                <AnimatedCounter to={500} suffix="+" />
              </div>
              <p style={{ color: 'var(--color-text-light)', fontWeight: 600, margin: 0, fontSize: '1.1rem' }}>Community Members</p>
            </div>
            
            <div style={{ width: '1px', height: '60px', background: 'rgba(0,0,0,0.1)' }} className="desktop-only"></div>
            
            <div style={{ textAlign: 'center' }}>
              <div className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1 }}>
                <AnimatedCounter to={50} suffix="+" />
              </div>
              <p style={{ color: 'var(--color-text-light)', fontWeight: 600, margin: 0, fontSize: '1.1rem' }}>Cultural Events</p>
            </div>
            
            <div style={{ width: '1px', height: '60px', background: 'rgba(0,0,0,0.1)' }} className="desktop-only"></div>
            
            <div style={{ textAlign: 'center' }}>
              <div className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1 }}>
                <AnimatedCounter to={20} />
              </div>
              <p style={{ color: 'var(--color-text-light)', fontWeight: 600, margin: 0, fontSize: '1.1rem' }}>Years of Service</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', padding: '6rem 0' }}>
        <div className="aurora-orb primary" style={{ top: '-10%', right: '-10%', width: '700px', height: '700px' }}></div>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 style={{ margin: 0 }}>Upcoming Events</h2>
            <Link to="/events" style={{ fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              See All Events <span>&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ display: 'flex' }}
              >
                <Tilt 
                  className="card"
                  tiltMaxAngleX={isMobile ? 0 : 5} 
                  tiltMaxAngleY={isMobile ? 0 : 5} 
                  glareEnable={!isMobile} 
                  glareMaxOpacity={0.15} 
                  scale={1.02} 
                  transitionSpeed={2500}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="card-content" style={{ padding: '2.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <span className="badge badge-blue">{event.category}</span>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{event.date}</p>
                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', margin: 0, fontWeight: 500 }}>{event.time}</p>
                      </div>
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{event.title}</h3>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {event.location}
                    </p>
                    <Link to="/events" className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(0,98,255,0.2)', color: 'var(--color-primary)' }}>View Event Details</Link>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section aurora-container" style={{ backgroundColor: '#FFFFFF', padding: '6rem 0' }}>
        <div className="aurora-orb primary" style={{ top: '20%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '-10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            <h2 className="text-gradient" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>Our Clubs</h2>
            <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Discover the various ways we serve and connect our community, from cultural education to youth empowerment.</p>
          </div>
          <div className="grid grid-cols-2">
            {clubs.map((prog, index) => {
              const IconComponent = IconMap[prog.icon];
              return (
              <motion.div 
                key={prog.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ display: 'flex' }}
              >
                <Tilt
                  className="card"
                  tiltMaxAngleX={isMobile ? 0 : 5} 
                  tiltMaxAngleY={isMobile ? 0 : 5} 
                  glareEnable={!isMobile} 
                  glareMaxOpacity={0.15} 
                  scale={1.02} 
                  transitionSpeed={2500}
                  style={{ width: '100%', padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div className="animate-float" style={{ 
                    fontSize: '2.5rem', 
                    marginBottom: '1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '50%',
                    boxShadow: '0 10px 25px rgba(0,98,255,0.08)',
                    color: 'var(--color-primary)'
                  }}>
                    {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{prog.title}</h3>
                  <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem', flex: 1, lineHeight: '1.6' }}>{prog.description}</p>
                  <Link to="/club" className="btn btn-outline" style={{ borderRadius: '9999px', padding: '0.5rem 1.5rem', fontSize: '0.9rem', width: 'auto' }}>
                    View All Clubs &rarr;
                  </Link>
                </Tilt>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Hall Rental Promo */}
      {false && (
      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', padding: '6rem 0' }}>
        <div className="aurora-orb secondary" style={{ top: '-20%', left: '20%', width: '900px', height: '900px' }}></div>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="card"
            style={{ 
              display: 'flex', flexWrap: 'wrap', overflow: 'hidden', padding: 0,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ flex: '1 1 400px', background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000) center/cover no-repeat', minHeight: '300px' }}></div>
            <div style={{ flex: '1 1 400px', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>Available Now</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1rem', lineHeight: 1.2 }}>Host Your Next Event With Us</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Looking for the perfect venue? Our newly renovated community hall offers seating for up to 300 guests, a commercial kitchen, and full AV support. Perfect for weddings, corporate retreats, and community gatherings.
              </p>
              <Link to="/rentals" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                View Packages & Availability
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Newsletter / CTA */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', padding: '4rem 2rem 8rem 2rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              background: 'linear-gradient(135deg, var(--color-primary) 0%, #00d2ff 100%)', 
              borderRadius: '2rem', 
              padding: '5rem 2rem', 
              textAlign: 'center', 
              color: '#FFFFFF',
              boxShadow: '0 25px 50px rgba(0,98,255,0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Glossy Overlay for Glassmorphism Effect */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)', pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ color: '#FFFFFF', marginBottom: '1rem', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>Stay Connected</h2>
              <p style={{ marginBottom: '2.5rem', opacity: 0.95, fontSize: '1.1rem', lineHeight: '1.6' }}>
                Join our community newsletter to receive updates on cultural events, programs, and important announcements directly in your inbox.
              </p>
              
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  required 
                  className="subscribe-input"
                />
                <button 
                  type="submit" 
                  className="btn btn-accent subscribe-btn"
                >
                  {isSubscribing ? (
                    <motion.svg 
                      initial={{ x: -20, opacity: 0 }} 
                      animate={{ x: 40, opacity: 0 }} 
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </motion.svg>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
