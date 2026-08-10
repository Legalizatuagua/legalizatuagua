import React, { useEffect, useState, useRef } from 'react';
import { WHATSAPP_URL } from '../utils/whatsapp';
import logoOficial from '../assets/logo_oficial.png';
import landscapeClean from '../assets/landscape_clean_2.jpg';
import AnimatedBorders from '../components/AnimatedBorders';

export default function NuestraVision() {
  const [contentEntered, setContentEntered] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setContentEntered(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Timeline ScrollSpy
  const [activeStep, setActiveStep] = useState(-1);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (index > activeStep) {
              setActiveStep(index);
            }
          } else {
            const index = Number(entry.target.dataset.index);
            if (entry.boundingClientRect.top > 0 && index <= activeStep) {
              setActiveStep(index - 1);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
    );

    const steps = document.querySelectorAll('.timeline-step');
    steps.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeStep]);

  // Carousel Data
  const essenceCards = [
    {
      title: 'Misión',
      text: 'Protegemos y regularizamos derechos de agua mediante soluciones jurídicas especializadas que entregan seguridad y certeza a nuestros clientes.'
    },
    {
      title: 'Visión',
      text: 'Ser un referente nacional en Derecho de Aguas y Gestión Hídrica, promoviendo una administración responsable y sostenible del recurso.'
    },
    {
      title: 'Propósito',
      text: 'Contribuir al desarrollo de personas, comunidades y organizaciones, resguardando el acceso y la protección jurídica del recurso más importante para el futuro.'
    }
  ];

  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const handleNext = () => setCarouselIndex((prev) => (prev + 1) % 3);
  const handlePrev = () => setCarouselIndex((prev) => (prev - 1 + 3) % 3);

  const handleTouchStart = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchStartXRef.current = e.targetTouches[0].clientX;
      touchEndXRef.current = e.targetTouches[0].clientX;
    }
  };
  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchEndXRef.current = e.targetTouches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(distance) > 25) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Helper to determine card styles based on position relative to active index
  const getCardStyle = (index) => {
    const diff = (index - carouselIndex + 3) % 3;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (diff === 0) {
      // Center (Active)
      return {
        transform: `translateX(0) scale(${isMobile ? '0.88' : '1'}) translateZ(${isMobile ? '30px' : '50px'})`,
        opacity: 1,
        zIndex: 30,
        filter: 'none',
      };
    } else if (diff === 1) {
      // Right
      return {
        transform: `translateX(${isMobile ? '45%' : '80%'}) scale(${isMobile ? '0.65' : '0.85'}) translateZ(-50px) rotateY(-15deg)`,
        opacity: isMobile ? 0.8 : 0.4,
        zIndex: 20,
        filter: 'none',
        cursor: 'pointer'
      };
    } else {
      // Left
      return {
        transform: `translateX(${isMobile ? '-45%' : '-80%'}) scale(${isMobile ? '0.65' : '0.85'}) translateZ(-50px) rotateY(15deg)`,
        opacity: isMobile ? 0.8 : 0.4,
        zIndex: 20,
        filter: 'none',
        cursor: 'pointer'
      };
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#041014] relative overflow-x-hidden font-sans text-white selection:bg-[#00A6D6] selection:text-white">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 w-full h-full bg-[#020810]">
          <img
            src={landscapeClean}
            alt="Fondo de agua"
            className="w-full h-full object-cover object-[75%_50%] lg:object-center max-lg:contrast-[1.1] max-lg:saturate-[1.1] pointer-events-none select-none"
            style={{ opacity: 1 }}
          />
          {/* Overlay to ensure text readability but keep the landscape visible and not too dark */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to bottom, rgba(2, 10, 20, 0.4) 0%, rgba(2, 10, 20, 0.8) 100%)',
            }}
          />
        </div>
      </div>

      <AnimatedBorders />

      {/* PAGE CONTENT */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 pt-32 lg:pt-40 pb-20 pointer-events-auto">
        
        {/* HERO SECTION */}
        <div 
          className="flex flex-col items-center text-center max-w-[900px] mx-auto mb-10 lg:mb-16"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease-out 300ms, transform 800ms ease-out 300ms'
          }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6] shadow-[0_0_8px_#00A6D6]"></div>
            <span className="text-white/80 text-[9px] lg:text-[10px] tracking-[0.2em] font-medium uppercase">NUESTRA VISIÓN</span>
          </div>
          
          <h1 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-8 leading-[1.3]">
            <span className="block">Gestionamos hoy</span>
            <span className="block">el recurso más importante <span className="text-[#00A6D6]">del mañana</span></span>
          </h1>
          
          <div className="flex flex-col gap-6 text-white/70 text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] lg:leading-[1.8] font-light max-w-[700px] text-justify">
            <p>
              El agua es mucho más que un recurso natural. Es el elemento que sostiene a las personas, la agricultura, las comunidades y el desarrollo del país.
            </p>
            <p>
              En LegalizaTuAgua creemos que proteger los derechos de agua es proteger el futuro de quienes dependen de ellos. Por eso acompañamos a nuestros clientes con una mirada jurídica, técnica y estratégica, entregando soluciones que generan certeza y permiten planificar con seguridad.
            </p>
          </div>
        </div>

        <div 
          className="mb-16 flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-4 sm:gap-6"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease-out 500ms, transform 800ms ease-out 500ms'
          }}
        >
          {/* LEFT: INSPIRATIONAL IMAGE (QUOTE) */}
          <div className="w-full lg:w-[48%] flex flex-col items-center justify-start text-center p-4 sm:p-6 lg:p-8 pt-4 lg:pt-8">
            <h3 className="font-sans text-white/70 text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] lg:leading-[1.8] font-light italic px-2 lg:px-4 max-w-[320px] mx-auto">
              "Cada derecho protegido representa una oportunidad para el desarrollo de personas, comunidades y territorios."
            </h3>
          </div>

          {/* RIGHT: NUESTRO PROPÓSITO CARD */}
          <div className="w-full lg:w-[48%] flex flex-col justify-start items-center lg:items-start p-4 sm:p-6 lg:p-8 pt-4 lg:pt-8">
            <div className="mb-4 lg:mb-5 text-center lg:text-left w-full">
              <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase leading-[1.3]">
                NUESTRO <span className="text-[#00A6D6]">PROPÓSITO</span>
              </h2>
            </div>
            
            <div className="w-full">
              <p className="font-sans text-white/70 text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.6] sm:leading-[1.7] font-light text-justify hyphens-auto max-w-[400px] lg:max-w-none mx-auto">
                Creemos que la seguridad jurídica del agua es una herramienta para impulsar el desarrollo sostenible, fortalecer a las organizaciones de usuarios y entregar tranquilidad a quienes trabajan y viven gracias a este recurso.
              </p>
            </div>
          </div>
        </div>

        {/* NUESTRA ESENCIA (3D Carousel) */}
        <div 
          className="mb-24 lg:mb-32"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms ease-out 700ms, transform 800ms ease-out 700ms'
          }}
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-3">Nuestra esencia</h2>
            <p className="font-sans text-white/50 text-[12px] sm:text-[14px] uppercase tracking-[0.2em]">Misión, Visión y Propósito</p>
          </div>

          <div 
            className="relative w-full max-w-[1000px] mx-auto h-[350px] lg:h-[400px] flex items-center justify-center overflow-hidden" 
            style={{ perspective: '1500px' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            
            {/* Carousel Controls */}
            <button onClick={handlePrev} className="absolute left-0 z-40 bg-white/5 hover:bg-[#00A6D6]/20 p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors hidden sm:block">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <button onClick={handleNext} className="absolute right-0 z-40 bg-white/5 hover:bg-[#00A6D6]/20 p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors hidden sm:block">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {essenceCards.map((card, index) => (
              <div 
                key={index}
                className="absolute w-full max-w-[320px] lg:max-w-[400px] bg-gradient-to-br from-[#020A14]/90 to-[#041A25]/90 backdrop-blur-[24px] border border-[#00A6D6]/30 rounded-[32px] p-8 lg:p-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,166,214,0.15)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={getCardStyle(index)}
                onClick={() => {
                  const diff = (index - carouselIndex + 3) % 3;
                  if (diff === 1) handleNext();
                  if (diff === 2) handlePrev();
                }}
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#00A6D6]/10 flex items-center justify-center mb-6 border border-[#00A6D6]/20 shadow-[0_0_15px_rgba(0,166,214,0.3)]">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-[#00A6D6] rounded-full"></div>
                </div>
                <h3 className="font-dm-sans text-[#FFFAF0] text-2xl lg:text-3xl font-medium mb-6">{card.title}</h3>
                <p className="font-sans text-white/70 text-[13px] lg:text-[15px] leading-[1.7] font-light text-justify">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Carousel Indicators & Navigation */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {essenceCards.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCarouselIndex(i)}
                aria-label={`Ver tarjeta ${i + 1}`}
                className={`py-2 px-1 transition-all duration-300 cursor-pointer focus:outline-none`}
              >
                <div className={`h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? 'bg-[#00A6D6] w-7 shadow-[0_0_10px_rgba(0,166,214,0.6)]' : 'bg-white/30 hover:bg-white/60 w-2'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* TIMELINE (Cómo acompañamos cada proyecto) */}
        <div 
          className="mb-24 lg:mb-32"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 900ms'
          }}
        >
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="font-dm-sans text-white/90 text-2xl lg:text-3xl font-medium tracking-wide uppercase mb-3">CÓMO ACOMPAÑAMOS CADA PROYECTO</h2>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block relative max-w-[1100px] mx-auto px-10">
            {/* The Line */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0">
              {/* Animated Progress Line */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#00A6D6] transition-all duration-[3000ms] ease-out shadow-[0_0_15px_#00A6D6]" 
                style={{ width: `${(Math.max(0, activeStep) / 3) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-4 gap-8 relative z-10">
              {[
                { step: '1', title: 'Diagnóstico Jurídico', desc: 'Analizamos la situación legal para identificar oportunidades y riesgos.' },
                { step: '2', title: 'Estrategia y Planificación', desc: 'Diseñamos una estrategia jurídica y administrativa adaptada a cada proyecto.' },
                { step: '3', title: 'Gestión Administrativa o Judicial', desc: 'Representamos y gestionamos los procedimientos necesarios ante las instituciones competentes.' },
                { step: '4', title: 'Protección y Seguimiento', desc: 'Acompañamos cada proceso hasta asegurar la protección jurídica de los derechos de agua.' }
              ].map((item, i) => (
                <div key={i} className="timeline-step flex flex-col items-center text-center" data-index={i}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-editorial text-xl italic transition-all duration-[2000ms] ease-out mb-8 border ${activeStep >= i ? 'bg-[#00A6D6] text-white border-[#00A6D6] shadow-[0_0_20px_rgba(0,166,214,0.6)] scale-110' : 'bg-[#020A14] text-white/40 border-white/10 scale-100'}`}>
                    {item.step}
                  </div>
                  <h4 className={`font-dm-sans text-[18px] font-medium mb-3 transition-colors duration-[2000ms] ${activeStep >= i ? 'text-[#00A6D6]' : 'text-[#FFFAF0]'}`}>{item.title}</h4>
                  <p className={`font-sans text-[13px] leading-[1.6] font-light transition-opacity duration-[2000ms] text-justify ${activeStep >= i ? 'text-white/80' : 'text-white/40'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="lg:hidden relative px-4 ml-6">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-[26px] w-[1px] bg-white/10 z-0">
              <div 
                className="absolute top-0 left-0 w-full bg-[#00A6D6] transition-all duration-[3000ms] ease-out shadow-[0_0_15px_#00A6D6]" 
                style={{ height: `${(Math.max(0, activeStep + 1) / 4) * 100}%` }}
              ></div>
            </div>

            <div className="flex flex-col gap-12 relative z-10">
              {[
                { step: '1', title: 'Diagnóstico Jurídico', desc: 'Analizamos la situación legal para identificar oportunidades y riesgos.' },
                { step: '2', title: 'Estrategia y Planificación', desc: 'Diseñamos una estrategia jurídica y administrativa adaptada a cada proyecto.' },
                { step: '3', title: 'Gestión Administrativa o Judicial', desc: 'Representamos y gestionamos los procedimientos necesarios ante las instituciones competentes.' },
                { step: '4', title: 'Protección y Seguimiento', desc: 'Acompañamos cada proceso hasta asegurar la protección jurídica de los derechos de agua.' }
              ].map((item, i) => (
                <div key={i} className="timeline-step flex gap-6" data-index={i}>
                  <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-editorial text-xl italic transition-all duration-[2000ms] ease-out border mt-1 ${activeStep >= i ? 'bg-[#00A6D6] text-white border-[#00A6D6] shadow-[0_0_20px_rgba(0,166,214,0.6)] scale-110' : 'bg-[#020A14] text-white/40 border-white/10 scale-100'}`}>
                    {item.step}
                  </div>
                  <div className="flex flex-col">
                    <h4 className={`font-dm-sans text-[18px] font-medium mb-2 transition-colors duration-[2000ms] ${activeStep >= i ? 'text-[#00A6D6]' : 'text-[#FFFAF0]'}`}>{item.title}</h4>
                    <p className={`font-sans text-[14px] leading-[1.6] font-light transition-opacity duration-[2000ms] text-justify ${activeStep >= i ? 'text-white/80' : 'text-white/40'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
