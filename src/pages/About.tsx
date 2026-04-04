import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../lib/utils';
import { ArrowUpRight, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/ui/TextReveal';
import SEO from '../components/ui/SEO';

const stats = [
  { label: 'Years of Craft', value: '06+' },
  { label: 'Digital Artifacts', value: '120+' },
  { label: 'Global Awards', value: '24' },
  { label: 'Creative Minds', value: '12' },
];

const process = [
  {
    title: 'Immersion',
    description: 'We dive deep into your brand\'s ecosystem, understanding the subtle nuances that make it unique.',
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Alchemy',
    description: 'Where strategy meets raw creativity. We distill complex ideas into visceral digital experiences.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Precision',
    description: 'Meticulous engineering ensures that every interaction is seamless, performant, and delightful.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80'
  }
];

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(heroScroll, [0, 1], [0, -200]);
  const y2 = useTransform(heroScroll, [0, 1], [0, 200]);
  const opacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const scale = useTransform(heroScroll, [0, 0.5], [1, 0.9]);

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="bg-brand-bg selection:bg-brand-accent selection:text-brand-bg">
      <SEO 
        title="About Us | STUDIO CURSOR"
        description="The studio behind the cursor. We are a premium, immersive digital agency specializing in luxury digital experiences."
        url="https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/about"
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
                Digital
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ skewX: 5, scale: 1.02 }}
                style={{ y: y2 }}
                className="font-serif italic font-light text-brand-accent block -mt-[2vw] cursor-default transition-all duration-500"
              >
                Artisans.
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
              text="The Studio Behind the Cursor" 
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

        {/* Background Image Parallax */}
        <motion.div 
          style={{ scale: heroScale, opacity: useTransform(scrollYProgress, [0, 0.2], [0.3, 0]) }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover grayscale brightness-50"
            referrerPolicy="no-referrer"
          />
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

      {/* Manifesto Section */}
      <section className="py-24 md:py-48 px-6 md:px-8 border-b border-brand-line">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-8">
              <div className="overflow-hidden mb-12 md:mb-16">
                <motion.h2 
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={heavySpring}
                  className="text-3xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]"
                >
                  We believe that the <span className="text-brand-accent italic font-serif font-light">Digital World</span> should be as visceral and evocative as the <span className="text-brand-accent italic font-serif font-light">Physical One.</span>
                </motion.h2>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-2xl text-brand-muted leading-relaxed max-w-3xl"
              >
                Tropical Cursor is a boutique digital studio operating at the intersection of high-end design and advanced engineering. We don't just build websites; we architect digital sanctuaries that breathe, react, and resonate.
              </motion.p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 md:gap-12">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="text-3xl md:text-6xl font-bold tracking-tighter mb-2 group-hover:text-brand-accent transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-brand-muted">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-48 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              <TextReveal text="The" className="block" />
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, ...heavySpring }}
                className="font-serif italic font-light text-brand-accent block"
              >
                Alchemy.
              </motion.span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-brand-muted max-w-sm text-[10px] md:text-sm uppercase tracking-widest leading-loose"
            >
              Our methodology is a blend of rigorous strategy and unbridled creative exploration.
            </motion.p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {process.map((step, i) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, ...heavySpring }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-8 bg-brand-line">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold backdrop-blur-sm">
                    0{i + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4 flex items-center gap-4">
                  <Minus className="w-6 h-6 text-brand-accent" />
                  {step.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 md:py-48 px-6 md:px-8 bg-brand-accent text-brand-bg">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8 md:space-y-12"
          >
            <h2 className="text-4xl md:text-[10vw] font-bold tracking-tighter uppercase leading-[0.8]">
              Beyond <br />
              the Screen.
            </h2>
            <p className="text-lg md:text-3xl font-medium max-w-4xl mx-auto leading-tight opacity-80">
              We are pioneering the next era of spatial computing, where digital experiences transcend the rectangle and become part of our physical reality.
            </p>
            <div className="pt-8 md:pt-12">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 md:px-12 py-5 md:py-6 bg-brand-bg text-brand-accent rounded-full text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold flex items-center gap-4 mx-auto group"
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-16 md:h-32" />
    </div>
  );
}
