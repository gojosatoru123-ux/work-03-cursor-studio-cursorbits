import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Magnetic from '../components/ui/Magnetic';
import Tilt from '../components/ui/Tilt';
import TextReveal from '../components/ui/TextReveal';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import SEO from '../components/ui/SEO';

const projects = [
  {
    id: 1,
    title: 'Jungle Oasis',
    category: 'Digital Identity',
    image: 'https://images.unsplash.com/photo-1592288801240-7b18bb06e94f?q=80&w=987',
    size: 'large',
  },
  {
    id: 2,
    title: 'Sunset Pulse',
    category: 'Experience Design',
    image: 'https://images.unsplash.com/photo-1716026982497-ffabbdb8caa3?q=80&w=1064',
    size: 'small',
  },
  {
    id: 3,
    title: 'Coral Reef',
    category: 'Brand Strategy',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1200&q=80',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Flora & Fauna',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=1200&q=80',
    size: 'large',
  },
];

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="relative">
      <SEO 
        title="STUDIO CURSOR | Premium Digital Agency"
        description="A premium, immersive digital agency specializing in luxury digital experiences and modern brutalist design. Architecting Digital Paradises."
      />
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center px-6 md:px-8 overflow-hidden"
      >
        <motion.div style={{ scale, opacity }} className="text-center z-10 w-full">
          <div className="overflow-hidden mb-8">
            <h1 className="text-[14vw] md:text-[15vw] font-bold tracking-tighter leading-[0.75] uppercase flex flex-col items-center justify-center">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: -10, scale: 1.05 }}
                style={{ y: y1 }} 
                className="block cursor-default transition-all duration-500"
              >
                Tropical
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: 10, scale: 1.05 }}
                style={{ y: y2 }}
                className="font-serif italic font-light text-brand-accent block -mt-[2vw] cursor-default transition-all duration-500"
              >
                Cursor
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
              text="Architecting Digital Paradises" 
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <Magnetic>
            <button className="flex flex-col items-center gap-4 group">
              <span className="text-[10px] uppercase tracking-widest text-brand-muted group-hover:text-brand-accent transition-colors">Explore</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-brand-accent" />
            </button>
          </Magnetic>
        </motion.div>
      </section>

      {/* Philosophy Section - Asymmetrical Layout */}
      <section className="py-32 md:py-64 px-6 md:px-8 border-y border-brand-line overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-32 items-center">
          <div className="w-full lg:w-1/2 lg:pl-24">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={heavySpring}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-muted mb-8 md:mb-12 block">
                01 / The Vision
              </span>
              <h2 className="text-5xl md:text-[10vw] font-bold tracking-tighter leading-[0.8] mb-8 md:mb-16">
                BEYOND THE <br />
                <span className="font-serif italic font-light text-brand-accent">Horizon.</span>
              </h2>
              <p className="text-brand-muted text-lg md:text-xl leading-relaxed max-w-sm">
                We believe in the deliberate fusion of nature's chaos and digital precision. A sanctuary for brands that dare to be iconic.
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative lg:translate-y-32">
            <motion.div
              initial={{ opacity: 0, scale: 1.2, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=1000&q=80"
                alt="Philosophy"
                className="w-full h-full object-cover brightness-90 saturate-[0.8] hover:saturate-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay pointer-events-none" />
            </motion.div>
            <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 text-[15vw] lg:text-[12vw] font-serif italic text-brand-line pointer-events-none select-none opacity-50 lg:opacity-100">
              Cursor
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section className="relative h-[100vh] md:h-[150vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y: useTransform(useScroll({ offset: ['start end', 'end start'] }).scrollYProgress, [0, 1], [-100, 100]),
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
            alt="Parallax Background"
            className="w-full h-full object-cover brightness-[0.3] scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={heavySpring}
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-brand-accent mb-8 md:mb-12 block">
              The Cursor Manifesto
            </span>
            <h2 className="text-3xl md:text-8xl font-bold tracking-tighter leading-tight uppercase">
              "Digital is not a <span className="font-serif italic font-light">destination</span>, it is an <span className="font-serif italic font-light">ecosystem</span> that breathes with us."
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Project Grid - More Asymmetrical */}
      <section className="py-32 md:py-64 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 md:mb-48 gap-12">
            <h2 className="text-6xl md:text-[12vw] font-bold tracking-tighter uppercase leading-[0.8]">
              Selected <br />
              <span className="font-serif italic font-light text-brand-accent">Artifacts</span>
            </h2>
            <div className="lg:w-1/3">
              <p className="text-brand-muted text-sm uppercase tracking-widest leading-loose mb-8 md:mb-12">
                A curated collection of digital experiences that challenge the status quo and redefine the digital landscape.
              </p>
              <Magnetic>
                <Link to="/work">
                  <button className="px-12 py-6 border border-brand-line rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-ink hover:text-brand-bg transition-all duration-500">
                    Explore Archive
                  </button>
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 lg:gap-64">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ ...heavySpring, delay: i * 0.1 }}
                className={cn(
                  'group cursor-pointer relative',
                  i % 2 !== 0 ? 'md:mt-32 lg:mt-64' : ''
                )}
              >
                <Link to={`/work/${project.id}`}>
                  <Tilt strength={15}>
                    <div className="relative aspect-[4/5] overflow-hidden mb-8 md:mb-12 bg-brand-line">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay flex items-center justify-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 border border-brand-ink rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                          <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                      </div>
                    </div>
                  </Tilt>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase">{project.title}</h3>
                      <span className="text-xs font-serif italic text-brand-muted">0{project.id}</span>
                    </div>
                    <div className="h-px w-full bg-brand-line origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    <p className="text-brand-muted text-[10px] md:text-xs uppercase tracking-[0.3em]">{project.category}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Layered Sticky Text Section */}
      <section className="py-32 md:py-64 px-6 md:px-8 border-t border-brand-line">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
            <div className="lg:sticky lg:top-64 h-fit">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-muted mb-6 md:mb-8 block">02 / The Method</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.8] uppercase">
                How we <br />
                <span className="font-serif italic font-light text-brand-accent">Manifest.</span>
              </h2>
            </div>
            
            <div className="space-y-32 md:space-y-64">
              {[
                {
                  title: 'Exploration',
                  desc: 'We dive deep into the wilderness of your brand, uncovering the raw elements that make it unique.',
                  img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Synthesis',
                  desc: 'We refine the chaos into a structured digital architecture, balancing beauty and performance.',
                  img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80'
                },
                {
                  title: 'Evolution',
                  desc: 'We launch and iterate, ensuring your digital presence grows and adapts to the ever-changing landscape.',
                  img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80'
                }
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={heavySpring}
                  className="group"
                >
                  <div className="relative aspect-video overflow-hidden rounded-sm mb-8 md:mb-12 grayscale group-hover:grayscale-0 transition-all duration-1000">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4 md:mb-6 flex items-baseline gap-4">
                    <span className="text-xs font-serif italic text-brand-muted">0{i + 1}</span>
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-base md:text-lg leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
