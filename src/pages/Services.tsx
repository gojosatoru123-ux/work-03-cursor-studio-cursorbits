import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useVelocity, useTransform, useScroll } from 'motion/react';
import { cn } from '../lib/utils';
import { Layers, Monitor, Zap, Globe, Cpu, Palette, ArrowUpRight } from 'lucide-react';
import TextReveal from '../components/ui/TextReveal';
import Tilt from '../components/ui/Tilt';
import SEO from '../components/ui/SEO';

const services = [
  {
    id: '01',
    title: 'Digital Experience',
    icon: Monitor,
    description: 'We architect immersive digital environments that transcend the screen, creating visceral connections between brand and user.',
    details: ['UI/UX Design', 'Interactive Prototypes', 'Motion Design', 'Spatial Computing'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '02',
    title: 'Brand Identity',
    icon: Palette,
    description: 'Crafting the visual soul of your brand through meticulous typography, color theory, and symbolic storytelling.',
    details: ['Visual Strategy', 'Logo Design', 'Brand Guidelines', 'Typography Design'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '03',
    title: 'Creative Technology',
    icon: Cpu,
    description: 'Pushing the boundaries of what is possible with cutting-edge tech, from WebGL to AI-driven experiences.',
    details: ['Full-Stack Development', 'WebGL & 3D', 'AI Integration', 'Performance Optimization'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '04',
    title: 'Strategic Growth',
    icon: Globe,
    description: 'Data-driven insights meet intuitive design to scale your digital presence and capture global markets.',
    details: ['Market Analysis', 'SEO Strategy', 'Content Architecture', 'Conversion Design'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
];

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(heroScroll, [0, 1], [0, -200]);
  const y2 = useTransform(heroScroll, [0, 1], [0, 200]);
  const opacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const scale = useTransform(heroScroll, [0, 0.5], [1, 0.9]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Dynamic rotation based on mouse velocity
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  const rotateX = useSpring(useTransform(velocityY, [-1000, 1000], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(velocityX, [-1000, 1000], [-20, 20]), springConfig);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative">
      <SEO 
        title="Our Services | STUDIO CURSOR"
        description="Engineering the future of experience. Explore our capabilities in digital experience, brand identity, and strategic consulting."
        url="https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/services"
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
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: -5, scale: 1.02 }}
                style={{ y: y1 }} 
                className="block cursor-default transition-all duration-500"
              >
                Our
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: 5, scale: 1.02 }}
                style={{ y: y2 }}
                className="font-serif italic font-light text-brand-accent block -mt-[2vw] cursor-default transition-all duration-500"
              >
                Capabilities.
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
              text="Engineering the Future of Experience" 
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
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 border-t border-brand-line pt-12">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, ...heavySpring }}
              className="text-brand-muted max-w-xl text-lg md:text-xl leading-relaxed"
            >
              We operate at the intersection of high-end design and advanced engineering, delivering digital artifacts that define the next generation of the web.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, ...heavySpring }}
              className="flex flex-col gap-4 text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-muted"
            >
              <span>Strategy • Design • Engineering</span>
              <span>Based in Tokyo & Berlin</span>
            </motion.div>
          </div>
        </header>

        <div className="space-y-0 border-t border-brand-line">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...heavySpring, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative border-b border-brand-line py-16 md:py-48 cursor-pointer"
            >
              <Tilt strength={5} className="w-full">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                  <div className="flex items-start gap-8 md:gap-24">
                    <span className="text-[10px] md:text-xs font-serif italic text-brand-muted mt-4">{service.id}</span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-6 group/title">
                        <motion.div
                          animate={{ 
                            rotate: hoveredId === service.id ? [0, -10, 10, 0] : 0,
                            scale: hoveredId === service.id ? 1.2 : 1,
                            color: hoveredId === service.id ? 'var(--color-brand-accent)' : 'var(--color-brand-muted)'
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <service.icon className="w-8 h-8 md:w-12 md:h-12" />
                        </motion.div>
                        <h2 className="text-4xl md:text-[10vw] font-bold tracking-tighter uppercase transition-all duration-700 group-hover:text-brand-accent md:group-hover:translate-x-8 md:group-hover:scale-105 origin-left">
                          {service.title}
                        </h2>
                      </div>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredId === service.id ? 1 : 0,
                          y: hoveredId === service.id ? 0 : 10
                        }}
                        className="text-brand-muted max-w-md mt-4 text-base md:text-lg leading-relaxed hidden md:block"
                      >
                        {service.description}
                      </motion.p>
                      {/* Mobile description always visible or slightly faded */}
                      <p className="text-brand-muted max-w-md mt-4 text-sm leading-relaxed block md:hidden opacity-60">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-8 opacity-40 md:opacity-20 group-hover:opacity-100 transition-all duration-700 md:max-w-xs justify-start md:justify-end">
                    {service.details.map((detail) => (
                      <span key={detail} className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold border border-brand-line px-4 md:px-6 py-2 md:py-3 rounded-full whitespace-nowrap group-hover:border-brand-accent group-hover:text-brand-accent transition-colors">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Image Preview - Cursor Following (Root Level) */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            key="floating-preview"
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: -5
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: -15 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 pointer-events-none z-[10001] w-[24rem] h-[32rem] overflow-hidden shadow-2xl border border-brand-accent/30 hidden md:block"
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
              translateX: '20%', // Offset to the right of the cursor
              translateY: '-60%', // Offset slightly above the cursor
            }}
          >
              {(() => {
                const service = services.find(s => s.id === hoveredId);
                if (!service) return null;
                return (
                    <motion.div 
                      key={service.id}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      className="w-full h-full relative bg-brand-bg shadow-[0_80px_160px_-30px_rgba(0,0,0,0.7)]"
                    >
                      <img
                        src={service.image}
                        alt=""
                        className="w-full h-full object-cover saturate-[1.2] brightness-90 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Viewfinder Brackets */}
                      <div className="absolute inset-8 pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-accent/60" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-accent/60" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-accent/60" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-accent/60" />
                      </div>

                      {/* Central Focus Point */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-4 h-4 border border-brand-accent/40 rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-brand-accent rounded-full" />
                        </div>
                      </div>

                      {/* Subtle Grain/Texture Overlay */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                      
                      {/* Decorative Edge Glow */}
                      <div className="absolute inset-0 border-[12px] border-brand-ink/20 pointer-events-none" />
                      <div className="absolute inset-0 border border-brand-accent/10 pointer-events-none" />
                    </motion.div>
                );
              })()}
              
              {/* Border Glow */}
              <div className="absolute inset-0 border-2 border-brand-accent/40 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
