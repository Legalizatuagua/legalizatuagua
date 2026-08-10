import { useEffect, useState } from 'react';
import { WHATSAPP_URL } from '../utils/whatsapp';
import AnimatedBorders from '../components/AnimatedBorders';
import { getSiteConfig } from '../data/cmsStore';
import waterDark from '../assets/water_dark.jpg';

export default function Contacto() {
  const [contentEntered, setContentEntered] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [siteConfig, setSiteConfig] = useState(getSiteConfig);

  useEffect(() => {
    document.title = "Contacto - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleUpdate = () => {
      setSiteConfig(getSiteConfig());
    };
    window.addEventListener('cms-store-updated', handleUpdate);
    
    const enterTimer = setTimeout(() => setContentEntered(true), 100);
    return () => {
      clearTimeout(enterTimer);
      window.removeEventListener('cms-store-updated', handleUpdate);
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="bg-[#041014] min-h-screen text-white overflow-x-hidden font-sans relative selection:bg-[#00A6D6]/30 selection:text-white">
      
      {/* Backgrounds */}
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
      
      <AnimatedBorders />



      <div className="relative z-20 w-full px-6 lg:px-24 pb-16 pt-[110px] lg:pt-[120px]">
        <div className="max-w-5xl mx-auto">
          
          {/* HERO */}
          <div 
            className="text-center mb-8 lg:mb-12"
            style={{
              opacity: contentEntered ? 1 : 0,
              transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 800ms ease-out 300ms'
            }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] lg:text-[10px] tracking-[0.25em] uppercase text-white/60 mb-4 lg:mb-6 shadow-[0_0_15px_rgba(255,255,255,0.03)] font-medium">
              CONTACTO
            </span>
            <h1 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-4 lg:mb-6">
              ESTAMOS AQUÍ PARA <span className="text-[#00A6D6]">AYUDARTE</span>
            </h1>
            <p className="font-sans text-white/70 text-[14px] lg:text-[16px] leading-[1.8] font-light max-w-2xl mx-auto text-justify hyphens-auto">
              Si necesitas orientación jurídica, deseas regularizar derechos de agua o tienes consultas sobre un proyecto, estaremos encantados de conversar contigo.
            </p>
          </div>

          {!formSubmitted ? (
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-12"
              style={{
                opacity: contentEntered ? 1 : 0,
                transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 800ms ease-out 400ms'
              }}
            >
              {/* LEFT COLUMN: CONTACT INFO */}
              <div className="lg:col-span-2 flex flex-col gap-10">
                <div className="bg-gradient-to-br from-[#020A14]/80 to-[#041A25]/80 backdrop-blur-[16px] border border-white/5 rounded-[24px] p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col gap-8 h-full">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#00A6D6]/5 to-transparent pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col gap-2">
                    <h4 className="text-[#00A6D6] text-[10px] tracking-[0.15em] uppercase font-medium">Correo electrónico</h4>
                    <a href={`mailto:${siteConfig.contactEmail || 'contacto@legalizatuagua.cl'}`} className="text-[#FFFAF0] text-[15px] lg:text-[16px] font-light hover:text-[#00A6D6] transition-colors break-all">
                      {siteConfig.contactEmail || 'contacto@legalizatuagua.cl'}
                    </a>
                  </div>
                  
                  <div className="relative z-10 flex flex-col gap-2">
                    <h4 className="text-[#00A6D6] text-[10px] tracking-[0.15em] uppercase font-medium">Teléfono</h4>
                    <a href={`tel:${siteConfig.contactPhone || '+56994112293'}`} className="text-[#FFFAF0] text-[15px] lg:text-[16px] font-light hover:text-[#00A6D6] transition-colors">
                      {siteConfig.contactPhone || '+56 9 9411 2293'}
                    </a>
                  </div>
                  
                  <div className="relative z-10 flex flex-col gap-2">
                    <h4 className="text-[#00A6D6] text-[10px] tracking-[0.15em] uppercase font-medium">Ubicación</h4>
                    <p className="text-[#FFFAF0] text-[15px] lg:text-[16px] font-light">
                      {siteConfig.address || 'Viña del Mar, Chile'}
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex flex-col gap-2">
                    <h4 className="text-[#00A6D6] text-[10px] tracking-[0.15em] uppercase font-medium">Horario de atención</h4>
                    <p className="text-[#FFFAF0] text-[15px] lg:text-[16px] font-light">
                      {siteConfig.schedule || 'Lunes a viernes 09:00 a 18:00 hrs'}
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-white/5 relative z-10 my-2"></div>
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <h4 className="text-[#00A6D6] text-[10px] tracking-[0.15em] uppercase font-medium">Redes sociales</h4>
                    <div className="flex gap-4">
                      <a href={siteConfig.facebook || "https://www.facebook.com/share/1BYuMrHNSX/"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#00A6D6]/20 hover:border-[#00A6D6] hover:text-[#00A6D6] transition-all text-white/80">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                      <a href={siteConfig.instagram || "https://www.instagram.com/legalizatuagua.cl?igsh=MWh4NnRzdmwzN3RpOQ=="} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#00A6D6]/20 hover:border-[#00A6D6] hover:text-[#00A6D6] transition-all text-white/80">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href={`mailto:${siteConfig.contactEmail || 'contacto@legalizatuagua.cl'}`} className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#00A6D6]/20 hover:border-[#00A6D6] hover:text-[#00A6D6] transition-all text-white/80">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      </a>
                      <a href="https://cl.linkedin.com/in/rodrigo-bulnes-r%C3%ADos-abogado-derecho-aguas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-[#00A6D6]/20 hover:border-[#00A6D6] hover:text-[#00A6D6] transition-all text-white/80">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>


              {/* RIGHT COLUMN: FORM */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#020A14]/80 to-[#041A25]/80 backdrop-blur-[16px] border border-white/5 rounded-[24px] p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col gap-6 h-full">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#00A6D6]/5 to-transparent pointer-events-none"></div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Nombre completo</label>
                      <input type="text" required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="Ej. Juan Pérez" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Teléfono</label>
                      <input type="tel" required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="+56 9 1234 5678" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-10">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Correo electrónico</label>
                    <input type="email" required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="correo@ejemplo.com" />
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-10">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Asunto</label>
                    <input type="text" required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="Ej. Consulta por regularización" />
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-10 flex-grow">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Mensaje</label>
                    <textarea required rows="5" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors resize-none h-full" placeholder="Cuéntanos más sobre lo que necesitas..."></textarea>
                  </div>

                  <div className="pt-2 relative z-10">
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#00A6D6] text-[#020A14] px-8 py-3.5 rounded-full text-[11px] lg:text-[12px] tracking-[0.15em] uppercase font-medium hover:bg-[#00B8ED] transition-all duration-300 shadow-[0_4px_15px_rgba(0,166,214,0.4)] hover:shadow-[0_8px_25px_rgba(0,166,214,0.5)]">
                      Enviar consulta
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#020A14]/90 to-[#041A25]/90 backdrop-blur-[24px] border border-[#00A6D6]/30 rounded-[32px] p-12 text-center shadow-[0_20px_50px_rgba(0,166,214,0.15)] flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#00A6D6]/10 flex items-center justify-center mb-6 border border-[#00A6D6]/30 shadow-[0_0_20px_rgba(0,166,214,0.3)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A6D6" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="font-dm-sans text-[#FFFAF0] text-[24px] lg:text-[32px] font-medium mb-4">¡Mensaje enviado!</h3>
              <p className="font-sans text-white/70 text-[14px] lg:text-[16px] leading-[1.6] font-light text-justify hyphens-auto">
                Hemos recibido tu consulta correctamente. Nuestro equipo revisará la información y te contactaremos a la brevedad.
              </p>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
}
