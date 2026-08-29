import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export default function GlassModal({ isOpen, onClose, children, maxWidth = '800px' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
          />
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            style={{ position: 'relative', width: '100%', maxWidth: maxWidth, zIndex: 1001, maxHeight: '90vh', overflowY: 'auto', borderRadius: '32px' }}
          >
            <button aria-label="Close modal" onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', color: 'var(--color-heading)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1002 }}>
              <X size={24} />
            </button>
            <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} glareEnable={true} glareMaxOpacity={0.02} scale={1} className="card" style={{ padding: '2.5rem 2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.6)', background: 'linear-gradient(to bottom right, #ffffff, #fcfdff)' }}>
              {children}
            </Tilt>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
