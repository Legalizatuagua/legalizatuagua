import React, { useEffect, useState } from 'react';
import { WHATSAPP_URL } from '../utils/whatsapp';
import logoOficial from '../assets/logo_oficial.png';
import fondoSubmarino from '../assets/fondo-submarino.jpg';
import rodrigoBulnes from '../assets/rodrigo-bulnes.jpg';
import AnimatedBorders from '../components/AnimatedBorders';

export default function PalabrasFundador() {
  const [contentEntered, setContentEntered] = useState(false);

  useEffect(() => {
    document.title = "Palabras del Fundador - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const enterTimer = setTimeout(() => setContentEntered(true), 100);
    return () => clearTimeout(enterTimer);
  }, []);

  return (
    <div className="bg-[#020A14] min-h-screen text-white overflow-x-hidden font-sans relative selection:bg-[#00A6D6]/30 selection:text-white">
      
      {/* Background with Submarine Image */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: contentEntered ? 1 : 0 }}
      >
        <img 
          src={fondoSubmarino} 
          alt="Fondo Submarino" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity animate-slow-pan"
        />
        {/* Overlay (75% blue petroleum for better readability) */}
        <div className="absolute inset-0 bg-[#020A14]/75 mix-blend-multiply"></div>
        {/* Gradient for fading top/bottom if needed, though mostly relying on overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020A14]/40 via-transparent to-[#020A14]/80"></div>
      </div>

      <AnimatedBorders />



      {/* PAGE CONTENT */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-12 pb-24 pt-[110px] lg:pt-[120px]">
        
        {/* TITLE SECTION */}
        <div 
          className="flex flex-col items-center justify-center text-center mb-8 lg:mb-12"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease-out 300ms, transform 800ms ease-out 300ms'
          }}
        >
          <span className="text-white/60 text-[9px] lg:text-[11px] tracking-[0.3em] font-medium uppercase mb-3 lg:mb-4">
            NOSOTROS
          </span>
          <h1 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-4 lg:mb-6">
            PALABRAS DEL <span className="text-[#00A6D6]">FUNDADOR</span>
          </h1>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00A6D6]">
            <path d="M6 0C6 0 0 5.6 0 10C0 13.3137 2.68629 16 6 16C9.31371 16 12 13.3137 12 10C12 5.6 6 0 6 0ZM6 14.5C3.51472 14.5 1.5 12.4853 1.5 10C1.5 6.75 6 1.95 6 1.95C6 1.95 10.5 6.75 10.5 10C10.5 12.4853 8.48528 14.5 6 14.5Z" fill="currentColor"/>
          </svg>
        </div>

        {/* MAIN CARD */}
        <div 
          className="max-w-[1100px] mx-auto bg-[#020A14]/40 backdrop-blur-[24px] border border-white/10 rounded-[24px] lg:rounded-[40px] p-6 lg:p-12 xl:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease-out 500ms, transform 800ms ease-out 500ms'
          }}
        >
          <div className="flex flex-col-reverse lg:flex-row-reverse gap-10 lg:gap-16">
            {/* Right: Photo */}
            <div className="w-full lg:w-[40%] shrink-0 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[360px] lg:max-w-none lg:w-full rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] self-stretch">
                <div className="absolute inset-0 bg-[#00A6D6]/5 mix-blend-overlay z-10 transition-opacity duration-700 hover:opacity-0 pointer-events-none"></div>
                <img 
                  src={rodrigoBulnes} 
                  alt="Rodrigo Bulnes Ríos - Fundador" 
                  className="w-full h-full object-cover transform transition-transform duration-1000 ease-out hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Left: Text Content */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center">
              {/* QUOTE */}
              <div className="mb-6 lg:mb-8 relative pl-6 lg:pl-10">
                <div className="absolute top-0 left-0 text-[#00A6D6] opacity-60">
                  <svg width="32" height="32" className="lg:w-[40px] lg:h-[40px]" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <h2 className="font-dm-sans text-white text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[26px] leading-[1.4] font-normal relative z-10 pt-2 lg:pt-3 text-justify">
                  El agua es la base del desarrollo. Entregar seguridad jurídica sobre ella es nuestra forma de aportar al crecimiento sostenible del país y a la tranquilidad de las personas.
                </h2>
              </div>

              {/* TEXT PARAGRAPHS */}
              <div className="prose prose-invert prose-base lg:prose-lg max-w-none font-sans font-light text-white/70 text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.7] lg:leading-[1.8] text-justify space-y-4 mb-8">
                <p>
                  Durante más de 15 años he tenido la oportunidad de recorrer distintos valles y conversar con quienes hacen del agua su principal herramienta de vida, desarrollo y progreso. He visto de primera mano cómo la certeza jurídica sobre este recurso transforma la incertidumbre en tranquilidad, y cómo la falta de ésta puede paralizar proyectos de toda una vida.
                </p>
                <p>
                  En LegalizaTuAgua, no solo vemos expedientes o procesos administrativos. Vemos familias, vemos campos, vemos comunidades que necesitan respuestas claras y acciones precisas. Nuestro compromiso nace de esa realidad palpable: entender que detrás de cada solicitud de regularización, detrás de cada derecho de aprovechamiento, hay una historia de esfuerzo que merece ser protegida.
                </p>
                <p>
                  Hoy nos enfrentamos a desafíos hídricos cada vez más complejos. El marco regulatorio cambia y la necesidad de una gestión eficiente se vuelve imperativa. Por eso, hemos conformado un equipo que combina el rigor técnico con la experiencia práctica y, por sobre todo, con un trato cercano y transparente.
                </p>
                <p>
                  Te invito a conversar, a que nos cuentes tu situación y descubramos juntos cuál es el mejor camino legal para proteger tu recurso. En LegalizaTuAgua, estamos listos para acompañarte en cada paso del proceso.
                </p>
              </div>

              {/* SIGNATURE */}
              <div className="flex flex-col mt-auto pt-2">
                <span className="font-signature text-[#00A6D6] text-4xl lg:text-[44px] tracking-wide mb-2 lg:mb-3 leading-none">
                  Rodrigo Bulnes Ríos
                </span>
                <span className="font-sans text-white/50 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase font-medium">
                  FUNDADOR Y DIRECTOR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CALL TO ACTION */}
        <div 
          className="mt-12 lg:mt-16 flex justify-center"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease-out 700ms, transform 800ms ease-out 700ms'
          }}
        >
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 bg-[#00A6D6] text-[#020A14] px-8 py-4 rounded-full text-[12px] lg:text-[13px] tracking-[0.15em] font-medium uppercase hover:bg-[#00B8ED] transition-all duration-300 shadow-[0_4px_15px_rgba(0,166,214,0.4)] hover:shadow-[0_8px_25px_rgba(0,166,214,0.5)] transform hover:-translate-y-1"
          >
            Conversemos sobre tu proyecto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
