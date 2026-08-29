import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChefHat, Speaker, Car, CalendarCheck, CheckCircle2, ChevronRight, Check, X } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import GlassModal from '../components/GlassModal';
import ValidatedInput from '../components/ValidatedInput';
export default function Rentals() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('Full-Day');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    eventType: 'Wedding',
    guests: '100',
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePackageSelect = (pkgTitle) => {
    setSelectedPackage(pkgTitle);
    setStep(1);
    setIsModalOpen(true);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const amenities = [
    { icon: Users, title: 'Capacity 300+', desc: 'Spacious seating and dance floor options.' },
    { icon: ChefHat, title: 'Commercial Kitchen', desc: 'Fully equipped for your catering team.' },
    { icon: Speaker, title: 'Premium A/V System', desc: 'Projectors, mics, and surround sound.' },
    { icon: Car, title: 'Free Parking', desc: 'On-site parking lot for all your guests.' }
  ];

  const packages = [
    { 
      title: 'Fixed Rate', hours: 'Event Duration', price: '$250', bestFor: 'All Events & Gatherings', popular: true,
      features: ['Full venue access', 'Commercial kitchen use', 'Tables & chairs included', 'Premium A/V system']
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          paddingBottom: '8rem', paddingTop: '8rem', textAlign: 'center',
          background: 'linear-gradient(rgba(0,10,30,0.6), rgba(0,10,30,0.8)), url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat',
          color: 'white'
        }}
      >
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'white', marginBottom: '1rem', fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
          >
            Rent Our Community Hall
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9, color: 'rgba(255,255,255,0.9)' }}
          >
            The perfect, newly renovated venue for weddings, corporate events, and community gatherings.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
        <div className="aurora-orb primary" style={{ top: '5%', left: '-10%', width: '600px', height: '600px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '20%', right: '-10%', width: '500px', height: '500px', animationDelay: '-3s' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '-4rem' }}>
          
          {/* Showcase Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}
          >
            <div style={{ height: '300px', borderRadius: '24px', background: 'url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800) center/cover', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}></div>
            <div style={{ height: '300px', borderRadius: '24px', background: 'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800) center/cover', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}></div>
            <div style={{ height: '300px', borderRadius: '24px', background: 'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800) center/cover', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}></div>
          </motion.div>

          {/* Amenities Grid */}
          <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '3rem', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>Premium Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {amenities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="card"
                    style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <div style={{ background: 'rgba(0,98,255,0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                      <Icon size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Pricing Packages */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>Pricing Packages</h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Choose the perfect duration for your event.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {packages.map((pkg, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="card"
                  style={{ 
                    width: '100%',
                    maxWidth: '450px',
                    padding: '2.5rem 2rem', 
                    background: pkg.popular ? 'linear-gradient(135deg, var(--color-background) 0%, rgba(0, 98, 255, 0.05) 100%)' : 'var(--color-background)',
                    border: pkg.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    boxShadow: pkg.popular ? '0 20px 40px rgba(0, 98, 255, 0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {pkg.popular && (
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--color-primary)', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '0.5rem 1.5rem', borderBottomLeftRadius: '24px', letterSpacing: '1px' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0', color: pkg.popular ? 'var(--color-primary)' : 'var(--color-heading)' }}>{pkg.title}</h3>
                    <p style={{ color: 'var(--color-text-light)', fontWeight: 600, margin: 0 }}>{pkg.hours}</p>
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 800, color: 'var(--color-heading)', lineHeight: 1 }}>{pkg.price}</span>
                  </div>
                  
                  <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', margin: 0, fontWeight: 500 }}>
                      <span style={{ color: 'var(--color-text-light)' }}>Ideal for:</span> {pkg.bestFor}
                    </p>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                        <div style={{ background: pkg.popular ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)', color: pkg.popular ? 'white' : 'var(--color-text-light)', borderRadius: '50%', padding: '0.2rem', display: 'flex' }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handlePackageSelect(pkg.title)}
                    className={pkg.popular ? "btn btn-primary" : "btn btn-outline"} 
                    style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
                  >
                    Select Package
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      <GlassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', background: 'rgba(0,98,255,0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  <CalendarCheck size={28} />
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Request a Booking</h3>
                <p style={{ color: 'var(--color-text-light)', fontSize: '1rem' }}>
                  Inquiring about the <strong style={{ color: 'var(--color-primary)' }}>{selectedPackage}</strong> package.
                </p>
              </div>

              {step < 4 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[1, 2, 3].map((i, index) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ 
                        width: '36px', height: '36px', borderRadius: '50%', 
                        background: step >= i ? 'var(--color-primary)' : '#F1F5F9', 
                        color: step >= i ? 'white' : 'var(--color-text-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '1rem',
                        transition: 'all 0.4s ease',
                        boxShadow: step === i ? '0 0 0 6px rgba(0,98,255,0.15)' : 'none'
                      }}>
                        {step > i ? <Check size={18} strokeWidth={4} /> : i}
                      </div>
                      {index < 2 && (
                        <div style={{ width: '60px', height: '3px', background: step > i ? 'var(--color-primary)' : '#F1F5F9', transition: 'background 0.4s ease', borderRadius: '10px' }}></div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ position: 'relative', minHeight: '260px' }}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ValidatedInput 
                        label="Select Date" 
                        type="date" 
                        name="date" 
                        required 
                        value={formData.date} 
                        onChange={handleInputChange} 
                      />
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label" style={{ fontWeight: 600, color: 'var(--color-heading)', marginBottom: '0.25rem' }}>Event Type</label>
                        <select name="eventType" className="form-select" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '12px', fontSize: '1rem' }} value={formData.eventType} onChange={handleInputChange}>
                          <option>Wedding Reception</option>
                          <option>Corporate Event</option>
                          <option>Birthday / Party</option>
                          <option>Community Gathering</option>
                        </select>
                      </div>
                      <button type="button" onClick={nextStep} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '12px', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Next Step <ChevronRight size={20} />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label" style={{ fontWeight: 600, color: 'var(--color-heading)', marginBottom: '0.25rem' }}>Estimated Guests</label>
                        <select name="guests" className="form-select" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '12px', fontSize: '1rem' }} value={formData.guests} onChange={handleInputChange}>
                          <option>Under 50</option>
                          <option>50 - 150</option>
                          <option>150 - 300</option>
                        </select>
                      </div>
                      <ValidatedInput 
                        label="Full Name" 
                        type="text" 
                        name="name" 
                        placeholder="Tenzin Choedon" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                      />
                      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                        <button type="button" onClick={prevStep} className="btn btn-outline" style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontSize: '1.1rem' }}>Back</button>
                        <button type="button" onClick={nextStep} className="btn btn-primary" style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                          Next Step <ChevronRight size={20} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ValidatedInput 
                        label="Email Address" 
                        type="email" 
                        name="email" 
                        placeholder="hello@example.com" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                      />
                      <ValidatedInput 
                        label="Phone Number" 
                        type="tel" 
                        name="phone" 
                        placeholder="(555) 000-0000" 
                        required 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                      />
                      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                        <button type="button" onClick={prevStep} className="btn btn-outline" style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontSize: '1.1rem' }}>Back</button>
                        <button type="button" onClick={submitForm} className="btn btn-accent" style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                          Submit Request
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center', padding: '2rem 0' }}
                    >
                      <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', color: '#10B981', marginBottom: '1.5rem' }}>
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Request Received!</h3>
                      <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Thank you, <strong style={{ color: 'var(--color-heading)' }}>{formData.name || 'there'}</strong>! We have received your inquiry for a <strong style={{ color: 'var(--color-heading)' }}>{formData.eventType}</strong> on <strong style={{ color: 'var(--color-heading)' }}>{formData.date || 'your selected date'}</strong>. Our team will get back to you within 24 hours to confirm availability and pricing.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
        </GlassModal>
    </div>
  );
}
