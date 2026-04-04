import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Send, ArrowRight } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';
import TextReveal from '../components/ui/TextReveal';
import SEO from '../components/ui/SEO';

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(heroScroll, [0, 1], [0, -200]);
  const y2 = useTransform(heroScroll, [0, 1], [0, 200]);
  const opacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const scale = useTransform(heroScroll, [0, 0.5], [1, 0.9]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="relative">
      <SEO 
        title="Contact Us | STUDIO CURSOR"
        description="Start a conversation. Let's build something extraordinary together. Reach out to Studio Cursor for premium digital solutions."
        url="https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/contact"
      />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center px-6 md:px-8 overflow-hidden"
      >
        <motion.div style={{ scale, opacity }} className="text-center z-10 w-full">
          <div className="overflow-hidden mb-8 md:mb-12">
            <h1 className="text-[14vw] md:text-[15vw] font-bold tracking-tighter leading-[0.75] uppercase flex flex-col items-center justify-center">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: -5, scale: 1.02 }}
                style={{ y: y1 }} 
                className="block cursor-default transition-all duration-500"
              >
                Start a
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: 5, scale: 1.02 }}
                style={{ y: y2 }}
                className="font-serif italic font-light text-brand-accent block -mt-[2vw] cursor-default transition-all duration-500"
              >
                Conversation.
              </motion.span>
            </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, ...heavySpring }}
            className="flex flex-col items-center gap-6"
          >
            <TextReveal 
              text="Let's build something extraordinary together" 
              className="text-brand-muted uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-xs"
              delay={1.2}
            />
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 64 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="w-px bg-brand-line md:h-24" 
            />
          </motion.div>
        </motion.div>

        {/* Floating Artifacts in Hero */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[20%] left-[10%] w-32 h-48 bg-brand-line opacity-20 rounded-sm hidden lg:block"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[20%] right-[10%] w-48 h-64 bg-brand-line opacity-20 rounded-sm hidden lg:block"
        />
      </section>

      <div className="pb-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 md:mb-48">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 border-t border-brand-line pt-8 md:pt-12">
            <p className="text-brand-muted max-w-xl text-lg md:text-xl leading-relaxed">
              We are always looking for new challenges and partnerships. Let's build something extraordinary together in the digital jungle.
            </p>
            <div className="text-[10px] uppercase tracking-[0.4em] text-brand-muted">
              Available for Q3/Q4 2026
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-64 items-start">
          <motion.form 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={heavySpring}
            onSubmit={handleSubmit} 
            className="space-y-16 md:space-y-24"
          >
            <div className="relative group">
              <input
                type="text"
                id="name"
                required
                className="w-full bg-transparent border-b border-brand-line py-6 md:py-8 text-2xl md:text-5xl font-bold tracking-tighter uppercase focus:outline-none focus:border-brand-accent transition-colors peer"
                placeholder=" "
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-6 md:top-8 text-[10px] uppercase tracking-[0.4em] text-brand-muted pointer-events-none transition-all duration-500 peer-focus:-top-8 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-brand-accent"
              >
                Your Name
              </label>
            </div>

            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                className="w-full bg-transparent border-b border-brand-line py-6 md:py-8 text-2xl md:text-5xl font-bold tracking-tighter uppercase focus:outline-none focus:border-brand-accent transition-colors peer"
                placeholder=" "
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-6 md:top-8 text-[10px] uppercase tracking-[0.4em] text-brand-muted pointer-events-none transition-all duration-500 peer-focus:-top-8 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-brand-accent"
              >
                Email Address
              </label>
            </div>

            <div className="relative group">
              <textarea
                id="message"
                required
                rows={1}
                className="w-full bg-transparent border-b border-brand-line py-6 md:py-8 text-2xl md:text-5xl font-bold tracking-tighter uppercase focus:outline-none focus:border-brand-accent transition-colors peer resize-none"
                placeholder=" "
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-6 md:top-8 text-[10px] uppercase tracking-[0.4em] text-brand-muted pointer-events-none transition-all duration-500 peer-focus:-top-8 peer-focus:text-brand-accent peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:text-brand-accent"
              >
                The Brief
              </label>
            </div>

            <Magnetic strength={0.1}>
              <button
                type="submit"
                className="group flex items-center gap-6 md:gap-8 text-3xl md:text-7xl font-bold tracking-tighter uppercase hover:text-brand-accent transition-all duration-500"
              >
                {isSubmitted ? 'Sent.' : 'Send.'}
                <ArrowRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-4 transition-transform duration-500" />
              </button>
            </Magnetic>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={heavySpring}
            className="space-y-16 md:space-y-32"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-muted mb-4 md:mb-8 block">Contact</span>
                <p className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-2">hello@cursor.studio</p>
                <p className="text-xl md:text-2xl font-bold tracking-tighter uppercase">+1 (555) 000-1234</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-muted mb-4 md:mb-8 block">Location</span>
                <p className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-2">Tokyo, Japan</p>
                <p className="text-xl md:text-2xl font-bold tracking-tighter uppercase">Berlin, Germany</p>
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80" 
                alt="Tropical Forest"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-accent/20 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);
}
