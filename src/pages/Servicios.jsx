import React, { useEffect, useState } from 'react';
import AnimatedBorders from '../components/AnimatedBorders';
import waterDark from '../assets/water_dark.jpg';
import { getPublishedItems, getSiteConfig } from '../data/cmsStore';

const SERVICE_ICONS = [
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M7 20h10"/><path d="M10 20c5.5-1.25 6-4.75 6-8a4 4 0 0 0-4-4 4 4 0 0 0-4 4v8"/><path d="M12 12A4 4 0 0 1 8 8 4 4 0 0 1 4 12v2a2 2 0 0 0 2 2h2"/><path d="M12 20v-8"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M9 18h6"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 22h16"/><path d="M4 18V10"/><path d="M8 18V10"/><path d="M12 18V10"/><path d="M16 18V10"/><path d="M20 18V10"/><path d="M22 10H2l10-7 10 7z"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
];

export default function Servicios() {
  const [contentEntered, setContentEntered] = useState(false);
  const [services, setServices] = useState(() => getPublishedItems('servicios'));
  const [siteConfig, setSiteConfig] = useState(getSiteConfig);

  useEffect(() => {
    document.title = "Servicios - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });

    const refreshData = () => {
      setServices(getPublishedItems('servicios'));
      setSiteConfig(getSiteConfig());
    };

    refreshData();
    window.addEventListener('cms-store-updated', refreshData);

    const timer = setTimeout(() => {
      setContentEntered(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('cms-store-updated', refreshData);
    };
  }, []);

  const cleanPhone = (siteConfig.whatsapp || '56994112293').replace(/[^0-9]/g, '');

  return (
    <div className="bg-[#041014] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#00A6D6]/30 selection:text-white pt-[110px] lg:pt-[120px] pb-24">
      {/* Background Elements */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #061A23 0%, #041014 60%, #02070A 100%)',
          opacity: contentEntered ? 1 : 0
        }}
      />
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay transition-opacity duration-1000 delay-300"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
          backgroundSize: '120px 120px',
        }}
      />
      <AnimatedBorders />

      {/* Water texture background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: contentEntered ? 0.3 : 0 }}
      >
        <img 
          src={waterDark} 
          alt="" 
          className="w-full h-full object-cover opacity-60 animate-slow-pan mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-[#041014]/60 mix-blend-multiply"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full px-4 sm:px-8 lg:px-12 pt-0 lg:pt-8">
        <div 
          className="transition-all duration-1000 ease-out transform"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)'
          }}
        >

          <div className="relative z-10 w-full max-w-[1300px] mx-auto pt-4 pb-8 lg:py-10">
            
            {/* ENCABEZADO */}
            <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-12 lg:mb-16">
              <h3 className="text-[#00A6D6] text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium mb-6">
                SERVICIOS
              </h3>
              <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide mb-8 uppercase">
                Asesoría jurídica especializada para proteger tus <span className="text-[#00A6D6]">derechos de agua</span>
              </h2>
              <p className="font-sans text-white/70 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] font-light text-justify">
                En LegalizaTuAgua ofrecemos asesoría jurídica especializada en Derecho de Aguas y Gestión Hídrica, acompañando a nuestros clientes desde el análisis inicial hasta la ejecución de cada procedimiento, con compromiso, experiencia y cercanía.
              </p>
            </div>

            {/* SERVICIOS (Grid) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              
              {services.map((srv, i) => {
                const iconIndex = i % SERVICE_ICONS.length;
                const messageText = srv.msg || `Hola. Me interesa contratar el servicio de ${srv.title}. Me gustaría recibir orientación sobre mi caso.`;
                const numberDisplay = srv.order || (i + 1);

                return (
                  <div key={srv.slug || srv.id || i} className="bg-[#020A14]/60 backdrop-blur-[16px] border border-[#00A6D6]/20 rounded-[12px] lg:rounded-[16px] p-5 lg:p-6 flex flex-col items-center text-center shadow-[0_4px_24px_0_rgba(0,166,214,0.05)] relative overflow-hidden group hover:border-[#00A6D6]/40 hover:bg-[#020A14]/80 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="text-[#00A6D6] mb-3 transform group-hover:scale-110 transition-transform duration-500 w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]">
                      {SERVICE_ICONS[iconIndex]}
                    </div>
                    <h5 className="text-[#FFFAF0]/90 font-dm-sans text-[14px] lg:text-[15px] leading-[1.3] font-medium mb-2 min-h-[40px] flex items-center justify-center">
                      {numberDisplay}. {srv.title}
                    </h5>
                    <p className="text-white/60 font-sans text-[11px] lg:text-[12px] leading-[1.6] font-light mb-5 flex-1 text-justify hyphens-auto">
                      {srv.desc || srv.content}
                    </p>
                    <div className="mt-auto w-full">
                      <a 
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex w-full items-center justify-center gap-1.5 bg-transparent border border-[#00A6D6]/40 text-white/90 px-3 py-2 rounded-full text-[10px] lg:text-[10px] tracking-[0.02em] hover:bg-white/10 hover:border-[#00A6D6]/60 transition-colors duration-300 whitespace-nowrap"
                      >
                        Contratar este servicio <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* CALL TO ACTION CARD */}
              <div className="bg-gradient-to-br from-[#020A14]/70 to-[#041A25]/70 backdrop-blur-[16px] border border-[#00A6D6]/40 rounded-[12px] lg:rounded-[16px] p-5 lg:p-6 flex flex-col items-center text-center shadow-[0_4px_24px_0_rgba(0,166,214,0.15)] relative overflow-hidden group col-span-1 hover:from-[#020A14]/80 hover:to-[#041A25]/80 transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00A6D6]/10 to-transparent pointer-events-none"></div>
                <div className="text-[#00A6D6] mb-3 opacity-80 transform group-hover:scale-110 transition-transform duration-500 w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>
                </div>
                <h5 className="text-[#00A6D6] font-dm-sans text-[15px] lg:text-[17px] leading-[1.3] font-medium mb-2 min-h-[40px] flex items-center justify-center">¿Necesitas asesoría?</h5>
                <p className="text-white/70 font-sans text-[11px] lg:text-[12px] leading-[1.6] font-light mb-5 flex-1 text-justify hyphens-auto">
                  Si tienes dudas sobre la situación de tus derechos de agua o necesitas apoyo en un procedimiento específico, contáctanos.
                </p>
                <div className="mt-auto w-full max-w-[240px] mx-auto">
                  <a href="#/asesoria" className="flex items-center justify-center gap-2 bg-[#00A6D6] text-white px-5 py-2.5 rounded-full text-[11px] tracking-[0.05em] font-medium hover:bg-[#00B8ED] transition-colors duration-300 w-full shadow-[0_4px_15px_rgba(0,166,214,0.4)] border border-transparent whitespace-nowrap">
                    Solicitar Asesoría <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
