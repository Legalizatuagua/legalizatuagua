import React, { useState } from 'react';
import logoOficial from '../assets/logo_oficial.png';
import { WHATSAPP_URL } from '../utils/whatsapp';

export default function SiteHeader({ currentRoute = '' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full z-50 px-6 lg:px-24 py-4 lg:py-6 flex justify-between items-center bg-[#020A14] border-b border-white/10 shadow-lg"
      >
        <a href="#portada" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={logoOficial} alt="Legaliza Tu Agua" className="h-8 lg:h-10 w-auto object-contain" />
          <div className="flex flex-col text-white font-editorial leading-[1.1] tracking-[0.15em] text-[12px] lg:text-[14px]">
            <span>LEGALIZATUAGUA</span>
          </div>
          <div className="h-6 w-[1px] bg-white/20 mx-1 lg:mx-2"></div>
          <div className="flex flex-col text-white/60 font-sans tracking-[0.2em] text-[6px] lg:text-[7px] leading-tight uppercase mt-0.5">
            <span>DERECHO DE AGUAS</span>
            <span>Y GESTIÓN HÍDRICA</span>
          </div>
        </a>
        
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#inicio" className="text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors">INICIO</a>
          <a href="#nosotros" className="text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors">NOSOTROS</a>
          
          <a href="#/servicios" className={currentRoute === 'servicios' ? "text-white text-[11px] font-sans tracking-[0.15em] transition-colors relative" : "text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors"}>
            SERVICIOS
            {currentRoute === 'servicios' && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00A6D6]"></span>}
          </a>
          
          <a href="#casos" className="text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors">CASOS DE ÉXITO</a>
          
          <a href="#/biblioteca" className={currentRoute === 'biblioteca' ? "text-white text-[11px] font-sans tracking-[0.15em] transition-colors relative" : "text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors"}>
            BIBLIOTECA JURÍDICA
            {currentRoute === 'biblioteca' && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00A6D6]"></span>}
          </a>
          
          <a href="#/contacto" className={currentRoute === 'contacto' ? "text-white text-[11px] font-sans tracking-[0.15em] transition-colors relative" : "text-white/80 text-[11px] font-sans tracking-[0.15em] hover:text-[#00A6D6] transition-colors"}>
            CONTACTO
            {currentRoute === 'contacto' && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#00A6D6]"></span>}
          </a>
        </nav>
        
        <div className="hidden lg:block">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-transparent border border-white/30 text-white/80 px-5 py-2 rounded-full text-[9px] tracking-[0.15em] hover:bg-white/10 transition-colors duration-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            CONSULTA POR WHATSAPP
          </a>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }} 
          className="lg:hidden text-white p-2 focus:outline-none relative z-[80] cursor-pointer" 
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          )}
        </button>
      </header>

      {/* Backdrop for outside click */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
          onTouchStart={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Dropdown Menu (Single Unified Block) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-x-4 top-20 z-50 lg:hidden transition-all duration-300 animate-fade-in pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full bg-[#020A14] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col">
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-3.5 px-3 font-sans text-[15px] tracking-[0.12em] text-white/90 hover:text-[#00A6D6] transition-colors border-b border-white/10"
            >
              Inicio
            </a>

            <a 
              href="#nosotros" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-3.5 px-3 font-sans text-[15px] tracking-[0.12em] text-white/90 hover:text-[#00A6D6] transition-colors border-b border-white/10"
            >
              Nosotros
            </a>

            <a 
              href="#/servicios" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`py-3.5 px-3 font-sans text-[15px] tracking-[0.12em] transition-colors border-b border-white/10 ${currentRoute === 'servicios' ? 'text-[#00A6D6]' : 'text-white/90 hover:text-[#00A6D6]'}`}
            >
              Servicios
            </a>

            <a 
              href="#/biblioteca" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`py-3.5 px-3 font-sans text-[15px] tracking-[0.12em] transition-colors border-b border-white/10 ${currentRoute === 'biblioteca' ? 'text-[#00A6D6]' : 'text-white/90 hover:text-[#00A6D6]'}`}
            >
              Biblioteca jurídica
            </a>

            <a 
              href="#/contacto" 
              onClick={() => setMobileMenuOpen(false)} 
              className={`py-3.5 px-3 font-sans text-[15px] tracking-[0.12em] transition-colors ${currentRoute === 'contacto' ? 'text-[#00A6D6]' : 'text-white/90 hover:text-[#00A6D6]'}`}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </>
  );
}
