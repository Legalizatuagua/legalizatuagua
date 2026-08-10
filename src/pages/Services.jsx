import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Droplet, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ setRoute }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animación de entrada de las tarjetas en grilla
    gsap.fromTo('.service-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid-trigger',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-primary-navy min-h-screen text-white pt-[90px]">
      
      {/* Cabecera */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-water-sky">Soluciones Especializadas</span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-white">Servicios Jurídicos y Técnicos</h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              En Legaliza Tu Agua ofrecemos asesoría jurídica especializada en Derecho de Aguas y Gestión Hídrica, acompañando a nuestros clientes desde el análisis inicial hasta la ejecución de cada procedimiento. Nuestro objetivo es entregar soluciones claras, seguras y adaptadas a las necesidades de cada caso.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="py-24 services-grid-trigger">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((serv) => (
              <article 
                key={serv.id} 
                className="service-card bg-[#0b1b30] border border-white/10 hover:border-water-blue p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-water-sky mb-4">
                    <Droplet className="w-8 h-8 fill-water-sky/15" />
                  </div>
                  <h3 className="font-editorial text-lg font-semibold text-white mb-3 leading-snug">{serv.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">{serv.desc}</p>
                </div>
                <a 
                  href="#contacto" 
                  onClick={(e) => {
                    e.preventDefault();
                    setRoute('contacto');
                  }} 
                  className="text-water-sky text-xs font-semibold inline-flex items-center gap-1 group hover:text-white transition-all"
                >
                  Más información <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            ))}
          </div>

          {/* CTA Final */}
          <div className="mt-24 max-w-4xl mx-auto bg-primary-deep border border-white/5 p-12 rounded-[3rem] text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-water-sky">Consulta</span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold">¿Necesitas asesoría?</h3>
            <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
              Si tienes dudas sobre la situación de tus derechos de agua o necesitas apoyo en un procedimiento específico, contáctanos. Estaremos disponibles para orientarte y ayudarte a encontrar la mejor solución para tu caso.
            </p>
            <div className="pt-2">
              <a 
                href="#contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  setRoute('contacto');
                }} 
                className="inline-block bg-water-blue hover:bg-water-sky text-primary-navy px-8 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:scale-105 duration-300"
              >
                Solicitar Asesoría
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
