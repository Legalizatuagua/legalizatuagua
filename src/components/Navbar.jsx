import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoOficial from '../assets/logo_oficial.png';

export default function Navbar({ activeRoute, setRoute }) {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(-20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight || 800;
      
      // Calculate opacity and translation based on scroll progress through Hero
      const startScroll = heroHeight * 0.35;
      const endScroll = heroHeight * 0.85;

      if (reducedMotion) {
        // Instant transitions for accessibility
        if (scrollY > heroHeight * 0.5) {
          setOpacity(1);
          setTranslateY(0);
        } else {
          setOpacity(0);
          setTranslateY(0);
        }
        return;
      }
      
      if (scrollY <= startScroll) {
        setOpacity(0);
        setTranslateY(-15);
      } else if (scrollY >= endScroll) {
        setOpacity(1);
        setTranslateY(0);
      } else {
        const progress = (scrollY - startScroll) / (endScroll - startScroll);
        // Quad ease in-out for visual smoothness
        const easeProgress = progress * progress; 
        setOpacity(easeProgress);
        setTranslateY(-15 + easeProgress * 15);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  const navLinks = [
    { label: 'Inicio', route: 'inicio' },
    { label: 'Nosotros', route: 'nosotros' },
    { label: 'Servicios', route: 'servicios' },
    { label: 'Biblioteca Jurídica', route: 'biblioteca' },
    { label: 'Contacto', route: 'contacto' }
  ];

  const WhatsAppIcon = () => (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.238 1.443 4.888 1.443 5.485 0 9.948-4.463 9.952-9.95.002-2.646-1.02-5.132-2.88-6.995-1.859-1.863-4.341-2.887-6.986-2.888-5.49 0-9.957 4.464-9.961 9.95-.001 2.015.525 3.987 1.524 5.722L1.816 22.2l4.831-1.266zm12.304-4.801c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.384.247-.712.083-.328-.164-1.385-.511-2.637-1.628-.974-.869-1.63-1.944-1.821-2.272-.192-.328-.02-.505.144-.669.148-.148.328-.384.493-.575.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-.997-2.42-.266-.606-.525-.525-.738-.525-.192 0-.411-.014-.63-.014-.219 0-.575.082-.876.411-.3.329-1.15 1.123-1.15 2.739 0 1.616 1.177 3.177 1.341 3.397.164.22 2.316 3.537 5.611 4.961.784.339 1.396.541 1.873.692.788.251 1.505.216 2.072.131.63-.095 1.942-.795 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.63-.383z" />
    </svg>
  );

  if (opacity === 0 && !mobileMenuOpen) {
    return null;
  }

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-[#061A33]/85 backdrop-blur-md py-4"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? 'auto' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO INSTITUCIONAL COMPUESTO */}
        <div className="flex items-center gap-3 select-none">
          <img 
            src={logoOficial} 
            alt="Logo oficial Legaliza Tu Agua" 
            className="h-10 w-auto object-contain shrink-0" 
          />
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col text-left leading-[1.05] font-editorial text-[13px] font-semibold tracking-wider text-white uppercase shrink-0">
              <span>Legaliza</span>
              <span className="text-white/90">Tu Agua</span>
            </div>
            <div className="h-7 w-[1px] bg-white/20" />
            <div className="flex flex-col text-left leading-[1.15] font-sans text-[7.5px] tracking-[0.14em] text-white/60 font-light uppercase shrink-0">
              <span>Derecho de Aguas</span>
              <span>y Gestión Hídrica</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.route}
              href={`#${link.route}`}
              onClick={(e) => {
                e.preventDefault();
                if (setRoute) setRoute(link.route);
              }}
              className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors relative py-1 hover:text-white ${activeRoute === link.route ? 'text-white' : 'text-white/60'}`}
            >
              {link.label}
              {activeRoute === link.route && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00A6D6] animate-fade-in"></span>
              )}
            </a>
          ))}
          
          <div className="h-4 w-[1px] bg-[#00A6D6]/30 ml-2" />
          
          <a
            href="https://www.rumbolegal.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wider text-[#00A6D6] hover:text-[#00c8ff] transition-colors duration-300 ml-2"
          >
            RUMBO LEGAL
            <span className="text-[14px] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform duration-300">↗</span>
          </a>
        </nav>

        {/* WhatsApp Consultation Action Button */}
        <div className="hidden md:flex items-center">
          <a 
            href="https://wa.me/56912345678" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/25 hover:border-white/50 text-white px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-all hover:bg-white/5"
          >
            <WhatsAppIcon /> Consulta por WhatsApp
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white hover:text-[#00A6D6] focus:outline-none"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-[#061A33]/98 backdrop-blur-lg z-40 border-t border-white/5 flex flex-col p-8 gap-6 animate-fade-in"
        >
          {navLinks.map((link) => (
            <a
              key={link.route}
              href={`#${link.route}`}
              onClick={(e) => {
                e.preventDefault();
                if (setRoute) setRoute(link.route);
                setMobileMenuOpen(false);
              }}
              className={`text-sm font-semibold uppercase tracking-[0.2em] border-b border-white/5 pb-3 transition-colors ${activeRoute === link.route ? 'text-[#00A6D6]' : 'text-white/70 hover:text-white'}`}
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="https://www.rumbolegal.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-[#00A6D6] border-b border-[#00A6D6]/20 pb-3 transition-colors hover:text-[#00c8ff]"
          >
            <span>RUMBO LEGAL</span>
            <span className="text-lg group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform duration-300">↗</span>
          </a>
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center border border-white/20 hover:border-white/40 py-3 rounded-xl text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-auto hover:bg-white/5 transition-colors"
          >
            <WhatsAppIcon /> WhatsApp Directo
          </a>
        </div>
      )}
    </header>
  );
}
