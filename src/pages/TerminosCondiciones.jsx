import { useEffect, useState } from 'react';
import AnimatedBorders from '../components/AnimatedBorders';
import waterDark from '../assets/water_dark.jpg';

export default function TerminosCondiciones() {
  const [contentEntered, setContentEntered] = useState(false);

  useEffect(() => {
    document.title = "Términos y Condiciones - LegalizaTuAgua";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const enterTimer = setTimeout(() => {
      setContentEntered(true);
    }, 100);

    return () => clearTimeout(enterTimer);
  }, []);

  return (
    <div className="bg-[#041014] min-h-screen text-white overflow-x-hidden font-sans relative selection:bg-[#00A6D6]/30 selection:text-white pb-20">
      
      {/* Backgrounds */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #061A23 0%, #041014 60%, #02070A 100%)',
          opacity: contentEntered ? 1 : 0
        }}
      />
      
      {/* Water texture background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: contentEntered ? 0.2 : 0 }}
      >
        <img 
          src={waterDark} 
          alt="" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-[#041014]/70 mix-blend-multiply"></div>
      </div>
      
      <AnimatedBorders />

      <div className="relative z-20 w-full px-6 lg:px-24 pt-[110px] lg:pt-[140px] max-w-4xl mx-auto">
        <header 
          className="mb-10 sm:mb-14"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 100ms'
          }}
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold bg-[#00A6D6]/20 border border-[#00A6D6]/60 text-[#00A6D6] shadow-[0_0_12px_rgba(0,166,214,0.3)] mb-4">
            Legal
          </span>
          <h1 className="font-dm-sans text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-normal uppercase">
            Términos y Condiciones
          </h1>
          <p className="text-white/60 text-sm mt-3 font-light">Última actualización: Agosto 2026</p>
        </header>

        <article 
          className="bg-[#020A14]/80 backdrop-blur-[20px] border border-white/5 rounded-[24px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 300ms'
          }}
        >
          <div className="flex flex-col gap-6 text-white/85 text-[14px] sm:text-[15.5px] leading-[1.8] font-light text-justify">
            
            <p>
              Bienvenido al sitio web de <strong>LegalizaTuAgua</strong>. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes Términos y Condiciones de uso.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">1. Uso del Sitio Web</h2>
            <p>
              El contenido de las páginas de este sitio web es para su información general y uso exclusivo. Está sujeto a cambios sin previo aviso. Ni nosotros ni ningún tercero garantizamos la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados o ofrecidos en este sitio web para un propósito particular.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">2. Propiedad Intelectual</h2>
            <p>
              Este sitio web contiene material que es de nuestra propiedad o está bajo licencia nuestra. Este material incluye, pero no se limita a, el diseño, la disposición, el aspecto, la apariencia y los gráficos. Queda prohibida su reproducción salvo de conformidad con el aviso de derechos de autor, que forma parte de estos términos y condiciones.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">3. Información Jurídica (Biblioteca)</h2>
            <p>
              Los artículos, guías y casos de estudio publicados en nuestra <strong>Biblioteca Jurídica</strong> tienen un propósito exclusivamente informativo y educativo. No constituyen, bajo ninguna circunstancia, asesoría legal personalizada. Cada caso hídrico en Chile es único y depende de variables geográficas, históricas y registrales específicas. Recomendamos siempre solicitar una consulta formal antes de tomar decisiones basadas en este contenido.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">4. Uso de los Servicios</h2>
            <p>
              Al completar nuestros formularios (Contacto y Solicitar Asesoría), usted garantiza que la información proporcionada es verdadera, exacta y completa. El envío de una solicitud a través del sitio web no establece automáticamente una relación cliente-abogado hasta que ambas partes acuerden formalmente los términos del servicio.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">5. Enlaces a Terceros</h2>
            <p>
              De vez en cuando, este sitio web también puede incluir enlaces a otros sitios web. Estos enlaces se proporcionan para su conveniencia para proporcionar más información. No significan que respaldamos el/los sitio(s) web. No tenemos responsabilidad alguna por el contenido de los sitios web enlazados.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">6. Ley Aplicable</h2>
            <p>
              Su uso de este sitio web y cualquier disputa que surja de dicho uso del sitio web están sujetos a las leyes de la República de Chile. Cualquier controversia será sometida a los tribunales ordinarios de justicia de la ciudad de Santiago.
            </p>

          </div>
        </article>
      </div>
    </div>
  );
}
