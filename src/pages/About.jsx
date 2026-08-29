import { board } from '../data/board';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import useIsMobile from '../hooks/useIsMobile';
import { Target, BookOpen, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  const isMobile = useIsMobile();
  return (
    <div>
      <SEO title="About Us" description="Learn about the history, mission, and leadership of the Capital Area Tibetan Association." />
      <section className="section bg-about" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '1rem' }}
          >
            About Our Association
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}
          >
            Preserving Tibetan culture, supporting our community, and building a stronger future together.
          </motion.p>
        </div>
      </section>

      <section className="section aurora-container" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="aurora-orb primary" style={{ top: '10%', left: '-15%', width: '800px', height: '800px' }}></div>
        <div className="aurora-orb accent" style={{ bottom: '10%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s' }}></div>
        <div className="container" style={{ paddingTop: '2rem' }}>
          <div className="grid grid-cols-2" style={{ marginBottom: '5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', height: '100%' }}
            >
              <Tilt
                className="card"
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="24px"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2500}
                style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
              >
                <div style={{ 
                  backgroundColor: 'rgba(0, 98, 255, 0.1)', 
                  width: '64px', height: '64px',
                  minWidth: '64px', minHeight: '64px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(0, 98, 255, 0.2)',
                  border: '1px solid rgba(0, 98, 255, 0.2)',
                  color: 'var(--color-primary)',
                  marginBottom: '1.5rem'
                }}>
                  <Target size={32} strokeWidth={1.5} />
                </div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontSize: '1.75rem' }}>Our Mission</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', lineHeight: '1.7', flex: 1, margin: 0 }}>
                  The Tibetan Association is dedicated to preserving the rich cultural heritage, language, and spiritual traditions of Tibet. We strive to foster a sense of unity, provide support for our community members, and empower the next generation of Tibetan youth through education and cultural immersion.
                </p>
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', height: '100%' }}
            >
              <Tilt
                className="card"
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="24px"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2500}
                style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
              >
                <div style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  width: '64px', height: '64px',
                  minWidth: '64px', minHeight: '64px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#EF4444',
                  marginBottom: '1.5rem'
                }}>
                  <BookOpen size={32} strokeWidth={1.5} />
                </div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontSize: '1.75rem' }}>Our History</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', lineHeight: '1.7', flex: 1, margin: 0 }}>
                  Founded to support the growing local Tibetan community, our association has served as a central hub for cultural preservation and social support. Over the years, we have organized countless Losar celebrations, His Holiness the Dalai Lama's birthday events, weekend language schools, and youth leadership workshops.
                </p>
              </Tilt>
            </motion.div>
          </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center" style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Board of Directors</h2>
          <p className="text-center" style={{ marginBottom: '3rem', color: 'var(--color-text-light)' }}>
            Elected volunteers serving the community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-3">
          {board.map((member, index) => {
            const isExecutive = member.role.includes('President') || member.role.includes('Secretary') || member.role.includes('Treasurer');
            const borderColor = isExecutive ? '#FDF06A' : 'var(--color-primary)';
            const shadowColor = isExecutive ? 'rgba(253, 240, 106, 0.4)' : 'rgba(0, 98, 255, 0.3)';

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover="hover"
                style={{ display: 'flex' }}
              >
                <Tilt
                  className="card"
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="24px"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  scale={1.05}
                  transitionSpeed={2500}
                  style={{ padding: '2rem', textAlign: 'center', width: '100%', borderTop: `4px solid ${borderColor}` }}
                >
                  <motion.div 
                    variants={{ hover: { scale: 1.05, boxShadow: `0 0 25px ${shadowColor}` } }}
                    style={{ width: '100%', aspectRatio: '3/4', borderRadius: '16px', backgroundColor: 'var(--color-border)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `2px solid ${borderColor}` }}
                  >
                    {member.image ? (
                      <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                    ) : (
                      <span style={{ fontSize: '2rem' }}>👤</span>
                    )}
                  </motion.div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 500, marginBottom: '1rem' }}>{member.role}</p>
                  {member.email && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                      <Mail size={16} />
                      <a href={`mailto:${member.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{member.email}</a>
                    </div>
                  )}
                </Tilt>
              </motion.div>
            );
          })}
        </div>
        </div>
      </section>
    </div>
  );
}
