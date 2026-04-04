import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const springConfig = { stiffness: 50, damping: 30, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothScroll = useSpring(scrollYProgress, springConfig);

  // Background color shifts based on scroll
  const bgColor = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    ['#050505', '#0a0a0a', '#050505']
  );

  // Floating blobs that react to mouse and scroll with a "liquid" feel
  const blob1X = useTransform(smoothMouseX, [0, windowSize.width], [-100, 100]);
  const blob1Y = useTransform(smoothMouseY, [0, windowSize.height], [-100, 100]);
  const blob1Rotate = useTransform(smoothScroll, [0, 1], [0, 360]);
  const blob1Scale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.2, 0.8]);

  const blob2X = useTransform(smoothMouseX, [0, windowSize.width], [100, -100]);
  const blob2Y = useTransform(smoothMouseY, [0, windowSize.height], [100, -100]);
  const blob2Scale = useTransform(smoothScroll, [0, 0.5, 1], [1, 1.5, 1.2]);
  const blob2Rotate = useTransform(smoothScroll, [0, 1], [0, -180]);

  const blob3X = useTransform(smoothMouseX, [0, windowSize.width], [-50, 50]);
  const blob3Y = useTransform(smoothScroll, [0, 1], [0, 500]);

  // Parallax for noise and grid
  const noiseY = useTransform(smoothScroll, [0, 1], [0, -100]);
  const gridY = useTransform(smoothScroll, [0, 1], [0, -50]);

  // Cursor Spotlight effect
  const spotlightX = useSpring(mouseX, { stiffness: 150, damping: 40 });
  const spotlightY = useSpring(mouseY, { stiffness: 150, damping: 40 });

  // Generate static particles once
  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 15 + 15,
    }));
  }, []);

  return (
    <motion.div 
      style={{ backgroundColor: bgColor }}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Cursor Spotlight */}
      <motion.div
        style={{
          left: spotlightX,
          top: spotlightY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[40vw] h-[40vw] rounded-full bg-brand-accent/5 blur-[60px] md:blur-[80px] z-10"
      />

      {/* Atmospheric Gradients - Liquid Blobs */}
      <motion.div
        style={{
          x: blob1X,
          y: blob1Y,
          rotate: blob1Rotate,
          scale: blob1Scale,
        }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-accent/5 blur-[80px] md:blur-[100px]"
      />
      
      <motion.div
        style={{
          x: blob2X,
          y: blob2Y,
          scale: blob2Scale,
          rotate: blob2Rotate,
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-ink/10 blur-[100px] md:blur-[120px]"
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.15, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          className="absolute bg-brand-accent rounded-full opacity-10"
        />
      ))}

      {/* Noise Texture Overlay - Parallax */}
      <motion.div 
        style={{ y: noiseY }}
        className="absolute inset-[-100px] opacity-[0.02] md:opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" 
      />

      {/* Dynamic Grid Lines - Parallax */}
      <motion.div 
        style={{ 
          opacity: useTransform(smoothScroll, [0, 0.2], [0.03, 0.01]),
          y: gridY,
        }}
        className="absolute inset-[-50px] grid-lines z-0" 
      />
    </motion.div>
  );
}
