import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-brand-bg pt-16 md:pt-32 pb-12 px-6 md:px-8 border-t border-brand-line">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end mb-24 md:mb-32">
          <div>
            <h2 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 md:mb-12">
              LET'S CREATE <br />
              <span className="font-serif italic font-light text-brand-accent">Something Iconic.</span>
            </h2>
            <p className="text-brand-muted max-w-md text-base md:text-lg">
              We partner with forward-thinking brands to build digital experiences that define the future.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-8 md:gap-12">
            <Link
              to="/contact"
              className="group relative flex items-center gap-4 text-3xl md:text-6xl font-bold tracking-tighter uppercase hover:text-brand-accent transition-colors"
            >
              Get in touch
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </Link>
            
            <div className="flex flex-wrap gap-6 md:gap-8 text-[10px] md:text-sm uppercase tracking-widest font-medium text-brand-muted">
              <a href="#" className="hover:text-brand-ink transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-ink transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-brand-ink transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-12 border-t border-brand-line gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-brand-muted">
              © 2026 STUDIO CURSOR. ALL RIGHTS RESERVED.
            </div>
            <div className="text-[9px] uppercase tracking-widest text-brand-accent font-bold">
              Built by CursorBits
            </div>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12 text-[10px] md:text-xs uppercase tracking-widest text-brand-muted">
            <a href="#" className="hover:text-brand-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Vertical Rail Text */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden xl:block">
        <span className="vertical-rail text-[10px] uppercase tracking-[0.5em] text-brand-muted opacity-30">
          DIGITAL CRAFTSMANSHIP • EST. 2026
        </span>
      </div>
    </footer>
  );
}
