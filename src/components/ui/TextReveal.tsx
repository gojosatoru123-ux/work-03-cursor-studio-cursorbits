import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({ 
  text, 
  className, 
  once = true, 
  delay = 0,
  stagger = 0.02
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("overflow-hidden", className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '0.25em' }}
          key={index}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
