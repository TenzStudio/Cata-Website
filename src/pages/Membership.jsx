import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, CreditCard, ShieldCheck, ChevronRight, CheckCircle2, Ticket, Users, Home, Gift, Briefcase } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import GlassModal from '../components/GlassModal';
import ValidatedInput from '../components/ValidatedInput';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';
import SEO from '../components/SEO';

// Initialize Stripe outside component render to avoid recreating it

export default function Membership() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Annual Membership');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const benefits = [
    { icon: Ticket, title: 'Event Discounts', desc: '$5 off entry fees for all major cultural events and celebrations.' },
    { icon: Home, title: 'Hall Rental Discounts', desc: 'Get 10% off when you book the Community Hall for private events.' },
    { icon: Gift, title: 'Annual Member Gift', desc: 'Receive an exclusive Association gift (like a lunar calendar) every year upon renewal.' },
    { icon: Briefcase, title: 'Business Spotlight', desc: 'Free spotlight listing in our upcoming online Community Business Directory.' },
    { icon: Users, title: 'Community Support Services', desc: 'Gain access to members-only assistance programs and community support networks.' }
  ];

  const plans = [
    { 
      title: 'Annual Membership', price: '$12', period: '/ year', popular: true,
      features: [
        '$5 off event entry fees',
        '10% off hall rentals',
        'Free annual member gift',
        'Business directory spotlight',
        'Community support services'
      ]
    }
  ];

  const handlePlanSelect = (planTitle) => {
    setSelectedPlan(planTitle);
    setStep(1); // Reset to first step
    setIsModalOpen(true);
  };

  return (
    <div>
      <SEO title="Membership" description="Become a member of the Capital Area Tibetan Association. Pay dues securely online." />
      {/* Hero Section */}
      <section 
        className="section" 
        style={{ 
          paddingBottom: '8rem', paddingTop: '8rem', textAlign: 'center',
          background: 'linear-gradient(rgba(0,10,30,0.6), rgba(0,10,30,0.8)), url(https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat',
          color: 'white'
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.5rem', borderRadius: '9999px', marginBottom: '1.5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '1px' }}>BECOME A MEMBER</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'white', marginBottom: '1rem', fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
          >
            Join Our Community
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9, color: 'rgba(255,255,255,0.9)' }}
          >
            Support our mission, preserve our culture, and enjoy exclusive benefits year-round.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem' }}>
        <div className="aurora-orb primary" style={{ top: '5%', left: '-10%', width: '600px', height: '600px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '20%', right: '-10%', width: '500px', height: '500px', animationDelay: '-3s' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '-4rem' }}>
          
          {/* Benefits Grid */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>Membership Benefits</h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Why you should become an official member today.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {benefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="card"
                    style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                  >
                    <div style={{ background: 'rgba(0,98,255,0.1)', padding: '1rem', borderRadius: '16px', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                      <Icon size={28} strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Pricing Packages */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>Membership Details</h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Everything you need, wrapped into one simple annual membership.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '500px', margin: '0 auto', gap: '2rem', alignItems: 'stretch' }}>
              {plans.map((plan, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="card"
                  style={{ 
                    padding: '2.5rem 2rem', 
                    background: plan.popular ? 'linear-gradient(135deg, var(--color-background) 0%, rgba(0, 98, 255, 0.05) 100%)' : 'var(--color-background)',
                    border: plan.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    boxShadow: plan.popular ? '0 20px 40px rgba(0, 98, 255, 0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--color-primary)', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '0.5rem 1.5rem', borderBottomLeftRadius: '24px', letterSpacing: '1px' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0', color: plan.popular ? 'var(--color-primary)' : 'var(--color-heading)' }}>{plan.title}</h3>
                  </div>
                  <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800, color: 'var(--color-heading)', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ color: 'var(--color-text-light)', fontWeight: 600 }}>{plan.period}</span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                        <div style={{ background: plan.popular ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)', color: plan.popular ? 'white' : 'var(--color-text-light)', borderRadius: '50%', padding: '0.2rem', display: 'flex' }}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handlePlanSelect(plan.title)}
                    className={plan.popular ? "btn btn-primary" : "btn btn-outline"} 
                    style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
                  >
                    Join Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Checkout Modal */}
      <GlassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', background: 'rgba(0,98,255,0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  <CreditCard size={28} />
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Complete Your Membership</h3>
                <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                  You are subscribing to the <strong style={{ color: 'var(--color-primary)' }}>{selectedPlan}</strong> plan.
                </p>
              </div>

              {step < 3 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[1, 2].map((i, index) => (
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
                      {index < 1 && (
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
                      <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <ValidatedInput 
                            label="First Name" 
                            name="firstName" 
                            placeholder="Tenzin" 
                            required 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <ValidatedInput 
                            label="Last Name" 
                            name="lastName" 
                            placeholder="Choedon" 
                            required 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
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
                      <button type="button" onClick={nextStep} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '12px', fontSize: '1.1rem' }}>
                        Continue to Payment <ChevronRight size={20} />
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
                      <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,98,255,0.05)', borderRadius: '16px', border: '1px solid rgba(0,98,255,0.1)', marginBottom: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Complete your Membership</h3>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>You will be redirected to our secure Stripe checkout page.</p>
                        <a 
                          href="https://buy.stripe.com/test_3cI6oH1gD0sg5bB2vHfAc00" 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn btn-primary"
                          style={{ display: 'block', width: '100%', padding: '1rem', textDecoration: 'none' }}
                        >
                          Pay {plans.find(p => p.title === selectedPlan)?.price} via Stripe
                        </a>
                      </div>
                      
                      <div style={{ marginTop: '1rem' }}>
                        <button type="button" onClick={prevStep} className="btn btn-outline" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1.1rem' }}>
                          Back to Details
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center', padding: '2rem 0' }}
                    >
                      <div style={{ display: 'inline-flex', background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', color: '#10B981', marginBottom: '1.5rem' }}>
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to the Community!</h3>
                      <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Thank you, <strong style={{ color: 'var(--color-heading)' }}>{formData.firstName || 'Member'}</strong>! Your <strong style={{ color: 'var(--color-heading)' }}>{selectedPlan}</strong> membership is now active. We've sent a receipt and your digital membership card to your email.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
        </GlassModal>
    </div>
  );
}
