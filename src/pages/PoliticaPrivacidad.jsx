import { useEffect, useState } from 'react';
import AnimatedBorders from '../components/AnimatedBorders';
import waterDark from '../assets/water_dark.jpg';

export default function PoliticaPrivacidad() {
  const [contentEntered, setContentEntered] = useState(false);

  useEffect(() => {
    document.title = "Política de Privacidad - Legaliza Tu Agua";
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
            Política de Privacidad
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
              En <strong>Legaliza Tu Agua</strong>, valoramos su privacidad y nos comprometemos a proteger sus datos personales en estricto cumplimiento con la Ley Nº 19.628 sobre Protección de la Vida Privada vigente en Chile.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">1. Recopilación de Información</h2>
            <p>
              Recopilamos información personal únicamente cuando usted nos la proporciona voluntariamente a través de nuestros formularios de contacto, solicitudes de asesoría o correos electrónicos. Esta información puede incluir, entre otros: nombre completo, correo electrónico, número de teléfono, ubicación geográfica (región y comuna) y antecedentes específicos de su situación hídrica y predial.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">2. Uso de la Información</h2>
            <p>
              Los datos recopilados son utilizados exclusivamente con los siguientes propósitos:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Evaluar la viabilidad legal y técnica de su caso (regularización de derechos de aprovechamiento de aguas, inscripciones, etc.).</li>
              <li>Contactarle para responder a sus consultas o proveer la asesoría solicitada.</li>
              <li>Enviar información relevante sobre cambios en la legislación hídrica chilena, siempre que usted haya consentido previamente.</li>
            </ul>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">3. Protección y Confidencialidad</h2>
            <p>
              Toda la documentación técnica y legal proporcionada (como escrituras, planos o resoluciones de la DGA) es tratada bajo estricto secreto profesional. Hemos implementado medidas de seguridad administrativas y técnicas para proteger sus datos personales contra pérdida, robo, acceso no autorizado, divulgación, alteración y destrucción.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">4. Compartir Información con Terceros</h2>
            <p>
              Legaliza Tu Agua no vende, alquila ni comercializa su información personal a terceros. Únicamente compartiremos sus datos cuando sea estrictamente necesario para la prestación del servicio contratado (por ejemplo, presentaciones ante la Dirección General de Aguas o Conservadores de Bienes Raíces), y siempre bajo su autorización expresa.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">5. Derechos del Titular (Derechos ARCO)</h2>
            <p>
              Usted tiene derecho a solicitar el acceso, rectificación, cancelación u oposición respecto de sus datos personales. Para ejercer estos derechos, puede comunicarse con nosotros en cualquier momento a través del correo electrónico: <strong>contacto@legalizatuagua.cl</strong>.
            </p>

            <h2 className="font-dm-sans text-white text-xl font-medium mt-4 uppercase border-b border-white/10 pb-2">6. Cambios a esta Política</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta misma página con la fecha de actualización correspondiente.
            </p>

          </div>
        </article>
      </div>
    </div>
  );
}
