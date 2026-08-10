import React from 'react';
import { Check } from 'lucide-react';
import { CASES_DATA } from '../data/casesData';

export default function Cases() {
  return (
    <div className="bg-primary-light text-text-dark min-h-screen pt-[90px]">
      
      {/* Cabecera */}
      <section className="py-20 bg-primary-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-water-sky">Experiencia</span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-white">Casos de Éxito</h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Visualización de estructuras jurídicas resueltas. En resguardo del deber de confidencialidad y secreto profesional, las fichas a continuación son esquemas demostrativos y no contienen nombres reales de clientes ni datos financieros.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Casos */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASES_DATA.map((c, i) => (
              <article key={i} className="bg-white border border-text-dark/5 rounded-[2rem] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="h-48 bg-primary-navy relative">
                  <span className="absolute top-4 left-4 bg-primary-navy/80 border border-white/10 text-water-sky text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{c.category}</span>
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-primary-deep leading-snug">{c.title}</h3>
                    <p className="text-text-dark/85 text-xs leading-relaxed mt-2">{c.desc}</p>
                  </div>
                  <div className="text-xs font-semibold text-water-blue border-t border-text-dark/5 pt-4 flex items-center gap-2">
                    <Check className="w-4 h-4 text-water-blue shrink-0" /> {c.status}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Testimonios Intro */}
          <div className="mt-24 bg-primary-navy border border-white/5 p-12 rounded-[3rem] text-center text-white space-y-4">
            <span className="text-xs font-bold tracking-widest text-water-sky uppercase">Filosofía de Servicio</span>
            <h3 className="font-editorial text-xl sm:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed">
              "La confianza de nuestros clientes es el reflejo del compromiso y la dedicación que ponemos en cada proyecto."
            </h3>
          </div>
        </div>
      </section>

    </div>
  );
}
