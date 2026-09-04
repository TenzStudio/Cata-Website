import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, MapPin, Store } from 'lucide-react';
import SEO from '../components/SEO';
import Tilt from 'react-parallax-tilt';

const businesses = [
  {
    id: 1,
    name: "Puroclean of Alexandria",
    owner: "Phuntsok Dhargyal",
    category: "Restoration Company",
    description: "Professional water damage, fire damage, and mold removal services for the local community.",
    location: "Alexandria, VA",
    email: "pdhargyal@puroclean.com",
    website: "https://www.puroclean.com/alexandria-va-puroclean-alexandria/",
    image: "/images/spotlight/puroclean.jpg",
  },
  {
    id: 2,
    name: "TenzStudio",
    owner: "Tenzin Tsering",
    category: "Clothing Brand",
    description: "A local clothing brand bringing unique styles and fresh designs to the community.",
    location: "Fairfax, VA",
    email: "tentsering4868@gmail.com",
    website: "https://www.tenzstudio.store",
    image: "/images/spotlight/tenzstudio.png",
  },
  {
    id: 3,
    name: "Dominion Hills Dentistry",
    owner: "Karma Wangchuk",
    category: "Healthcare",
    description: "Comprehensive family and cosmetic dentistry providing top-tier care for a healthy, beautiful smile.",
    location: "Dominion Hills, VA",
    email: "contact@dominionhillsdentistry.com",
    website: "#",
    image: "https://images.unsplash.com/photo-1503328427499-d92d1fa3af8a?auto=format&fit=crop&q=80&w=800",
  }
];

export default function Spotlight() {
  return (
    <div>
      <SEO title="Community Spotlight" description="Highlighting the achievements and contributions of our community members." />
      {/* Hero Section */}
      <section className="section bg-spotlight" style={{ paddingBottom: '6rem', textAlign: 'center', color: 'white' }}>
        <div className="container hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '1rem', color: 'white', fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
          >
            Small Business Spotlight
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9, color: 'rgba(255, 255, 255, 0.9)' }}
          >
            Supporting our community by highlighting local Tibetan-owned businesses and entrepreneurs.
          </motion.p>
        </div>
      </section>

      {/* Business Grid */}
      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="aurora-orb primary" style={{ top: '10%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {businesses.map((biz, index) => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ display: 'flex' }}
              >
                <Tilt
                  className="card"
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="24px"
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  scale={1.01}
                  transitionSpeed={2500}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: '100%', 
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                    <img src={biz.image} alt={biz.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {biz.category}
                    </div>
                  </div>
                  
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--color-heading)' }}>{biz.name}</h3>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', fontWeight: 500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Store size={16} /> Owned by {biz.owner}
                    </p>
                    
                    <p style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                      {biz.description}
                    </p>
                    
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                        <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
                        {biz.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                        <Mail size={16} style={{ color: 'var(--color-primary)' }} />
                        <a href={`mailto:${biz.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{biz.email}</a>
                      </div>
                      <a href={biz.website} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', padding: '0.75rem' }}>
                        Visit Website <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', background: 'rgba(0, 98, 255, 0.05)', borderRadius: '24px', border: '1px dashed var(--color-primary)' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Support Local Businesses</h3>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              When you support these Tibetan-owned businesses, you contribute directly to the strength and vibrancy of our community. Thank you for shopping local!
            </p>
            <a href="/membership" className="btn btn-primary">Join Our Association</a>
          </motion.div>
          
        </div>
      </section>
    </div>
  );
}
