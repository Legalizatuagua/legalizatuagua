import React, { useEffect, useRef, useState } from 'react';
import AnimatedBorders from '../components/AnimatedBorders';
import { WHATSAPP_URL } from '../utils/whatsapp';
import heroBg from '../assets/hero_bg.jpg';
import landscapeClean from '../assets/landscape_clean_2.jpg';
import waterDark from '../assets/water_dark.jpg';
import logoOficial from '../assets/logo_oficial.png';
import Footer from '../components/Footer';
import { getPublishedItems } from '../data/cmsStore';

export default function Home() {
  const containerRef = useRef(null);
  const [homeServices, setHomeServices] = useState(() => getPublishedItems('servicios').slice(0, 3));

  useEffect(() => {
    document.title = "Legaliza Tu Agua - Derecho de Aguas y Gestión Hídrica";

    const updateServices = () => {
      setHomeServices(getPublishedItems('servicios').slice(0, 3));
    };

    window.addEventListener('cms-store-updated', updateServices);
    return () => window.removeEventListener('cms-store-updated', updateServices);
  }, []);

  
  // Section 1 (Hero) Refs
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Section 2 Refs
  const section2BgRef = useRef(null);

  // Transition States (P2.2 Click-based)
  const [hasEntered, setHasEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const targetTransitionRef = useRef(0);
  const currentTransitionRef = useRef(0);

  const [contentEntered, setContentEntered] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDirectNav, setIsDirectNav] = useState(false);

  React.useLayoutEffect(() => {
    if (hasEntered) {
      if (isDirectNav) {
        setContentEntered(true);
      } else {
        const timer = setTimeout(() => setContentEntered(true), 150);
        return () => clearTimeout(timer);
      }
    } else {
      setContentEntered(false);
    }
  }, [hasEntered, isDirectNav]);

  React.useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#/home' && hash !== '#/biblioteca' && hash !== '#/vision') {
      setIsDirectNav(true);
      const id = hash.replace('#', '');
      if (id === 'inicio') {
        setHasEntered(false);
        setIsDirectNav(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setHasEntered(true);
      }
    }
  }, []);

  React.useLayoutEffect(() => {
    if (hasEntered && isDirectNav) {
      const hash = window.location.hash;
      const id = hash.replace('#', '');
      if (id && id !== 'inicio') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }
    }
  }, [hasEntered, isDirectNav]);

  React.useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#portada') {
        setHasEntered(false);
        setContentEntered(false);
        setIsDirectNav(false);
        setIsTransitioning(false);
        targetTransitionRef.current = 0;
        currentTransitionRef.current = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash === '#inicio') {
        setHasEntered(true);
        setIsDirectNav(true);
        setTimeout(() => {
          document.getElementById('inicio-content')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    // Run once on mount to handle direct navigation from other pages
    handleHash();

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (!hasEntered) {
      setActiveSection('inicio');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20% 0px -60% 0px" }
    );

    const sections = ['inicio-content', 'nosotros', 'servicios', 'casos'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasEntered]);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion settings
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Handle transition triggering
  const handleHeroClick = (e) => {
    // Exclude clicks on potential anchors/buttons
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (isTransitioning || hasEntered) return;

    if (reducedMotion) {
      setHasEntered(true);
      return;
    }

    setIsTransitioning(true);
    targetTransitionRef.current = 1;

    // Transition completion time window (1000ms)
    setTimeout(() => {
      setHasEntered(true);
      setIsTransitioning(false);
    }, 1050);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll and ambient animations using requestAnimationFrame
  useEffect(() => {
    if (reducedMotion) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let time = 0;
    let animationFrameId;

    const handleScroll = () => {
      // Normal scroll tracking is only active once Section 2 is entered
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight || 800;
      
      targetProgress = Math.min(Math.max(scrollY / viewportHeight, 0), 1.2);
      
      // Moverse mas si existe scroll
      time += 0.015;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const tick = () => {
      // Easing interpolation for smooth scroll lag
      currentProgress += (targetProgress - currentProgress) * 0.07;
      
      // Easing interpolation for click transition progress
      currentTransitionRef.current += (targetTransitionRef.current - currentTransitionRef.current) * 0.06;

      time += 0.003; // Constant time delta for wave motion

      const progress = currentProgress;
      const trans = currentTransitionRef.current;

      // -------------------------------------------------------------
      // SECTION 1 ANIMATIONS (Cover)
      // -------------------------------------------------------------
      if (bgRef.current) {
        bgRef.current.style.transform = 'scale(1.02)';
        bgRef.current.style.opacity = Math.max(1 - trans * 1.05, 0);
      }

      const fadeOutText = Math.max(1 - trans * 1.6, 0);

      if (titleRef.current) {
        titleRef.current.style.opacity = fadeOutText;
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = fadeOutText;
      }

      if (lineRef.current) {
        lineRef.current.style.opacity = fadeOutText;
      }

      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(1 - trans * 2.0, 0);
      }


      // -------------------------------------------------------------
      // SECTION 2 ANIMATIONS (Fades in with Click transition)
      // -------------------------------------------------------------
      if (section2BgRef.current) {
        section2BgRef.current.style.opacity = hasEntered ? 1 : trans;
        section2BgRef.current.style.transform = 'scale(1)';
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion, hasEntered]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full bg-[#041014] ${!hasEntered ? 'h-screen overflow-hidden' : 'min-h-screen'} ${isDirectNav ? 'fast-nav' : ''}`}
    >
      {isDirectNav && (
        <style>{`
          .fast-nav * {
            transition-delay: 0ms !important;
            transition-duration: 300ms !important;
          }
        `}</style>
      )}
      {/* ------------------------------------------------------------- */}
      {/* GLOBAL FIXED SVGS (Continuous guide lines) */}
      {/* ------------------------------------------------------------- */}
      {hasEntered && <AnimatedBorders />}

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION (Portación original - Aprobada e Intacta) */}
      {/* ------------------------------------------------------------- */}
      {!hasEntered && (
        <section 
          onClick={handleHeroClick}
          onWheel={handleHeroClick}
          onTouchMove={handleHeroClick}
          className={`hero-section-wrapper fixed inset-0 w-full h-full overflow-hidden select-none z-40 ${isTransitioning ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
          {/* Background Image Wrapper */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              ref={bgRef}
              src={heroBg}
              alt="Paisaje de montañas y río en Chile"
              className="w-full h-full object-cover origin-center"
              style={{
                opacity: 1,
                transform: 'scale(1.02)',
                willChange: 'transform, opacity',
              }}
            />
            {/* Layer 1: Base dark petroleum tint */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.55) 100%)',
              }}
            />
            {/* Layer 2: Neutral vignette */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.65) 100%)',
              }}
            />
          </div>

          {/* CENTRAL EDITORIAL COMPOSITION */}
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center z-10 w-[92%] max-w-5xl px-4 pointer-events-none">
            <h1
              ref={titleRef}
              className="font-lydian text-white select-none leading-none tracking-[0.2em] uppercase"
              style={{
                fontSize: 'clamp(1.8rem, 8vw, 3.5rem)',
                fontWeight: 400,
                color: '#FFFAF0',
                willChange: 'transform, opacity',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}
            >
              LEGALIZATUAGUA
            </h1>
            
            <div 
              ref={subtitleRef}
              className="mt-8 flex flex-col items-center select-none"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <p
                className="font-sans text-center tracking-[0.38em] uppercase text-white/80"
                style={{
                  fontSize: 'clamp(0.6rem, 0.8vw, 0.95rem)',
                  fontWeight: 300,
                  lineHeight: '1.6',
                  maxWidth: '680px',
                }}
              >
                Especialistas en Derecho de Aguas y Gestión Hídrica
              </p>
              
              {/* Fine horizontal cian underline */}
              <div 
                ref={lineRef}
                className="h-[1px] w-16 bg-[#00A6D6]/35 mt-6"
                style={{
                  transformOrigin: 'center',
                  willChange: 'transform, opacity',
                }}
              />
            </div>
          </div>

          {/* DISCRETE SCROLL INDICATOR */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 flex flex-col items-center z-10 select-none text-white/50"
            style={{
              transform: 'translate(-50%, 0)',
              willChange: 'transform, opacity',
            }}
          >
            {/* Vertical mouse capsule */}
            <div className="w-4 h-6 border border-white/20 rounded-full flex justify-center p-1 mb-2 bg-[#061A33]/10 backdrop-blur-[2px]">
              <div className="w-[3px] h-[6px] bg-[#00A6D6]/80 rounded-full animate-bounce duration-[1500ms]" />
            </div>
            <span className="text-[8px] tracking-[0.3em] font-light uppercase text-white/40">
              DESLIZA
            </span>
          </div>

        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL FIXED BACKGROUND (Section 2 landscapeClean) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          <div className="absolute inset-0 w-full h-full origin-center">
            <img
              ref={section2BgRef}
              src={landscapeClean}
              alt="Paisaje agrícola con canal de agua"
              className="w-full h-full object-cover object-[75%_50%] lg:object-center pointer-events-none select-none"
              style={{
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(2, 17, 22, 0.88) 0%, rgba(2, 17, 22, 0.65) 35%, rgba(2, 17, 22, 0.20) 70%, rgba(2, 17, 22, 0.08) 100%)',
            opacity: 1,
          }}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SEGUNDA SECCIÓN (Paisaje base limpio - Revealed via Click) */}
      {/* ------------------------------------------------------------- */}
      <section 
        className={`w-full min-h-[100dvh] bg-transparent ${!hasEntered ? 'fixed inset-0 z-30' : 'relative z-30'}`}
        style={{
          boxShadow: '0 -20px 40px rgba(4, 16, 20, 0.95)',
        }}
      >
        {/* CONTENT OF SECTION 2 */}
        <div className="relative z-30 w-full min-h-screen flex flex-col pointer-events-none">
           {/* HEADER */}
           <header id="inicio-content"
             className="w-full px-8 lg:px-24 py-4 lg:py-8 flex justify-between items-center pointer-events-auto max-lg:bg-[#020A14] max-lg:border-b max-lg:border-white/10 relative z-50"
             style={{
               opacity: contentEntered ? 1 : 0,
               transform: contentEntered ? 'translateY(0)' : 'translateY(-20px)',
               transition: 'opacity 1200ms ease-out 100ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
             }}
           >
             {/* Logo & Name */}
             <a href="#portada" onClick={(e) => {
               e.preventDefault();
               setMobileMenuOpen(false);
               window.location.hash = '#portada';
               setHasEntered(false);
               setContentEntered(false);
               setIsDirectNav(false);
               setIsTransitioning(false);
               targetTransitionRef.current = 0;
               currentTransitionRef.current = 0;
               window.scrollTo({ top: 0, behavior: 'instant' });
             }} className="flex items-center gap-3 group cursor-pointer focus:outline-none">
               <img src={logoOficial} alt="Logo Legaliza Tu Agua" className="h-8 lg:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
               <span className="font-editorial text-white tracking-[0.2em] text-xs lg:text-sm font-light">LEGALIZATUAGUA</span>
             </a>

             {/* Center Nav Links */}
             <nav className="hidden lg:flex items-center gap-8">
               <a href="#inicio" onClick={(e) => { e.preventDefault(); document.getElementById('inicio-content')?.scrollIntoView({ behavior: 'smooth' }); }} className={`relative text-[11px] font-sans tracking-[0.15em] transition-colors ${activeSection === 'inicio' || activeSection === 'inicio-content' ? 'text-white' : 'text-white/80 hover:text-[#00A6D6]'}`}>INICIO{(activeSection === 'inicio' || activeSection === 'inicio-content') && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00A6D6] animate-fade-in"></span>}</a>
               <a href="#nosotros" onClick={(e) => { e.preventDefault(); const el = document.getElementById('nosotros'); if(el) window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY + 1, behavior: 'smooth'}); }} className={`relative text-[11px] font-sans tracking-[0.15em] transition-colors ${activeSection === 'nosotros' ? 'text-white' : 'text-white/80 hover:text-[#00A6D6]'}`}>NOSOTROS{activeSection === 'nosotros' && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00A6D6] animate-fade-in"></span>}</a>
               <a href="#/servicios" className="text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors">SERVICIOS</a>
               <a href="#casos" onClick={(e) => { e.preventDefault(); document.getElementById('casos')?.scrollIntoView({ behavior: 'smooth' }); }} className={`relative text-[11px] font-sans tracking-[0.15em] transition-colors ${activeSection === 'casos' ? 'text-white' : 'text-white/80 hover:text-[#00A6D6]'}`}>CASOS DE ÉXITO{activeSection === 'casos' && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00A6D6] animate-fade-in"></span>}</a>
               <a href="#/biblioteca" className="text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors">BIBLIOTECA JURÍDICA</a>
               <a href="#/contacto" className="text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors">CONTACTO</a>
             </nav>
             
             <div className="hidden lg:block">
               <a href="#/asesoria" className="flex items-center gap-2 bg-[#00A6D6] text-[#020A14] px-4 py-2 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase hover:bg-[#00B8ED] transition-colors shadow-[0_0_15px_rgba(0,166,214,0.4)]">
                 SOLICITAR ASESORÍA
               </a>
             </div>
             
             {/* Mobile Menu Button */}
             <div className="lg:hidden">
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   setMobileMenuOpen(!mobileMenuOpen);
                 }}
                 className="text-white p-2 focus:outline-none cursor-pointer relative z-[80]"
                 aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
               >
                 {mobileMenuOpen ? (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                 ) : (
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                 )}
               </button>
             </div>
           </header>

            {/* Backdrop for outside click to close mobile menu */}
            {mobileMenuOpen && (
              <div 
                className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={() => setMobileMenuOpen(false)}
                onTouchStart={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div 
                className="lg:hidden fixed top-[65px] left-0 w-full z-[70] bg-[#020A14] border-b border-white/10 shadow-2xl transition-all duration-300 animate-fade-in pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col py-4 px-6 gap-1 divide-y divide-white/5">
                  <a 
                    href="#inicio" 
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      const el = document.getElementById('inicio-content');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="text-white/90 text-sm font-sans tracking-widest uppercase py-3 hover:text-[#00A6D6] transition-colors flex items-center justify-between"
                  >
                    Inicio
                  </a>
                  <a 
                    href="#nosotros" 
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      const el = document.getElementById('nosotros');
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 1, behavior: 'smooth' });
                    }} 
                    className="text-white/90 text-sm font-sans tracking-widest uppercase py-3 hover:text-[#00A6D6] transition-colors flex items-center justify-between"
                  >
                    Nosotros
                  </a>
                  <a 
                    href="#/servicios" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-white/90 text-sm font-sans tracking-widest uppercase py-3 hover:text-[#00A6D6] transition-colors flex items-center justify-between"
                  >
                    Servicios
                  </a>
                  <a 
                    href="#/biblioteca" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-white/90 text-sm font-sans tracking-widest uppercase py-3 hover:text-[#00A6D6] transition-colors flex items-center justify-between"
                  >
                    Biblioteca jurídica
                  </a>
                  <a 
                    href="#/contacto" 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-white/90 text-sm font-sans tracking-widest uppercase py-3 hover:text-[#00A6D6] transition-colors flex items-center justify-between"
                  >
                    Contacto
                  </a>
                </div>
              </div>
            )}

           {/* MAIN CONTENT TEXT & RIGHT CARD */}
           <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 pb-16 lg:pb-20 pt-6 lg:pt-0 pointer-events-auto w-full max-w-[1200px] mx-auto gap-8 sm:gap-12 lg:gap-8">
             
             {/* LEFT COLUMN */}
             <div className="flex flex-col w-full lg:max-w-[500px]">
               <div 
                 className="mb-4 lg:mb-2"
                 style={{
                   opacity: contentEntered ? 1 : 0,
                   transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
                   transition: 'opacity 700ms ease-out 100ms, transform 700ms ease-out 100ms'
                 }}
               >
                 <h2 className="text-[#00A6D6] text-[9px] sm:text-[10px] font-sans tracking-[0.15em] uppercase font-medium">
                   ESPECIALISTAS EN DERECHO DE AGUAS Y GESTIÓN HÍDRICA
                 </h2>
                 <div className="h-[1px] w-12 bg-[#00A6D6]/60 mt-3 lg:mt-2" />
               </div>

               <h1 
                 className="font-dm-sans text-[#FFFAF0]/95 uppercase mb-2 lg:mb-0 w-full max-w-[600px] text-2xl lg:text-3xl font-medium tracking-wide"
                 style={{
                   lineHeight: 1.3,
                   opacity: contentEntered ? 1 : 0,
                   transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
                   transition: 'opacity 700ms ease-out 200ms, transform 700ms ease-out 200ms'
                 }}
               >
                 <span className="block mb-0 lg:mb-0">15 AÑOS</span>
                 <span className="block mb-0 lg:mb-0">PROTEGIENDO</span>
                 <span className="block text-[#00A6D6]">EL DERECHO AL AGUA</span>
               </h1>

               <p 
                 className="mt-2 lg:mt-4 font-sans text-white/70 text-[14px] lg:text-[15px] leading-[1.6] lg:leading-[1.7] font-light mb-6 lg:mb-0 w-full max-w-[600px] text-justify"
                 style={{
                   opacity: contentEntered ? 1 : 0,
                   transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
                   transition: 'opacity 700ms ease-out 300ms, transform 700ms ease-out 300ms'
                 }}
               >
                 Acompañamos a agricultores, comunidades y organizaciones en la regularización, defensa y gestión estratégica de sus derechos de agua.
               </p>

               <div 
                  className="mt-4 lg:mt-6 flex flex-row self-start"
                  style={{
                    opacity: contentEntered ? 1 : 0,
                    transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
                    transition: 'opacity 700ms ease-out 400ms, transform 700ms ease-out 400ms'
                  }}
                >
                  <a href="#/servicios" className="flex items-center justify-center gap-2 lg:gap-3 bg-transparent border border-white/30 text-white px-4 lg:px-6 py-2.5 rounded-md text-[10px] font-medium tracking-[0.1em] hover:bg-white/10 hover:border-white transition-all duration-300 whitespace-nowrap">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[12px] h-[12px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    CONOCE NUESTROS SERVICIOS
                  </a>
                </div>
             </div>

             {/* RIGHT COLUMN (GLASS CARD) */}
             <div 
               className="w-full lg:w-auto shrink-0 flex justify-start relative z-20 pointer-events-auto"
               style={{
                 opacity: contentEntered ? 1 : 0,
                 transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
                 transition: 'opacity 700ms ease-out 500ms, transform 700ms ease-out 500ms'
               }}
             >
               <div className="bg-white/[0.02] backdrop-blur-[16px] border border-white/10 rounded-[18px] lg:rounded-[20px] p-4 sm:p-5 lg:p-7 flex flex-col items-start shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative overflow-hidden self-start w-fit max-w-[260px] sm:max-w-[280px] lg:w-[300px]">
                 
                 {/* Subtle inner highlight */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                 {/* Icon Box */}
                 <div className="w-[36px] h-[36px] lg:w-[52px] lg:h-[52px] rounded-[10px] lg:rounded-[16px] border border-white/10 flex items-center justify-center mb-3 lg:mb-6 bg-white/[0.01]">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]">
                     <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                   </svg>
                 </div>
                 
                 {/* Text */}
                 <p className="text-[#FFFAF0]/90 font-dm-sans text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.35] lg:leading-[1.45] font-light mb-3 sm:mb-4 lg:mb-6 tracking-wide text-left">
                   Gestionamos hoy<br />
                   el recurso más<br />
                   importante del<br />
                   mañana.
                 </p>
                 
                 {/* Divider */}
                 <div className="w-full h-[1px] bg-white/10 mb-3 lg:mb-5"></div>
                 
                 {/* Link */}
                 <a href="#/vision" className="relative z-30 inline-flex items-center gap-2.5 text-white/90 text-[10px] lg:text-[11px] font-sans tracking-[0.15em] uppercase hover:text-[#00A6D6] transition-colors group cursor-pointer py-1">
                   SABER MÁS
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-1 transition-transform w-[12px] h-[12px] lg:w-[14px] lg:h-[14px]"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </a>
               </div>
             </div>
             
           </div>      
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECCIÓN NOSOTROS */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="nosotros"
        className="w-full relative z-30 bg-[#041014] overflow-hidden pt-24 pb-12 lg:pb-32 px-4 sm:px-8 lg:px-12"
        style={{
          opacity: contentEntered ? 1 : 0,
          transition: isDirectNav ? 'opacity 300ms ease-out' : 'opacity 1000ms ease-out 800ms'
        }}
      >
        {/* SECTION BACKGROUND: Water texture for the borders */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src={waterDark} 
            alt="" 
            className="w-full h-full object-cover opacity-60 animate-slow-pan mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-[#041014]/60 mix-blend-multiply"></div>
          {/* Degradado hacia el footer */}
          <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-[#020A14] to-transparent lg:hidden"></div>
        </div>

        {/* Layout Container without visual styles */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto overflow-hidden">
          {/* Content */}
          <div className="relative z-10 px-6 py-12 lg:px-16 lg:py-16 pointer-events-auto">
            {/* Top Block (2 Columns) */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 mb-10">
              
              {/* Left Column (Text) */}
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                <h3 className="text-[#00A6D6] text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium mb-4">
                  NOSOTROS
                </h3>
                <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide mb-6 uppercase">
                  Un equipo comprometido<br className="hidden lg:block" /> con <span className="text-[#00A6D6]">el agua</span> y las personas
                </h2>
                
                <div className="flex items-start gap-4">
                  <div className="w-[2px] h-12 lg:h-14 bg-[#00A6D6]/60 mt-1 shrink-0"></div>
                  <p className="font-sans text-white/70 text-[14px] lg:text-[15px] leading-[1.6] font-light text-justify m-0">
                    Especialistas en derecho de aguas y gestión hídrica.<br className="hidden lg:block" /> Más de 15 años acompañando a agricultores,<br className="hidden lg:block" /> comunidades y empresas para proteger y<br className="hidden lg:block" /> gestionar sus derechos de agua.
                  </p>
                </div>
              </div>

              {/* Right Column (Illustration) */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end opacity-40">
                <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="w-[140px] lg:w-[220px] h-auto">
                  {/* Subtle water drop minimal line art */}
                  <path d="M100 20 C100 20, 140 80, 140 120 C140 142, 122 160, 100 160 C78 160, 60 142, 60 120 C60 80, 100 20, 100 20 Z" stroke="#00A6D6" strokeWidth="0.8" />
                  {/* Waves inside */}
                  <path d="M65 115 Q 82.5 105, 100 115 T 135 115" stroke="#00A6D6" strokeWidth="0.8" strokeLinecap="round" />
                  <path d="M62 125 Q 82.5 115, 100 125 T 138 125" stroke="#00A6D6" strokeWidth="0.8" strokeLinecap="round" />
                  <path d="M65 135 Q 82.5 125, 100 135 T 135 135" stroke="#00A6D6" strokeWidth="0.8" strokeLinecap="round" />
                  {/* Ripples below */}
                  <ellipse cx="100" cy="170" rx="40" ry="4" stroke="#00A6D6" strokeWidth="0.4" />
                  <ellipse cx="100" cy="170" rx="60" ry="7" stroke="#00A6D6" strokeWidth="0.3" />
                  <ellipse cx="100" cy="170" rx="80" ry="10" stroke="#00A6D6" strokeWidth="0.2" />
                </svg>
              </div>
            </div>

            {/* Separator / Divider */}
            <div className="relative flex items-center justify-center mb-10 mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative bg-[#020A14] px-4">
                <h4 className="font-dm-sans text-white/90 text-[11px] sm:text-[13px] font-medium tracking-[0.1em] uppercase">
                  NUESTRO COMPROMISO
                </h4>
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {/* 4 Cards */}
              {[
                { 
                  icon: <svg width="24" height="24" className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M3 7h18"/><path d="M6 7l-3 7c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-7z"/><path d="M18 7l-3 7c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-7z"/></svg>, 
                  title: "Especialistas en derecho de aguas",
                  desc: "Asesoría legal experta en la protección y gestión de derechos de agua."
                },
                { 
                  icon: <svg width="24" height="24" className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>, 
                  title: "Gestión integral y eficiente",
                  desc: "Acompañamos todo el proceso, desde el análisis hasta la resolución."
                },
                { 
                  icon: <svg width="24" height="24" className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
                  title: "Cercanía y compromiso",
                  desc: "Trabajamos junto a nuestros clientes con transparencia y confianza."
                },
                { 
                  icon: <svg width="24" height="24" className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M12 12C9 12 5 10 5 6s4-3 7-3c3 0 7 1 7 5s-4 6-7 6z"/><path d="M12 12c-3 0-7 2-7 6s4 3 7 3"/></svg>, 
                  title: "Sostenibilidad y futuro",
                  desc: "Promovemos una gestión responsable del agua para las futuras generaciones."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] backdrop-blur-[16px] border border-white/10 rounded-[16px] p-4 lg:p-6 flex flex-col items-center text-center shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] relative overflow-hidden group hover:bg-white/[0.04] transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <div className="text-[#00A6D6] mb-3 lg:mb-4">{item.icon}</div>
                  <h5 className="text-[#FFFAF0]/90 font-dm-sans text-[12px] sm:text-[14px] leading-[1.3] font-medium tracking-wide mb-2 lg:mb-3 h-auto sm:h-10 flex items-center justify-center">{item.title}</h5>
                  <div className="w-8 h-[1px] bg-white/20 mb-3 hidden sm:block"></div>
                  <p className="text-white/70 font-sans text-[10px] sm:text-[12px] leading-[1.4] sm:leading-[1.5] font-light px-1 text-justify hyphens-auto">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 lg:mt-10 text-center flex items-center justify-center gap-2">
              <svg width="12" height="12" className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="#00A6D6" strokeWidth="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
              <p className="font-sans text-white/70 text-[11px] sm:text-[13px] tracking-wide">
                Soluciones jurídicas y estratégicas para un <span className="text-[#00A6D6]">recurso vital</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Access to Palabras del Fundador */}
        <div className="relative z-10 w-full max-w-[720px] mx-auto mt-6 sm:mt-8 px-4 sm:px-0">
          <div className="bg-gradient-to-br from-[#020A14]/90 to-[#041A25]/90 backdrop-blur-[24px] border border-[#00A6D6]/30 rounded-[20px] lg:rounded-[28px] p-6 sm:p-7 lg:p-10 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,166,214,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00A6D6]/10 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
            
            <h3 className="font-dm-sans text-white/90 text-xl sm:text-2xl lg:text-[26px] font-medium tracking-wide mb-3 relative z-10 uppercase">
              Palabras del Fundador
            </h3>
            <p className="font-sans text-white/70 text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.6] font-light max-w-lg mx-auto mb-6 relative z-10 text-justify hyphens-auto">
              Conoce la visión, experiencia y compromiso que han guiado a LegalizaTuAgua durante más de quince años.
            </p>
            
            <a href="#/fundador" className="relative z-10 inline-flex items-center gap-2.5 bg-[#00A6D6] text-[#020A14] px-6 lg:px-7 py-2.5 lg:py-3 rounded-full text-[10px] lg:text-[11px] tracking-[0.15em] font-medium uppercase hover:bg-[#00B8ED] transition-all duration-300 shadow-[0_4px_15px_rgba(0,166,214,0.4)] hover:shadow-[0_8px_25px_rgba(0,166,214,0.5)] transform hover:-translate-y-0.5">
              Leer palabras del fundador
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SECCIÓN SERVICIOS */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="servicios"
        className="w-full relative z-30 bg-[#041014] overflow-hidden pt-12 lg:pt-24 pb-32 px-4 sm:px-8 lg:px-12"
        style={{
          opacity: contentEntered ? 1 : 0,
          transition: isDirectNav ? 'opacity 300ms ease-out' : 'opacity 1000ms ease-out 1000ms'
        }}
      >
        {/* SECTION BACKGROUND: Water texture for the borders */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src={waterDark} 
            alt="" 
            className="w-full h-full object-cover opacity-60 animate-slow-pan mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-[#041014]/60 mix-blend-multiply"></div>
        </div>

        {/* SERVICES CONTENT */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
            
            {/* Left Column (35%) */}
            <div className="w-full lg:w-[35%] flex flex-col items-start text-left lg:sticky lg:top-32 h-fit">
              <h3 className="text-[#00A6D6] text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium mb-4 sm:mb-6">
                NUESTROS SERVICIOS
              </h3>
              <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl lg:text-[34px] font-medium tracking-wide leading-[1.3] mb-6 uppercase">
                SOLUCIONES JURÍDICAS PARA PROTEGER Y GESTIONAR TUS DERECHOS DE AGUA.
              </h2>
              <p className="font-sans text-white/70 text-[14px] lg:text-[16px] leading-[1.7] font-light mb-8 lg:mb-12 text-justify">
                Acompañamos a personas, agricultores, empresas y organizaciones de usuarios en todas las etapas relacionadas con los derechos de aprovechamiento de aguas. Conoce cómo podemos ayudarte según las necesidades de tu proyecto.
              </p>
              
              <a href="#/servicios" className="inline-flex items-center gap-3 bg-transparent border border-[#00A6D6]/40 text-[#00A6D6] px-6 lg:px-8 py-3 lg:py-3.5 rounded-full text-[10px] lg:text-[11px] tracking-[0.15em] font-medium uppercase hover:bg-[#00A6D6] hover:text-[#020A14] transition-all duration-300 shadow-[0_4px_15px_rgba(0,166,214,0.1)] hover:shadow-[0_8px_25px_rgba(0,166,214,0.3)]">
                Conocer todos los servicios
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            {/* Right Column (65%) */}
            <div className="w-full lg:w-[65%] flex flex-col gap-4 lg:gap-6">
              {homeServices.map((srv, i) => {
                const defaultImages = ["/servicio_1.jpg", "/servicio_2.jpg", "/servicio_3.jpg"];
                const defaultIcons = [
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                ];
                return (
                  <div key={srv.slug || srv.id || i} className="bg-[#020A14]/60 backdrop-blur-[16px] border border-white/5 rounded-[12px] lg:rounded-[30px] p-4 lg:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative overflow-hidden group flex flex-col sm:flex-row hover:bg-[#020A14]/80 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    
                    <div className="flex-1 flex flex-col justify-center relative z-10 sm:pr-6">
                      <div className="text-[#00A6D6] mb-3 lg:mb-4 transform group-hover:scale-110 transition-transform duration-500 [&>svg]:w-[24px] [&>svg]:h-[24px] lg:[&>svg]:w-[28px] lg:[&>svg]:h-[28px]">
                        {defaultIcons[i % defaultIcons.length]}
                      </div>
                      <h5 className="text-[#FFFAF0]/90 font-dm-sans text-[14px] sm:text-[16px] lg:text-[18px] font-medium leading-[1.2] lg:leading-[1.3] mb-2 lg:mb-3">
                        {srv.title}
                      </h5>
                      <p className="font-sans text-white/60 text-[11px] sm:text-[12px] lg:text-[14px] leading-[1.5] lg:leading-[1.6] font-light flex-1 text-justify">
                        {srv.desc || srv.content}
                      </p>
                    </div>

                    <div className="hidden sm:block sm:w-[35%] shrink-0 relative overflow-hidden h-auto rounded-[20px]">
                      <div className="absolute inset-0 bg-[#00A6D6]/10 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"></div>
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#020A14] z-10 hidden sm:block pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020A14] to-transparent z-10 sm:hidden pointer-events-none"></div>
                      <img src={srv.image || defaultImages[i % defaultImages.length]} alt={srv.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                );
              })}

              
              <div className="mt-4 lg:mt-6 text-left flex justify-start">
                <a href="#/servicios" className="inline-flex items-center gap-2 text-[#00A6D6] text-[11px] sm:text-[13px] tracking-wide font-medium hover:text-white transition-colors duration-300 group">
                  Ver todos los servicios
                  <svg width="14" height="14" className="transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. SECCIÓN CASOS DE ÉXITO */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="casos"
        className="w-full relative z-30 bg-[#041014] overflow-hidden pt-24 pb-32 px-4 sm:px-8 lg:px-12"
        style={{
          opacity: contentEntered ? 1 : 0,
          transition: isDirectNav ? 'opacity 300ms ease-out' : 'opacity 1000ms ease-out 1200ms'
        }}
      >
        {/* SECTION BACKGROUND: Water texture for the borders */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src={waterDark} 
            alt="" 
            className="w-full h-full object-cover opacity-60 animate-slow-pan mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-[#041014]/60 mix-blend-multiply"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto">
          
          {/* ENCABEZADO Y CIFRAS */}
          <div className="flex flex-col items-center text-center max-w-[1000px] mx-auto mb-16 lg:mb-24">
            <h3 className="text-[#00A6D6] text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium mb-4 lg:mb-6">
              CASOS DE ÉXITO
            </h3>
            <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide mb-10 lg:mb-12 uppercase text-center max-w-[800px]">
              Resultados reales que generan <span className="text-[#00A6D6]">seguridad y valor</span> para el futuro
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full gap-10 lg:gap-16">
              
              {/* Left Side: Subtitle text */}
              <div className="w-full lg:w-1/2 flex flex-col text-left">
                <p className="font-sans text-white/70 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] font-light text-justify">
                  Más de 15 años acompañando a organizaciones de usuarios, comunidades, agricultores y empresas en la regularización, protección y gestión estratégica de sus derechos de agua, obteniendo resultados concretos y sostenibles.
                </p>
              </div>

              {/* Right Side: Square Stats Box */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="bg-white/[0.02] backdrop-blur-[16px] border border-white/10 rounded-[24px] p-6 lg:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative overflow-hidden w-full max-w-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-4 text-center relative z-10">
                    <div className="flex flex-col">
                      <span className="font-dm-sans text-[#00A6D6] text-[24px] lg:text-[32px] font-semibold mb-1 leading-none">+500</span>
                      <span className="font-sans text-white/60 text-[11px] lg:text-[13px] tracking-wide font-light">Casos gestionados</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-dm-sans text-[#00A6D6] text-[24px] lg:text-[32px] font-semibold mb-1 leading-none">+300</span>
                      <span className="font-sans text-white/60 text-[11px] lg:text-[13px] tracking-wide font-light">Clientes asesorados</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-dm-sans text-[#00A6D6] text-[24px] lg:text-[32px] font-semibold mb-1 leading-none">+15</span>
                      <span className="font-sans text-white/60 text-[11px] lg:text-[13px] tracking-wide font-light">Años experiencia</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-dm-sans text-[#00A6D6] text-[18px] lg:text-[22px] font-semibold mb-1 leading-none mt-1 lg:mt-2">Nacional</span>
                      <span className="font-sans text-white/60 text-[11px] lg:text-[13px] tracking-wide font-light">Presencia en Chile</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CASOS DESTACADOS TÍTULO */}
          <div className="text-center mb-16">
            <h4 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-4">Proyectos que respaldan nuestra experiencia</h4>
          </div>

          {/* CASOS GRID (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
            {[
              {
                img: "/embalse_coihueco.jpg",
                title: "Embalse Coihueco",
                period: "2011–2014",
                cat: "Gestión Institucional",
                desc: "Conducción del proceso de transferencia del Embalse Coihueco desde el Estado hacia las organizaciones de regantes, culminando con la aprobación del Consejo de Ministros de la Comisión Nacional de Riego (CNR), constituyendo un importante hito institucional para la gestión del recurso hídrico."
              },
              {
                img: "/caso2.jpg",
                title: "Agrícola Pullami",
                period: "2016–2018",
                cat: "Agricultura",
                desc: "Regularización de un derecho de aprovechamiento de 120 litros por segundo mediante la aplicación del artículo 2° transitorio del Código de Aguas, asegurando la continuidad jurídica de una de las explotaciones agrícolas más relevantes de la zona."
              },
              {
                img: "/caso3.jpg",
                title: "Condominio Los Ciruelos",
                period: "2024 – Actualidad",
                cat: "Comunidad de Aguas",
                desc: "Coordinación simultánea de 60 expedientes de regularización para copropietarios, logrando que más de 30 solicitudes ya hayan sido declaradas admisibles por la Dirección General de Aguas."
              },
              {
                img: "/caso_destacado.jpg",
                title: "Curacaví – Aguas Andinas",
                period: "2024–2025",
                cat: "Proyecto Destacado",
                desc: "Gestión institucional que permitió obtener una carta de compromiso para la ampliación de la concesión sanitaria de Aguas Andinas, destrabando el desarrollo de un importante proyecto de vivienda social."
              }
            ].map((caso, i) => (
              <div key={i} className="bg-[#020A14] backdrop-blur-[16px] border border-white/5 rounded-[16px] lg:rounded-[30px] flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative overflow-hidden group hover:bg-white/[0.03] transition-colors duration-500">
                <div className="h-[100px] sm:h-[140px] lg:h-[220px] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#00A6D6]/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <img src={caso.img} alt={caso.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-4 lg:p-8 flex flex-col flex-1 relative z-20">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2 lg:mb-4 gap-1 lg:gap-0">
                    <span className="text-[#00A6D6] text-[8px] lg:text-[10px] tracking-[0.15em] uppercase font-medium line-clamp-1">{caso.cat}</span>
                    <span className="text-white/50 text-[9px] lg:text-[11px] font-light">{caso.period}</span>
                  </div>
                  <h5 className="text-[#FFFAF0] font-dm-sans text-[12px] sm:text-[14px] lg:text-[20px] leading-[1.2] lg:leading-[1.3] font-medium mb-2 lg:mb-4">{caso.title}</h5>
                  <p className="text-white/60 font-sans text-[9px] sm:text-[11px] lg:text-[14px] leading-[1.4] lg:leading-[1.6] font-light mb-4 lg:mb-8 flex-1 text-justify">{caso.desc}</p>
                </div>
              </div>
            ))}
          </div>


          {/* TESTIMONIOS */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h4 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-4">Lo que destacan de nuestro trabajo</h4>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[
                {
                  quote: "Reconoce su capacidad para aportar soluciones prácticas y técnicamente fundadas en procesos complejos relacionados con la gestión hídrica.",
                  name: "Fernando Peralta T.",
                  role: "Pdte. Confederación de Canalistas de Chile"
                },
                {
                  quote: "Destaca su habilidad para coordinar procesos jurídicos y técnicos con un número significativo de usuarios.",
                  name: "Comité de Administración",
                  role: "Condominio Los Ciruelos"
                },
                {
                  quote: "Resalta su compromiso con la gestión sustentable del agua y la defensa de derechos históricos.",
                  name: "Referencia Gremial",
                  role: "Sector Hídrico"
                },
                {
                  quote: "Describe su trabajo como una fuente de tranquilidad patrimonial y una hoja de ruta clara para las comunidades.",
                  name: "Liderazgo Territorial",
                  role: "Región de Valparaíso"
                }
              ].map((testimonio, i) => (
                <div key={i} className="bg-white/[0.02] backdrop-blur-[16px] border border-white/10 rounded-[16px] lg:rounded-[20px] p-4 lg:p-8 flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative overflow-hidden">
                  <div className="text-[#00A6D6]/40 mb-3 lg:mb-6 [&>svg]:w-[20px] [&>svg]:h-[20px] lg:[&>svg]:w-[32px] lg:[&>svg]:h-[32px]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <p className="text-white/70 font-sans text-[10px] sm:text-[13px] leading-[1.4] lg:leading-[1.6] font-light italic mb-4 lg:mb-8 flex-1 text-justify">"{testimonio.quote}"</p>
                  <div>
                    <h6 className="text-[#FFFAF0] font-dm-sans text-[11px] lg:text-[14px] font-medium mb-1">{testimonio.name}</h6>
                    <p className="text-[#00A6D6] font-sans text-[8px] lg:text-[10px] tracking-[0.1em] uppercase">{testimonio.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA FINAL */}
          <div className="p-10 lg:p-16 flex flex-col items-center text-center relative overflow-hidden">
            <h4 className="font-dm-sans text-[#FFFAF0] text-2xl lg:text-3xl font-medium tracking-wide mb-4 relative z-10 uppercase text-center">
              ¿TIENES UN PROYECTO O NECESITAS ASESORÍA?
            </h4>
            <p className="text-white/60 font-sans text-[14px] lg:text-[16px] leading-[1.6] font-light mb-8 max-w-[500px] relative z-10 text-justify">
              Conversemos sobre cómo podemos ayudarte a proteger y gestionar tus derechos de agua.
            </p>
            <a href="#/asesoria" className="inline-flex items-center justify-center gap-2 bg-[#00A6D6] text-[#020A14] px-8 py-3.5 rounded-full text-[11px] lg:text-[12px] tracking-[0.15em] font-medium uppercase hover:bg-[#00B8ED] transition-colors duration-300 shadow-[0_4px_15px_rgba(0,166,214,0.4)] relative z-10">
              Solicitar Asesoría
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER INYECTADO AL FINAL PARA SCROLL NATURAL */}
      <Footer />

    </div>
  );
}
