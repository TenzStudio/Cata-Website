import { events } from '../data/events';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin, Clock, CalendarPlus, X, CheckCircle2 } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import useIsMobile from '../hooks/useIsMobile';
import GlassModal from '../components/GlassModal';
import ValidatedInput from '../components/ValidatedInput';
import { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} style={{ textAlign: 'center' }}>
          <div className="text-gradient" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 800, lineHeight: 1 }}>
            {value.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-light)', fontWeight: 600, marginTop: '0.25rem' }}>
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const processedEvents = events.map(e => {
    // Parse date correctly, assuming 'YYYY-MM-DD'
    const eventDate = new Date(e.date + 'T00:00:00');
    return { ...e, status: eventDate < now ? 'Completed' : 'Upcoming' };
  });

  const sortedEvents = processedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcomingList = sortedEvents.filter(e => e.status === 'Upcoming');
  
  const featuredEvent = upcomingList.length > 0 ? upcomingList[0] : sortedEvents[0];
  const upcomingEventsData = sortedEvents.filter(e => e.id !== featuredEvent?.id);
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();
  const [rsvpData, setRsvpData] = useState({ firstName: '', lastName: '', email: '', guests: 1 });

  const openRsvpModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setIsSubmitted(false);
    setRsvpData({ firstName: '', lastName: '', email: '', guests: 1 });
  };

  const closeRsvpModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const handleAddToCalendar = (event) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);
    
    const startDateStr = event.date.replace(/-/g, '').split('T')[0];
    
    const d = new Date(event.date);
    d.setDate(d.getDate() + 1);
    const endDateStr = d.toISOString().split('T')[0].replace(/-/g, '');

    const dates = `${startDateStr}/${endDateStr}`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const categories = ['All', ...new Set(upcomingEventsData.map(e => e.category))];

  const filteredEvents = activeTab === 'All' 
    ? upcomingEventsData 
    : upcomingEventsData.filter(e => e.category === activeTab);

  return (
    <div>
      <SEO title="Events" description="Browse upcoming and past events hosted by the Capital Area Tibetan Association." />
      <section className="section bg-events" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Events Calendar</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Join us for upcoming cultural celebrations, community meetings, and youth programs.
          </p>
        </div>
      </section>

      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="aurora-orb primary" style={{ top: '10%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        
        <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Featured Event Banner */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)', boxShadow: '0 0 12px var(--color-primary)' }}></span>
            Featured Event
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card" 
            style={{ overflow: 'hidden', padding: 0 }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span className="badge badge-gold">{featuredEvent.category}</span>
                  <span className="badge badge-blue">Live in...</span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1rem', lineHeight: 1.2 }}>{featuredEvent.title}</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.6 }}>{featuredEvent.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)', fontWeight: 500 }}>
                    <CalendarDays size={20} strokeWidth={1.5} color="var(--color-primary)" /> {new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)', fontWeight: 500 }}>
                    <MapPin size={20} strokeWidth={1.5} color="var(--color-primary)" /> {featuredEvent.location}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button className="btn btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1.1rem' }} onClick={() => openRsvpModal(featuredEvent)}>Get Tickets / RSVP</button>
                  <motion.button 
                    onClick={() => handleAddToCalendar(featuredEvent)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 98, 255, 0.4)", backgroundColor: "rgba(0, 98, 255, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(0, 98, 255, 0.3)', color: 'var(--color-primary)', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                    title="Add to Calendar"
                  >
                    <CalendarPlus size={22} strokeWidth={1.5} />
                  </motion.button>
                </div>
              </div>
              <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, rgba(0,98,255,0.03), rgba(0,210,255,0.05))', borderLeft: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Countdown to Event</h4>
                <CountdownTimer targetDate={featuredEvent.date} />
              </div>
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Upcoming Schedule</h2>
          
          <div style={{ 
            display: 'flex', 
            background: 'rgba(255,255,255,0.6)', 
            backdropFilter: 'blur(20px)', 
            padding: '0.5rem', 
            borderRadius: '9999px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            flexWrap: 'wrap'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                style={{
                  position: 'relative',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: activeTab === category ? 'var(--color-primary)' : 'var(--color-text-light)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 1,
                  transition: 'color 0.3s ease'
                }}
              >
                {activeTab === category && (
                  <motion.div
                    layoutId="activeEventTab"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: '#ffffff',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      zIndex: -1
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}
              >
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>No events found for this category.</p>
              </motion.div>
            ) : (
              filteredEvents.map((event) => (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: 'flex', height: '100%' }}
                >
              <Tilt
                className="card"
                glareEnable={!isMobile}
                glareMaxOpacity={0.15}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="24px"
                tiltMaxAngleX={isMobile ? 0 : 5}
                tiltMaxAngleY={isMobile ? 0 : 5}
                scale={1.02}
                transitionSpeed={2500}
                style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
              >
                <div className="card-content" style={{ flex: '1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span className="badge badge-gold">{event.category}</span>
                <span className="badge badge-blue">{event.status}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{event.title}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  <CalendarDays size={18} strokeWidth={1.5} /> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)' }}>
                  <Clock size={18} strokeWidth={1.5} /> {event.time}
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)' }}>
                  <MapPin size={18} strokeWidth={1.5} /> {event.location}
                </p>
              </div>

              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>{event.description}</p>
            </div>
            <div style={{ padding: 'var(--spacing-sm)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ flex: '1' }} onClick={() => openRsvpModal(event)}>RSVP / Register</button>
              <motion.button 
                onClick={() => handleAddToCalendar(event)}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                title="Add to Calendar"
              >
                <CalendarPlus size={18} strokeWidth={1.5} />
              </motion.button>
            </div>
              </Tilt>
            </motion.div>
            ))
          )}
          </AnimatePresence>
        </motion.div>
        </div>
      </section>

      {/* RSVP Modal */}
      <GlassModal isOpen={isModalOpen} onClose={closeRsvpModal} maxWidth="500px">
        <div style={{ position: 'relative' }}>
          {!isSubmitted ? (
                <>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>RSVP for {selectedEvent?.title}</h3>
                  <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Please fill out your details below to reserve your spot.</p>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <ValidatedInput 
                          label="First Name" 
                          required 
                          value={rsvpData.firstName} 
                          onChange={e => setRsvpData({...rsvpData, firstName: e.target.value})} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <ValidatedInput 
                          label="Last Name" 
                          required 
                          value={rsvpData.lastName} 
                          onChange={e => setRsvpData({...rsvpData, lastName: e.target.value})} 
                        />
                      </div>
                    </div>
                    
                    <ValidatedInput 
                      label="Email" 
                      type="email" 
                      required 
                      value={rsvpData.email} 
                      onChange={e => setRsvpData({...rsvpData, email: e.target.value})} 
                    />
                    
                    <ValidatedInput 
                      label="Number of Guests" 
                      type="number" 
                      min="1" 
                      max="10" 
                      required 
                      value={rsvpData.guests} 
                      onChange={e => setRsvpData({...rsvpData, guests: e.target.value})} 
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Confirm RSVP</button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: '#10B981', marginBottom: '1rem' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>You're on the list!</h3>
                  <p style={{ color: 'var(--color-text-light)' }}>Thanks for RSVPing, {rsvpData.firstName}. We'll see you there!</p>
                  <button onClick={closeRsvpModal} className="btn btn-outline" style={{ marginTop: '2rem', width: '100%' }}>Close</button>
                </div>
              )}
        </div>
      </GlassModal>
    </div>
  );
}
