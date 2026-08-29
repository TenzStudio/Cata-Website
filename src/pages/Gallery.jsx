import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import useIsMobile from '../hooks/useIsMobile';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Festivals', 'Youth', 'Community'];

  const albums = [
    { id: 1, title: "Losar 2026", photos: 12, category: "Festivals", image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Dalai Lama's Birthday", photos: 24, category: "Festivals", image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Summer Picnic", photos: 18, category: "Community", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Youth Camp", photos: 30, category: "Youth", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Language School Graduation", photos: 15, category: "Youth", image: "https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Community Service Day", photos: 8, category: "Community", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredAlbums = selectedCategory === 'All' ? albums : albums.filter(a => a.category === selectedCategory);

  return (
    <div>
      <SEO title="Gallery" description="View photos and videos from recent CATA events and community gatherings." />
      <section className="section bg-gallery" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '1rem' }}
          >
            Photo Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}
          >
            Memories from our recent community events and celebrations.
          </motion.p>
        </div>
      </section>

      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="aurora-orb primary" style={{ top: '10%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        <div className="container" style={{ paddingTop: '2rem' }}>
          
          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  border: cat === selectedCategory ? 'none' : '1px solid rgba(0, 98, 255, 0.2)',
                  backgroundColor: cat === selectedCategory ? 'var(--color-primary)' : 'white',
                  color: cat === selectedCategory ? 'white' : 'var(--color-primary)',
                  boxShadow: cat === selectedCategory ? '0 8px 24px rgba(0, 98, 255, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

      <motion.div layout className="grid grid-cols-3">
        <AnimatePresence>
        {filteredAlbums.map((album) => (
          <motion.div
            layout
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            whileHover="hover"
            style={{ display: 'flex' }}
          >
            <Tilt
              className="card"
              tiltMaxAngleX={isMobile ? 0 : 5}
              tiltMaxAngleY={isMobile ? 0 : 5}
              glareEnable={!isMobile}
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glarePosition="all"
              glareBorderRadius="24px"
              scale={1.03}
              transitionSpeed={2500}
              style={{ cursor: 'pointer', padding: 0, overflow: 'hidden', width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '250px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <motion.img 
                  variants={{ hover: { scale: 1.1 } }}
                  transition={{ duration: 0.4 }}
                  src={album.image} 
                  alt={album.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                {/* Glassmorphic Overlay */}
                <motion.div
                  variants={{ initial: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } }}
                  initial="initial"
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,98,255,0.4), transparent)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    height: '100%',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(12px)',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '50px',
                    color: 'white',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    View Album
                  </div>
                </motion.div>
              </div>
              <div className="card-content" style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: '#ffffff', zIndex: 10 }}>
                <h3 style={{ marginBottom: '0.25rem', fontSize: '1.25rem', color: 'var(--color-primary)' }}>{album.title}</h3>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem' }}>{album.photos} Photos</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
      </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(20px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedAlbum(null)}
          >
            <button 
              onClick={() => setSelectedAlbum(null)}
              style={{
                position: 'absolute', top: '2rem', right: '2rem',
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: 'white', padding: '1rem', borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <X size={24} strokeWidth={2} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '1200px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
                <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}><ChevronLeft size={48} /></button>
                <img 
                  src={selectedAlbum.image} 
                  alt={selectedAlbum.title} 
                  style={{ width: '100%', maxWidth: '900px', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
                />
                <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}><ChevronRight size={48} /></button>
              </div>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selectedAlbum.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>{selectedAlbum.photos} Photos</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
