import { programs } from '../data/programs';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import useIsMobile from '../hooks/useIsMobile';
import { BookOpen, Music, Users, Clock, Heart } from 'lucide-react';

const IconMap = {
  BookOpen,
  Music,
  Users,
  Heart
};

export default function Programs() {
  const isMobile = useIsMobile();
  return (
    <div>
      <SEO title="Programs" description="Explore the programs offered by CATA, including language classes, cultural arts, and community support." />
      <section className="section bg-programs" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Youth & Culture Programs</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Empowering the next generation through education, language, and the arts.
          </p>
        </div>
      </section>

      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="aurora-orb primary" style={{ top: '10%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        
        <div className="container" style={{ paddingTop: '2rem' }}>
          <div className="grid grid-cols-2">
          {programs.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ display: 'flex', height: '100%' }}
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
                scale={1.02}
                transitionSpeed={2500}
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
              >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ 
                  backgroundColor: 'rgba(0, 98, 255, 0.1)', 
                  width: '64px', height: '64px',
                  minWidth: '64px', minHeight: '64px',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(0, 98, 255, 0.2)',
                  border: '1px solid rgba(0, 98, 255, 0.2)',
                  color: 'var(--color-primary)'
                }}>
                    {(() => {
                      const IconComponent = IconMap[prog.icon];
                      return IconComponent ? <IconComponent size={32} strokeWidth={1.5} /> : null;
                    })()}
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  style={{ flexShrink: 0, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                >
                  {prog.ageGroup}
                </motion.div>
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', lineHeight: 1.3 }}>{prog.title}</h2>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--color-secondary)', marginBottom: '1rem' }}>
                <Clock size={18} strokeWidth={2} /> {prog.schedule}
              </p>
              <p style={{ color: 'var(--color-text-light)', lineHeight: '1.7', flex: 1 }}>
                {prog.description}
              </p>
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 98, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                >
                  Enroll Now
                </motion.button>
              </div>
            </Tilt>
            </motion.div>
          ))}



        </div>
        </div>
      </section>
    </div>
  );
}
