import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, BookOpen, Users, AlertCircle, CreditCard, ChevronDown, Quote } from 'lucide-react';
import SEO from '../components/SEO';

const teachers = [
  { name: "Tenzin Wangyal", role: "Head Tibetan Teacher", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { name: "Pema Dolma", role: "Performing Arts Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { name: "Lobsang Nyandak", role: "Buddhist Philosophy", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { name: "Dechen Choezom", role: "Early Childhood Edu.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
];

const faqs = [
  { q: "What if my child doesn't speak any Tibetan at home?", a: "That's completely fine! We have beginner classes designed specifically for children who are just starting out. We focus on creating a supportive environment." },
  { q: "Do we need to buy textbooks?", a: "No, all educational materials and worksheets are covered by the tuition fee." },
  { q: "Is lunch provided?", a: "Yes, a healthy lunch and snacks are provided during the break, often including traditional Tibetan food." },
  { q: "What is the age requirement?", a: "We accept children starting from age 5 up to high school seniors." }
];

const testimonials = [
  { text: "The Sunday School has been incredible for our kids. They look forward to learning the Dramyin every week and their Tibetan reading has improved immensely!", parent: "Sonam T." },
  { text: "A wonderful community and excellent teachers. It's the best way for our children to stay connected to our rich cultural heritage.", parent: "Tsering D." }
];

const gallery = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div style={{ borderBottom: '1px solid #eaeaea', marginBottom: '1rem' }}>
      <button 
        onClick={onClick}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '1rem 0', cursor: 'pointer', textAlign: 'left', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 600 }}
      >
        {faq.q}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: '1.5rem', color: 'var(--color-text-light)', lineHeight: 1.6, margin: 0 }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SundaySchool() {
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle this to true when you are ready to launch the full page
  const SHOW_FULL_PAGE = false;

  if (!SHOW_FULL_PAGE) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <SEO title="Sunday School - Coming Soon" description="Our Sunday School program is launching soon!" />
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Sunday School</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', maxWidth: '600px' }}>Our exciting new Sunday School program is currently being finalized. Check back very soon for the curriculum and registration details!</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SEO title="Sunday School" description="CATA Sunday School offering Tibetan language, performing arts, and Buddhist philosophy." />
      
      {/* Hero Section */}
      <section className="section bg-sunday-school" style={{ paddingBottom: '8rem', paddingTop: '10rem', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)', fontWeight: 800 }}>
            Sunday School
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto', textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.6 }}>
            Preserving our heritage and nurturing the next generation through comprehensive education in Tibetan language, performing arts, and Buddhist philosophy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-light" style={{ position: 'relative' }}>
        <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
          
          {/* Announcements */}
          <div style={{ background: '#fff', borderLeft: '6px solid var(--color-primary)', padding: '2rem', borderRadius: '12px', marginBottom: '4rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <AlertCircle size={32} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>Fall Semester Registration is Open!</h3>
              <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.6 }}>Classes will commence the first Sunday of September. Please ensure your children are registered early as spaces are limited. All forms and fees can be submitted online below.</p>
            </div>
          </div>

          {/* Grid for Schedule and Registration */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
            
            {/* Schedule Card */}
            <div className="card" style={{ padding: '2.5rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Calendar size={32} color="var(--color-primary)" />
                <h2 style={{ margin: 0, fontSize: '1.75rem' }}>Class Schedule</h2>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Tibetan Language</strong> <span style={{ color: 'var(--color-text-light)' }}>10:00 AM - 12:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Lunch Break</strong> <span style={{ color: 'var(--color-text-light)' }}>12:00 PM - 1:00 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Performing Arts</strong> <span style={{ color: 'var(--color-text-light)' }}>1:00 PM - 2:30 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '1.1rem' }}>Buddhist Philosophy</strong> <span style={{ color: 'var(--color-text-light)' }}>2:30 PM - 3:30 PM</span>
                </li>
              </ul>
              <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'var(--color-background)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text)' }}>
                <MapPin size={24} color="var(--color-secondary)" />
                <span style={{ fontWeight: 500, fontSize: '1.05rem' }}>Local Community Center, Fairfax, VA</span>
              </div>
            </div>

            {/* Registration Card */}
            <div className="card" style={{ padding: '2.5rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <CreditCard size={32} color="var(--color-secondary)" />
                <h2 style={{ margin: 0, fontSize: '1.75rem' }}>Registration</h2>
              </div>
              <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>
                Enroll your child for the upcoming semester. Tuition covers educational materials, lunch, snacks, and facility costs.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>✓</span> <strong>1 Child:</strong> $150 / semester
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>✓</span> <strong>2 Children:</strong> $250 / semester
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>✓</span> <strong>3+ Children:</strong> $300 / semester
                </li>
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>Register & Pay Online</motion.button>
                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '1rem' }}>*Payments are processed securely via Stripe</p>
              </div>
            </div>
          </div>

          {/* Curriculum Section */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>A Deep Curriculum</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)' }}>Our curriculum is thoughtfully designed to provide a holistic cultural education, ensuring our youth grow up with a strong foundation in their Tibetan identity.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '2.5rem', background: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <BookOpen size={48} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tibetan Language</h3>
                <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  From foundational alphabets to advanced conversational skills. We emphasize reading, writing, and speaking, tailored to the proficiency level of each student.
                </p>
              </div>
              <div style={{ padding: '2.5rem', background: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <Users size={48} color="var(--color-secondary)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Performing Arts</h3>
                <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  Immersive lessons in traditional Tibetan songs, vibrant regional dances, and learning to play traditional instruments like the Dramyin and flute.
                </p>
              </div>
              <div style={{ padding: '2.5rem', background: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <BookOpen size={48} color="var(--color-accent)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Buddhist Philosophy</h3>
                <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  An engaging introduction to core Buddhist concepts including mindfulness, compassion, loving-kindness, and foundational philosophical teachings tailored for youth.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Parent Testimonials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {testimonials.map((test, i) => (
                <div key={i} style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(0,98,255,0.05) 0%, rgba(0,98,255,0.02) 100%)', borderRadius: '20px', position: 'relative' }}>
                  <Quote size={40} color="var(--color-primary)" style={{ opacity: 0.2, position: 'absolute', top: '1.5rem', left: '1.5rem' }} />
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem', position: 'relative', zIndex: 1, marginTop: '1.5rem' }}>
                    "{test.text}"
                  </p>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>- {test.parent}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Profiles */}
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Dedicated Faculty</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                Our Sunday School is made possible by these incredible volunteer teachers who generously donate their time and expertise every weekend.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {teachers.map((t, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 1.5rem', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                    <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{t.name}</h3>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 600, margin: 0 }}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery / In Action */}
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Learning In Action</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {gallery.map((img, i) => (
                <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', height: '250px' }}>
                  <img src={img} alt="Sunday School In Action" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div style={{ maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Frequently Asked Questions</h2>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              {faqs.map((faq, i) => (
                <FAQItem 
                  key={i} 
                  faq={faq} 
                  isOpen={openFaq === i} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
