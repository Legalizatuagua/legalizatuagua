import React, { useState, useEffect } from 'react';
import logoOficial from '../assets/logo_oficial.png';
import { getSiteConfig } from '../data/cmsStore';

export default function Footer() {
  const [config, setConfig] = useState(getSiteConfig);

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(getSiteConfig());
    };
    window.addEventListener('cms-store-updated', handleUpdate);
    return () => window.removeEventListener('cms-store-updated', handleUpdate);
  }, []);

  const cleanPhone = (config.whatsapp || '56994112293').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <footer className="w-full relative z-40 bg-[#020A14] overflow-hidden border-t border-white/5 pt-4 lg:pt-6 pb-2 selection:bg-[#00A6D6]/30 selection:text-white mt-auto">
      {/* Backgrounds (Global styling) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-screen bg-center bg-cover bg-no-repeat transition-opacity duration-1000" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundSize: '120px 120px' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#041014_0%,_#020A14_100%)] opacity-95 pointer-events-none"></div>

      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-12 relative z-20">
        
        {/* 5 COLUMNS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-6 gap-x-6 mb-4 w-full">
          
          {/* COL 1: LOGO & DESCRIPTION */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 lg:pr-4">
            <a href="#inicio" onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex items-center gap-2.5 select-none hover:opacity-80 transition-opacity w-max">
              <img src={logoOficial} alt="Legaliza Tu Agua" className="h-7 lg:h-8 w-auto object-contain shrink-0 transform -translate-x-1.5" />
              <div className="flex flex-col text-left leading-[1.05] font-editorial text-[14px] font-semibold tracking-wider text-white uppercase shrink-0 transform -translate-x-1.5">
                <span>{config.siteName ? config.siteName.replace(/\s+/g, '').toUpperCase() : 'LEGALIZATUAGUA'}</span>
              </div>
            </a>
            <p className="font-sans text-white/60 text-[11px] leading-[1.4] font-light">
              {config.siteDescription || 'Especialistas en la protección y gestión estratégica de los derechos de agua.'}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href={config.instagram || "https://www.instagram.com/legalizatuagua.cl?igsh=MWh4NnRzdmwzN3RpOQ=="} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00A6D6] hover:drop-shadow-[0_0_8px_rgba(0,166,214,0.5)] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={config.facebook || "https://www.facebook.com/share/1BYuMrHNSX/"} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00A6D6] hover:drop-shadow-[0_0_8px_rgba(0,166,214,0.5)] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href={`mailto:${config.contactEmail || 'contacto@legalizatuagua.cl'}`} className="text-white/40 hover:text-[#00A6D6] hover:drop-shadow-[0_0_8px_rgba(0,166,214,0.5)] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00A6D6] hover:drop-shadow-[0_0_8px_rgba(0,166,214,0.5)] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a href="https://cl.linkedin.com/in/rodrigo-bulnes-r%C3%ADos-abogado-derecho-aguas" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00A6D6] hover:drop-shadow-[0_0_8px_rgba(0,166,214,0.5)] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* COL 2: NAVEGACIÓN */}
          <div className="col-span-1 flex flex-col gap-2">
            <h4 className="font-sans text-[#00A6D6] text-[9px] tracking-[0.2em] uppercase font-medium">Navegación</h4>
            <ul className="flex flex-col gap-1 font-sans text-white/70 text-[11px] font-light">
              <li><a href="#inicio" onClick={(e) => { if(!window.location.hash.startsWith('#/')) { e.preventDefault(); window.location.hash='#inicio'; document.getElementById('inicio-content')?.scrollIntoView({behavior:'smooth'}); } }} className="hover:text-white hover:translate-x-1 inline-block transition-all">Inicio</a></li>
              <li><a href="#nosotros" onClick={(e) => { if(!window.location.hash.startsWith('#/')) { e.preventDefault(); window.location.hash='#nosotros'; document.getElementById('nosotros')?.scrollIntoView({behavior:'smooth'}); } }} className="hover:text-white hover:translate-x-1 inline-block transition-all">Nosotros</a></li>
              <li><a href="#/servicios" className="hover:text-white hover:translate-x-1 inline-block transition-all">Servicios</a></li>
              <li><a href="#casos" onClick={(e) => { if(!window.location.hash.startsWith('#/')) { e.preventDefault(); window.location.hash='#casos'; document.getElementById('casos')?.scrollIntoView({behavior:'smooth'}); } }} className="hover:text-white hover:translate-x-1 inline-block transition-all">Casos de Éxito</a></li>
              <li><a href="#/biblioteca" className="hover:text-white hover:translate-x-1 inline-block transition-all">Biblioteca Jurídica</a></li>
              <li><a href="#/equipo" className="hover:text-white hover:translate-x-1 inline-block transition-all">Equipo</a></li>
              <li><a href="#/contacto" className="hover:text-white hover:translate-x-1 inline-block transition-all">Contacto</a></li>
            </ul>
          </div>

          {/* COL 3: SERVICIOS */}
          <div className="col-span-1 flex flex-col gap-2">
            <h4 className="font-sans text-[#00A6D6] text-[9px] tracking-[0.2em] uppercase font-medium">Servicios</h4>
            <ul className="flex flex-col gap-1 font-sans text-white/70 text-[11px] font-light">
              <li><a href="#/servicios" className="hover:text-white hover:translate-x-1 inline-block transition-all">Regularización de derechos</a></li>
              <li><a href="#/servicios" className="hover:text-white hover:translate-x-1 inline-block transition-all">Constitución de derechos</a></li>
              <li><a href="#/servicios" className="hover:text-white hover:translate-x-1 inline-block transition-all">Asesoría legal</a></li>
              <li><a href="#/servicios" className="hover:text-white hover:translate-x-1 inline-block transition-all">Gestión hídrica</a></li>
              <li><a href="#/servicios" className="hover:text-white hover:translate-x-1 inline-block transition-all">Estudios y diagnóstico</a></li>
            </ul>
          </div>

          {/* COL 4: CONTACTO */}
          <div className="col-span-1 flex flex-col gap-2">
            <h4 className="font-sans text-[#00A6D6] text-[9px] tracking-[0.2em] uppercase font-medium">Contacto</h4>
            <ul className="flex flex-col gap-1 font-sans text-white/70 text-[11px] font-light">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 text-[#00A6D6] shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href={`tel:${config.contactPhone || '+56994112293'}`} className="hover:text-white transition-colors">
                  {config.contactPhone || '+56 9 9411 2293'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 text-[#00A6D6] shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href={`mailto:${config.contactEmail || 'contacto@legalizatuagua.cl'}`} className="hover:text-white transition-colors break-all">
                  {config.contactEmail || 'contacto@legalizatuagua.cl'}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 text-[#00A6D6] shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{config.address || 'Viña del Mar, Chile'}</span>
              </li>
            </ul>
          </div>

          {/* COL 5: PROYECTOS RELACIONADOS */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-2">
            <h4 className="font-sans text-[#00A6D6] text-[9px] tracking-[0.2em] uppercase font-medium">Proyectos Relacionados</h4>
            <a
              href="https://www.rumbolegal.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1.5 p-3 rounded-xl bg-[#041014]/50 border border-[#00A6D6]/20 hover:-translate-y-1 hover:border-[#00A6D6]/50 transition-all duration-300 w-fit lg:w-full"
            >
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A6D6]">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                  <path d="M7 21h10"/>
                  <path d="M12 3v18"/>
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                </svg>
                <span className="font-sans text-[13px] font-semibold text-white tracking-wide">Rumbo Legal</span>
              </div>
              <p className="font-sans text-white/60 text-[10px] font-light leading-snug">
                Contenido y orientación jurídica.
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-sans text-[10px] font-medium text-[#00A6D6] group-hover:text-[#00c8ff] transition-colors uppercase tracking-wider">
                  Visitar Rumbo Legal
                </span>
                <span className="text-[#00A6D6] group-hover:text-[#00c8ff] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-all duration-300 text-sm">
                  ↗
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="w-full h-[1px] bg-white/10 mb-3"></div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left font-sans text-white/40 text-[9px] lg:text-[10px] font-light">
          <p>© {new Date().getFullYear()} {config.siteName || 'LegalizaTuAgua'}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#/politica-de-privacidad" className="hover:text-[#00A6D6] transition-colors">Política de Privacidad</a>
            <a href="#/terminos-y-condiciones" className="hover:text-[#00A6D6] transition-colors">Términos y Condiciones</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
