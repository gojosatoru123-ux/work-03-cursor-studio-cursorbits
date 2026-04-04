import { motion, useScroll, useTransform } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { artifacts } from '../constants/artifacts';
import Magnetic from '../components/ui/Magnetic';
import TextReveal from '../components/ui/TextReveal';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import SEO from '../components/ui/SEO';

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const artifactIndex = artifacts.findIndex((a) => a.id === Number(id));
  const artifact = artifacts[artifactIndex];
  const nextArtifact = artifacts[(artifactIndex + 1) % artifacts.length];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  if (!artifact) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-8">
        <h1 className="text-4xl font-bold uppercase mb-8 tracking-tighter">Artifact Not Found</h1>
        <Link to="/work" className="text-brand-accent uppercase tracking-[0.5em] font-bold text-xs border-b border-brand-accent pb-2">
          Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-brand-bg selection:bg-brand-accent selection:text-brand-bg">
      <SEO 
        title={`${artifact.title} | STUDIO CURSOR`}
        description={artifact.description}
        image={artifact.image}
        url={`https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/work/${artifact.id}`}
      />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden flex items-end pb-16 md:pb-32 px-6 md:px-8">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={artifact.image} 
            alt="" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <Link 
              to="/work" 
              className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-bold text-brand-accent mb-8 md:mb-12"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
              Back to Archive
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
              <div className="max-w-4xl">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, ...heavySpring }}
                  className="text-[10px] uppercase tracking-[0.6em] text-brand-accent/60 mb-4 block font-bold"
                >
                  {artifact.category} — {artifact.year}
                </motion.span>
                <h1 className="text-5xl md:text-[12vw] font-bold tracking-tighter leading-[0.8] uppercase">
                  <TextReveal text={artifact.title} className="block" delay={0.2} />
                </h1>
              </div>
              <div className="hidden md:block">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, ...heavySpring }}
                  className="w-24 h-24 rounded-full border border-brand-accent/30 flex items-center justify-center animate-spin-slow"
                >
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-48 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-48">
            {/* Left Column: Vision & Details */}
            <div className="lg:col-span-5 space-y-16 md:space-y-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8 md:space-y-12"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    className="h-px bg-brand-accent" 
                  />
                  <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-accent">The Vision</h4>
                </div>
                <p className="text-2xl md:text-5xl leading-[1.1] text-brand-ink font-bold tracking-tight">
                  {artifact.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-8 md:gap-12 pt-12 border-t border-brand-line/30"
              >
                {[
                  { label: 'Role', value: 'Lead Experience Design' },
                  { label: 'Client', value: 'Cursor Studio' },
                  { label: 'Year', value: artifact.year },
                  { label: 'Location', value: 'Digital Jungle' }
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-brand-muted font-bold block">{item.label}</span>
                    <span className="text-[10px] md:text-xs uppercase font-bold text-brand-ink">{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div className="pt-8 md:pt-12">
                <Magnetic strength={0.1}>
                  <button className="group flex items-center gap-6 px-10 md:px-12 py-5 md:py-6 bg-brand-ink text-brand-bg rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-brand-accent hover:text-brand-bg transition-all duration-500 shadow-2xl shadow-brand-ink/20">
                    Launch Experience
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Gallery */}
            <div className="lg:col-span-7 space-y-12 md:space-y-24">
              {artifact.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: i * 0.2 }}
                  className="relative aspect-video md:aspect-[16/10] overflow-hidden bg-brand-line group"
                >
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section className="py-32 md:py-64 px-6 md:px-8 border-t border-brand-line/20 bg-brand-ink text-brand-bg">
        <div className="max-w-7xl mx-auto">
          <Link 
            to={`/work/${nextArtifact.id}`}
            className="group block space-y-8 md:space-y-12"
          >
            <div className="flex items-center gap-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] uppercase tracking-[0.6em] font-bold text-brand-accent"
              >
                Next Project
              </motion.span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                className="h-px flex-grow bg-brand-accent/30 origin-left" 
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
              <h2 className="text-4xl md:text-[10vw] font-bold tracking-tighter leading-none uppercase group-hover:text-brand-accent transition-colors duration-700">
                {nextArtifact.title}
              </h2>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-brand-accent flex items-center justify-center group-hover:bg-brand-accent transition-all duration-700">
                <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-brand-accent group-hover:text-brand-bg transition-colors" />
              </div>
            </div>

            <div className="relative h-[30vh] md:h-[40vh] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                src={nextArtifact.image} 
                alt="" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-ink/40 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
