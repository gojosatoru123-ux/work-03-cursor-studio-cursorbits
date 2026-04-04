import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Magnetic from '../ui/Magnetic';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Work', path: '/work' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navBgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const navPadding = useTransform(scrollY, [0, 100], [40, 24]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothBgOpacity = useSpring(navBgOpacity, springConfig);
  const smoothBlur = useSpring(navBlur, springConfig);
  const smoothPadding = useSpring(navPadding, springConfig);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav 
        style={{
          paddingTop: smoothPadding,
          paddingBottom: smoothPadding,
        }}
        className="fixed top-0 left-0 w-full z-[1000] px-8 md:px-12 flex justify-between items-center"
      >
        <motion.div 
          style={{
            // backgroundColor: `rgba(5, 5, 5, ${smoothBgOpacity.get()})`,
            backdropFilter: `blur(${smoothBlur.get()}px)`,
          }}
          className="absolute inset-0 -z-10"
        />

        <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mix-blend-difference">
          <motion.span
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heavySpring}
          >
            Cursor
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-16 items-center">
          {navLinks.map((link, i) => (
            <Magnetic key={link.path} strength={0.1}>
              <Link
                to={link.path}
                className={cn(
                  'relative text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 group',
                  location.pathname === link.path ? 'text-brand-ink' : 'text-brand-muted hover:text-brand-accent'
                )}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...heavySpring, delay: 0.1 * (i + 1) }}
                  className="inline-block group-hover:-translate-y-0.5 transition-transform duration-300"
                >
                  {link.name}
                </motion.span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-brand-ink"
                    transition={heavySpring}
                  />
                )}
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-accent group-hover:w-full transition-all duration-500 ease-out" />
              </Link>
            </Magnetic>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-ink mix-blend-difference"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-brand-bg z-[999] flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, ...heavySpring }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'text-6xl font-bold tracking-tighter uppercase block',
                      location.pathname === link.path ? 'text-brand-accent' : 'text-brand-ink'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-8 right-8 flex justify-between items-end border-t border-brand-line pt-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-muted">Social</span>
                <div className="flex gap-4">
                  <span className="text-xs font-bold">IG</span>
                  <span className="text-xs font-bold">TW</span>
                  <span className="text-xs font-bold">LI</span>
                </div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-brand-muted">
                © 2026 Cursor
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
