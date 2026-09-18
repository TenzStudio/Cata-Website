import { clubs } from '../data/club';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

export default function Club() {
  const isMobile = useIsMobile();
  return (
    <div>
      <SEO title="Club" description="Explore the clubs offered by CATA, including sports and community activities." />
      <section className="section bg-club" style={{ paddingBottom: '6rem', paddingTop: '8rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Community Clubs</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', color: 'white', opacity: 0.9, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            Join our sports and wellness clubs to stay active and connected!
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#F8FAFC', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10vh' }}>
            {clubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
                style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row', 
                  background: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 -15px 40px rgba(0,0,0,0.15)',
                  position: 'sticky',
                  top: `calc(120px + ${index * 30}px)`,
                  minHeight: '70vh',
                  marginBottom: index === clubs.length - 1 ? '0' : '10vh'
                }}
              >
                {/* Left Side: Image */}
                <div style={{ 
                  flex: isMobile ? 'none' : '0 0 45%', 
                  height: isMobile ? '250px' : 'auto',
                  minHeight: isMobile ? 'auto' : '350px',
                  backgroundImage: `url(${club.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                
                {/* Right Side: Info & Button */}
                <div style={{ 
                  flex: '1', 
                  padding: isMobile ? '2rem' : '3rem', 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '2.25rem', margin: 0, lineHeight: 1.2 }}>{club.title}</h2>
                    <div style={{ 
                      background: 'rgba(0, 98, 255, 0.1)', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '20px', 
                      fontSize: '0.875rem', 
                      fontWeight: 600, 
                      color: 'var(--color-primary)',
                      whiteSpace: 'nowrap',
                      marginLeft: '1rem'
                    }}>
                      {club.ageGroup}
                    </div>
                  </div>
                  
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--color-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    <Clock size={20} strokeWidth={2} /> {club.schedule}
                  </p>
                  
                  <p style={{ color: 'var(--color-text-light)', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '2.5rem', flex: 1 }}>
                    {club.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <motion.a 
                      href={club.enrollLink || "#"}
                      target={club.enrollLink ? "_blank" : "_self"}
                      rel={club.enrollLink ? "noopener noreferrer" : ""}
                      whileHover={club.noEnroll ? {} : { scale: 1.02 }}
                      whileTap={club.noEnroll ? {} : { scale: 0.98 }}
                      className={`btn ${club.noEnroll ? 'btn-outline' : 'btn-primary'}`} 
                      style={{ 
                        padding: '1rem 2.5rem', 
                        fontSize: '1.1rem', 
                        width: isMobile ? '100%' : 'auto', 
                        fontWeight: 'bold', 
                        display: 'inline-block', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        cursor: club.noEnroll ? 'default' : 'pointer',
                        borderColor: club.noEnroll ? 'var(--color-border)' : '',
                        color: club.noEnroll ? 'var(--color-text-light)' : ''
                      }}
                      onClick={(e) => {
                        if (club.noEnroll) {
                          e.preventDefault();
                        } else if (!club.enrollLink) {
                          e.preventDefault();
                          alert("Enrollment opening soon!");
                        }
                      }}
                    >
                      {club.actionText || "Enroll Now"}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
