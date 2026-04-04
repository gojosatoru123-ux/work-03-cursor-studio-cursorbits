import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import BackgroundEffects from './components/ui/BackgroundEffects';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import SEO from './components/ui/SEO';

const heavySpring = {
  type: 'spring',
  stiffness: 40,
  damping: 15,
  mass: 3,
};

const pageTransition = {
  initial: { 
    opacity: 0, 
    y: 10, 
    scale: 0.99,
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 1.01,
  },
  transition: { 
    duration: 0.4, 
    ease: [0.76, 0, 0.24, 1],
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/work"
            element={
              <PageWrapper>
                <Work />
              </PageWrapper>
            }
          />
          <Route
            path="/work/:id"
            element={
              <PageWrapper>
                <ProjectDetail />
              </PageWrapper>
            }
          />
          <Route
            path="/services"
            element={
              <PageWrapper>
                <Services />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      {...pageTransition}
      className="relative z-10"
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="relative min-h-screen bg-brand-bg overflow-x-hidden selection:bg-brand-ink selection:text-brand-bg">
          <SEO />
          <BackgroundEffects />
          <CustomCursor />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
