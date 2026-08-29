import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ValidatedInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required = false, 
  placeholder = '',
  pattern,
  errorMessage = 'This field is required',
  ...props 
}) {
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Validation logic
  let isValid = true;
  let currentError = '';

  if (required && !value) {
    isValid = false;
    currentError = 'This field is required';
  } else if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      currentError = 'Please enter a valid email address';
    }
  } else if (pattern && value) {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      isValid = false;
      currentError = errorMessage;
    }
  }

  const showSuccess = touched && isValid && value.toString().length > 0;
  const showError = touched && !isValid;

  const handleBlur = () => {
    setTouched(true);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-heading)' }}>
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required={required}
            placeholder={placeholder}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              paddingRight: '2.5rem',
              borderRadius: '8px', 
              border: `1px solid ${showError ? '#EF4444' : showSuccess ? '#10B981' : 'var(--color-border)'}`, 
              background: '#F8FAFC',
              minHeight: '100px',
              resize: 'vertical',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isFocused ? `0 0 0 3px ${showError ? 'rgba(239, 68, 68, 0.2)' : showSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 98, 255, 0.2)'}` : 'none'
            }}
            {...props}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required={required}
            placeholder={placeholder}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              paddingRight: '2.5rem',
              borderRadius: '8px', 
              border: `1px solid ${showError ? '#EF4444' : showSuccess ? '#10B981' : 'var(--color-border)'}`, 
              background: '#F8FAFC',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              boxShadow: isFocused ? `0 0 0 3px ${showError ? 'rgba(239, 68, 68, 0.2)' : showSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 98, 255, 0.2)'}` : 'none'
            }}
            {...props}
          />
        )}

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{ position: 'absolute', right: '0.75rem', top: type === 'textarea' ? '0.75rem' : '50%', transform: type === 'textarea' ? 'none' : 'translateY(-50%)', color: '#10B981', pointerEvents: 'none' }}
            >
              <Check size={18} strokeWidth={3} />
            </motion.div>
          )}
          {showError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{ position: 'absolute', right: '0.75rem', top: type === 'textarea' ? '0.75rem' : '50%', transform: type === 'textarea' ? 'none' : 'translateY(-50%)', color: '#EF4444', pointerEvents: 'none' }}
            >
              <AlertCircle size={18} strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            style={{ color: '#EF4444', fontSize: '0.85rem', marginTop: '0.25rem', fontWeight: 500, margin: '0.25rem 0 0 0' }}
          >
            {currentError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
