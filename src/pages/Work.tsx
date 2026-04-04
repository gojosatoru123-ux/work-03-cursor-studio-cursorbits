import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import Magnetic from '../components/ui/Magnetic';
import Tilt from '../components/ui/Tilt';
import TextReveal from '../components/ui/TextReveal';
import { artifacts } from '../constants/artifacts';
import SEO from '../components/ui/SEO';

const categories = ['All', 'Digital Identity', 'Experience Design', 'Brand Strategy', 'E-commerce'];

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function Work() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  // Dynamic rotation based on mouse position relative to viewport center
  const rotateX = useSpring(useTransform(mouseY, [0, 1000], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1000], [-15, 15]), springConfig);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  const filteredArtifacts = artifacts.filter(
    (a) => filter === 'All' || a.category === filter
  );

  return (
    <div className="relative">
      <SEO 
        title="Our Work | STUDIO CURSOR"
        description="Explore the archive of digital excellence. A collection of premium digital identities, experience designs, and brand strategies."
        url="https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/work"
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
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: -5, scale: 1.02 }}
                style={{ y: y1 }} 
                className="block cursor-default transition-all duration-500"
              >
                Selected
              </motion.span>
              <motion.span
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: 5, scale: 1.02 }}
                style={{ y: y2 }}
                className="font-serif italic font-light text-brand-accent block -mt-[2vw] cursor-default transition-all duration-500"
              >
                Artifacts.
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
              text="The Archive of Digital Excellence" 
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
          className="absolute top-[20%] right-[10%] w-32 h-48 bg-brand-line opacity-20 rounded-sm hidden lg:block"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[20%] left-[10%] w-48 h-64 bg-brand-line opacity-20 rounded-sm hidden lg:block"
        />
      </section>

      <div className="pb-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 md:mb-48">
            <div className="flex flex-wrap gap-6 md:gap-12 items-center border-t border-brand-line pt-12">
            {categories.map((cat, i) => (
              <Magnetic key={cat} strength={0.1}>
                <button
                  onClick={() => setFilter(cat)}
                  className={cn(
                    'relative text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 group py-2',
                    filter === cat ? 'text-brand-ink' : 'text-brand-muted hover:text-brand-accent'
                  )}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.05, ...heavySpring }}
                  >
                    {cat}
                  </motion.span>
                  {filter === cat && (
                    <motion.div
                      layoutId="filter-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-ink"
                      transition={heavySpring}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500 ease-out" />
                </button>
              </Magnetic>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-48">
          <AnimatePresence mode="popLayout">
            {filteredArtifacts.map((artifact, i) => (
              <Magnetic key={artifact.id} strength={0.05}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={heavySpring}
                  onMouseEnter={() => setHoveredId(artifact.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/work/${artifact.id}`)}
                  className={cn(
                    'group relative cursor-pointer',
                    i % 2 !== 0 ? 'md:mt-32' : ''
                  )}
                >
                  <Tilt strength={10}>
                    <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-brand-line">
                      <motion.img
                        src={artifact.image}
                        alt={artifact.title}
                        className={cn(
                          'w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110',
                          hoveredId === artifact.id ? 'blur-0' : 'blur-[1px]'
                        )}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Floating Info on Hover (Bottom) */}
                      <AnimatePresence>
                        {hoveredId === artifact.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10"
                          >
                            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-ink bg-brand-bg/80 backdrop-blur-md px-4 py-2">
                              Explore
                            </span>
                            <span className="text-3xl md:text-4xl font-serif italic text-brand-ink">
                              {artifact.year}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Tilt>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase group-hover:text-brand-accent transition-colors duration-500">
                      {artifact.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-brand-muted text-[10px] uppercase tracking-[0.4em]">{artifact.category}</p>
                      <div className="w-12 h-px bg-brand-line group-hover:w-24 transition-all duration-700" />
                    </div>
                  </div>
                </motion.div>
              </Magnetic>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Image Preview (Pop-up that follows mouse) - Root Level */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0.8, opacity: 0, rotateZ: -5 }}
            animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateZ: 5 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 pointer-events-none z-[10001] w-[22rem] h-[30rem] overflow-hidden shadow-2xl border border-brand-accent/20 hidden md:block"
          >
              <motion.div 
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full relative bg-brand-bg"
              >
                <img 
                  src={artifacts.find(a => a.id === hoveredId)?.image} 
                  alt=""
                  className="w-full h-full object-cover saturate-[1.2] brightness-90"
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

                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                
                {/* Decorative Edge Glow */}
                <div className="absolute inset-0 border-[12px] border-brand-ink/20 pointer-events-none" />
                <div className="absolute inset-0 border border-brand-accent/10 pointer-events-none" />
              </motion.div>
              
              {/* Subtle Border Glow */}
              <div className="absolute inset-0 border-2 border-brand-accent/30 mix-blend-overlay pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
