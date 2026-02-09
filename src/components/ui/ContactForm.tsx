import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'project',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
        setValidationError("Invalid signal format");
        return;
    }

    setValidationError(null);
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset after showing success
      setTimeout(() => setStatus('idle'), 3000);
      setFormState({ name: '', email: '', type: 'project', message: '' });
    }, 2000);
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/30 focus:outline-none focus:border-horizn-accent/50 focus:bg-white/10 transition-all duration-300";
  const labelClasses = "block text-xs font-mono text-white/60 mb-1 uppercase tracking-wider";

  return (
    <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-6">Initialize Contact</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className={labelClasses}>Identity // Name</label>
            <input 
              type="text" 
              required
              value={formState.name}
              onChange={e => setFormState({...formState, name: e.target.value})}
              placeholder="John Doe"
              className={inputClasses}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
                <label className={labelClasses}>Signal // Email</label>
                {validationError && (
                    <span className="text-[10px] text-red-400 font-mono flex items-center gap-1 mb-1 animate-pulse">
                        <AlertCircle size={10} /> {validationError}
                    </span>
                )}
            </div>
            <input 
              type="email" 
              required
              value={formState.email}
              onChange={e => {
                  setFormState({...formState, email: e.target.value});
                  if(validationError) setValidationError(null);
              }}
              placeholder="john@example.com"
              className={`${inputClasses} ${validationError ? '!border-red-500/50 !bg-red-500/10' : ''}`}
            />
          </div>
        </div>

        <div className="space-y-1">
            <label className={labelClasses}>Protocol // Inquiry Type</label>
            <div className="grid grid-cols-3 gap-3">
                {['project', 'career', 'general'].map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setFormState({...formState, type})}
                        className={`py-2 px-4 rounded-lg border text-xs uppercase font-bold tracking-wider transition-all duration-300 ${
                            formState.type === type 
                            ? 'bg-horizn-accent text-black border-horizn-accent' 
                            : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>

        <div className="space-y-1">
          <label className={labelClasses}>Payload // Message</label>
          <textarea 
            required
            rows={4}
            value={formState.message}
            onChange={e => setFormState({...formState, message: e.target.value})}
            placeholder="Tell us about your project..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'sending' || status === 'success'}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-horizn-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden relative"
        >
          <AnimatePresence mode="wait">
             {status === 'idle' && (
                 <motion.span 
                    key="idle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                 >
                    Transmit Signal <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                 </motion.span>
             )}
             {status === 'sending' && (
                 <motion.span 
                    key="sending"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                 >
                    Processing...
                 </motion.span>
             )}
             {status === 'success' && (
                 <motion.span 
                    key="success"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                 >
                    Sent Successfully <CheckCircle size={16} />
                 </motion.span>
             )}
          </AnimatePresence>
          
          {/* Progress Bar for sending state */}
          {status === 'sending' && (
             <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-horizn-accent"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
             />
          )}
        </button>
      </form>
    </div>
  );
};