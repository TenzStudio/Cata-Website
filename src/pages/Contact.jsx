import { useState } from 'react';
import ValidatedInput from '../components/ValidatedInput';

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', reason: '', message: '' });
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <section className="section bg-mountain" style={{ paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Contact Us</h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            We'd love to hear from you. Reach out with any questions, suggestions, or just to say hello.
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          
          {/* Contact Info */}
          <div>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Get in Touch</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
              Have a question about an upcoming event, our language school, or volunteering? Send us a message and our board members will get back to you.
            </p>
            
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>📧</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</h3>
                <p><a href="mailto:secretary@dctibetan.org">secretary@dctibetan.org</a></p>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>📞</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.5rem' }}>📍</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Community Center</h3>
                <p style={{ color: 'var(--color-text-light)' }}>
                  3101 Chichester Ln<br />
                  Fairfax, VA 22031
                </p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>Location</h3>
              <div style={{ width: '100%', height: '250px', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-light)', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.6366479532454!2d-77.25145712396117!3d38.86249767173166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64c8d76980de9%3A0x633390cbe0a4f5db!2s3101%20Chichester%20Ln%2C%20Fairfax%2C%20VA%2022031!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '150px' }}>
                  <ValidatedInput 
                    label="First Name" 
                    name="firstName" 
                    required 
                    value={formData.firstName} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div style={{ flex: '1', minWidth: '150px' }}>
                  <ValidatedInput 
                    label="Last Name" 
                    name="lastName" 
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
                required 
                value={formData.email} 
                onChange={handleInputChange} 
              />
              
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-heading)' }}>Reason for Contact <span style={{ color: '#EF4444' }}>*</span></label>
                <select name="reason" className="form-select" required value={formData.reason} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                  <option value="">Select an option...</option>
                  <option value="events">Events & Programs</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donations</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <ValidatedInput 
                label="Message" 
                type="textarea" 
                name="message" 
                required 
                value={formData.message} 
                onChange={handleInputChange} 
              />
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
