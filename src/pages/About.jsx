import React from 'react';
import { Check } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-primary-light text-text-dark min-h-screen pt-[90px]">
      
      {/* Cabecera */}
      <section className="py-20 bg-primary-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-water-sky">Nuestra Firma</span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-white">Sobre Nosotros</h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Especialización jurídica y técnica para dar certeza al uso de recursos hídricos en el territorio chileno.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="font-editorial text-2xl sm:text-3xl text-primary-deep font-semibold">Nuestra Historia</h2>
            <p className="text-text-dark/80 text-sm sm:text-base leading-relaxed">
              Legaliza Tu Agua nace con el propósito de acercar soluciones jurídicas especializadas a quienes enfrentan desafíos relacionados con el uso, regularización y protección de los recursos hídricos. Creemos que una asesoría clara, cercana y técnicamente sólida permite entregar tranquilidad y respaldo a nuestros clientes.
            </p>
            <p className="text-text-dark/80 text-sm sm:text-base leading-relaxed">
              Alineamos nuestros esfuerzos con la realidad de las cuencas de Chile, prestando un servicio que integra ingenieros hidráulicos y juristas experimentados para cubrir cada necesidad.
            </p>
          </div>
          <div className="lg:col-span-5 h-80 rounded-[2rem] overflow-hidden shadow-lg border border-text-dark/5">
            <img
              src="https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&q=80&w=800"
              alt="Río en Chile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Misión, Visión, Compromiso */}
      <section className="py-24 bg-white border-y border-text-dark/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#EAF7FC] p-8 rounded-3xl border border-water-blue/10">
            <span className="text-[10px] font-bold tracking-widest text-water-blue uppercase">Norte</span>
            <h3 className="font-editorial text-xl font-bold text-primary-deep my-3">Misión</h3>
            <p className="text-text-dark/70 text-xs leading-relaxed">
              Entregar asesoría jurídica especializada en Derecho de Aguas, ofreciendo soluciones eficientes, responsables y adaptadas a las necesidades de cada cliente.
            </p>
          </div>
          <div className="bg-[#EAF7FC] p-8 rounded-3xl border border-water-blue/10">
            <span className="text-[10px] font-bold tracking-widest text-water-blue uppercase">Futuro</span>
            <h3 className="font-editorial text-xl font-bold text-primary-deep my-3">Visión</h3>
            <p className="text-text-dark/70 text-xs leading-relaxed">
              Consolidarnos como un referente nacional en Derecho de Aguas y Gestión Hídrica, destacándonos por nuestra experiencia, profesionalismo y compromiso.
            </p>
          </div>
          <div className="bg-[#EAF7FC] p-8 rounded-3xl border border-water-blue/10">
            <span className="text-[10px] font-bold tracking-widest text-water-blue uppercase">Sello</span>
            <h3 className="font-editorial text-xl font-bold text-primary-deep my-3">Compromiso</h3>
            <p className="text-text-dark/70 text-xs leading-relaxed">
              Cada caso es único. Por ello trabajamos con una atención personalizada, estudiando cada situación en detalle y proponiendo soluciones jurídicas responsables, eficientes y ajustadas a la realidad de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-left">
          <h2 className="font-editorial text-2xl sm:text-3xl text-primary-deep font-semibold mb-12 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            {["Compromiso", "Transparencia", "Profesionalismo", "Confianza", "Excelencia", "Cercanía"].map((v, i) => (
              <div key={i} className="bg-white border border-text-dark/5 p-6 rounded-2xl shadow-sm hover:border-water-blue/40 hover:-translate-y-1 transition-all duration-300">
                <span className="text-primary-deep text-sm font-semibold tracking-wide block">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
