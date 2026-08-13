import { useEffect, useRef, useState } from 'react';
import { regiones } from '../utils/regiones';
import asesoriaBg from '../assets/asesoria_bg.jpg';
import AnimatedBorders from '../components/AnimatedBorders';
import '../index.css';

const DRAFT_STORAGE_KEY = 'legaliza_asesoria_draft_v1';

const getInitialFormData = () => {
  const defaults = {
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    tipoSolicitante: '',
    areasInteres: [],
    region: '',
    comuna: '',
    estadoProyecto: '',
    descripcion: '',
    preferenciaContacto: '',
    urgencia: '',
    confirmacion: false,
  };

  try {
    const saved = sessionStorage.getItem(DRAFT_STORAGE_KEY) || localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaults, ...parsed };
    }
  } catch (err) {
    console.error('Error loading draft form:', err);
  }
  return defaults;
};

export default function SolicitarAsesoria() {
  const [contentEntered, setContentEntered] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Form State initialized with draft persistence
  const [formData, setFormData] = useState(getInitialFormData);

  const scrollContainerRef = useRef(null);

  // Auto-save form data to storage on any change
  useEffect(() => {
    if (formSubmitted) return;
    try {
      const serialized = JSON.stringify(formData);
      sessionStorage.setItem(DRAFT_STORAGE_KEY, serialized);
      localStorage.setItem(DRAFT_STORAGE_KEY, serialized);
    } catch (err) {
      console.error('Error saving form draft:', err);
    }
  }, [formData, formSubmitted]);



  useEffect(() => {
    document.title = "Solicitar Asesoría - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const enterTimer = setTimeout(() => {
      setContentEntered(true);
    }, 100);

    return () => clearTimeout(enterTimer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name !== 'areasInteres') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxArray = (value) => {
    setFormData(prev => {
      const current = prev.areasInteres;
      if (current.includes(value)) {
        return { ...prev, areasInteres: current.filter(item => item !== value) };
      } else {
        return { ...prev, areasInteres: [...current, value] };
      }
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirmacion) return;
    
    // Preparar formData para el envío
    const dataToSubmit = new FormData();
    
    // Add text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'confirmacion') {
        const val = Array.isArray(value) ? value.join(', ') : value;
        dataToSubmit.append(key, val);
      }
    });

    // Añadir campos especiales de FormSubmit
    dataToSubmit.append('_subject', `Nueva solicitud de Asesoría: ${formData.tipoSolicitante}`);
    dataToSubmit.append('_captcha', 'false');

    try {
      await fetch("https://formsubmit.co/ajax/contacto@legalizatuagua.cl", {
        method: "POST",
        body: dataToSubmit,
        headers: {
          'Accept': 'application/json'
        }
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

    // Mostrar éxito y limpiar storage
    setTimeout(() => {
      try {
        sessionStorage.removeItem(DRAFT_STORAGE_KEY);
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div ref={scrollContainerRef} className="bg-[#041014] min-h-screen text-white overflow-x-hidden font-sans relative selection:bg-[#00A6D6]/30 selection:text-white flex flex-col justify-between">
      {/* ------------------------------------------------------------- */}
      {/* GLOBAL BACKGROUND ELEMENTS (Matching Site Identity) */}
      {/* ------------------------------------------------------------- */}
      {/* Deep Water Base Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #061A23 0%, #041014 60%, #02070A 100%)',
          opacity: contentEntered ? 1 : 0
        }}
      />

      {/* Base Background Image Layer starting from top header */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 overflow-hidden"
        style={{ opacity: contentEntered ? 0.45 : 0 }}
      >
        <img 
          src={asesoriaBg} 
          alt="Fondo Asesoría" 
          className="absolute inset-0 w-full h-full object-cover object-top mix-blend-screen pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041014]/60 via-[#041014]/30 to-[#041014]/80 pointer-events-none" />
      </div>

      {/* Caustic texture */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay transition-opacity duration-1000 delay-300"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
          backgroundSize: '120px 120px',
        }}
      />
      
      {/* Animated wave borders with dynamic scroll & organic physics */}
      <AnimatedBorders />

      {/* ------------------------------------------------------------- */}
      {/* PAGE CONTENT */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-24 pt-[110px] lg:pt-[120px] pb-16 flex-grow flex flex-col justify-center">
        <div className={`mx-auto w-full ${formSubmitted ? 'max-w-xl py-4 sm:py-6 flex items-center justify-center' : 'max-w-4xl'}`}>
          
          {!formSubmitted && (
            /* HERO COMPACT */
            <div 
              className="text-center mb-6 sm:mb-8"
              style={{
                opacity: contentEntered ? 1 : 0,
                transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
                transition: 'all 700ms ease-out 200ms'
              }}
            >
              <span className="inline-block px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] lg:text-[10px] tracking-[0.25em] uppercase text-white/60 mb-3 shadow-[0_0_15px_rgba(255,255,255,0.03)] font-medium">
                SOLICITAR ASESORÍA
              </span>
              <h1 className="font-dm-sans uppercase text-[#FFFAF0] text-[24px] sm:text-[32px] lg:text-[36px] leading-[1.1] tracking-wide mb-3 font-semibold">
                Cuéntanos <span className="text-[#00A6D6]">tu caso</span>
              </h1>
              <p className="font-sans text-white/70 text-[12px] sm:text-[13px] lg:text-[14px] leading-[1.6] font-light max-w-xl mx-auto text-justify hyphens-auto">
                Completa este formulario para conocer tu situación. Nuestro equipo revisará la información y se pondrá en contacto contigo para definir la mejor estrategia jurídica.
              </p>
            </div>
          )}

          {!formSubmitted ? (
            /* FORMULARIO */
            <>
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-6"
              >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                style={{
                  opacity: contentEntered ? 1 : 0,
                  transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 800ms ease-out 300ms'
                }}
              >
                {/* COLUMNA IZQUIERDA */}
                <div className="flex flex-col gap-6">
                  {/* Info Contacto + Tipo Solicitante */}
                  <div className="bg-gradient-to-br from-[#020A14]/80 to-[#041A25]/80 backdrop-blur-[16px] border border-white/5 rounded-[20px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden h-full flex flex-col">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#00A6D6]/5 to-transparent pointer-events-none"></div>
                    
                    <h3 className="font-dm-sans text-white text-base font-medium mb-4 relative z-10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]"></div>
                      Información de contacto
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10 mb-5 flex-grow">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Nombre completo</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="Ej. Juan Pérez" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Empresa (opcional)</label>
                        <input type="text" name="empresa" value={formData.empresa} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="Empresa u org." />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Correo</label>
                        <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="correo@ejemplo.com" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Teléfono</label>
                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors" placeholder="+56 9 1234 5678" />
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-white/5 mb-4 relative z-10"></div>

                    <div className="relative z-10">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2 block mb-2.5">Tipo de solicitante</label>
                      <div className="relative">
                        <select name="tipoSolicitante" value={formData.tipoSolicitante} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors appearance-none cursor-pointer">
                          <option value="" disabled className="bg-[#020A14] text-white/50">Selecciona una opción...</option>
                          <option value="Persona natural" className="bg-[#020A14]">Persona natural</option>
                          <option value="Agricultor" className="bg-[#020A14]">Agricultor</option>
                          <option value="Empresa" className="bg-[#020A14]">Empresa</option>
                          <option value="Comunidad de Aguas" className="bg-[#020A14]">Comunidad de Aguas</option>
                          <option value="Junta de Vigilancia" className="bg-[#020A14]">Junta de Vigilancia</option>
                          <option value="Canalistas" className="bg-[#020A14]">Canalistas</option>
                          <option value="Organización pública" className="bg-[#020A14]">Organización pública</option>
                          <option value="Otro" className="bg-[#020A14]">Otro</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="flex flex-col gap-6">
                  {/* Requerimiento e Interés */}
                  <div className="bg-gradient-to-br from-[#020A14]/80 to-[#041A25]/80 backdrop-blur-[16px] border border-white/5 rounded-[20px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden h-full flex flex-col">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-[#00A6D6]/5 to-transparent pointer-events-none"></div>
                    
                    <h3 className="font-dm-sans text-white text-base font-medium mb-4 relative z-10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]"></div>
                      ¿En qué podemos ayudarte?
                    </h3>
                    
                    <div className="relative z-10 mb-5 flex-grow">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2 block mb-2.5">Selección múltiple</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Regularización',
                          'Constitución',
                          'Transferencias',
                          'Defensa judicial',
                          'Gestión',
                          'Org. de usuarios',
                          'Estudios',
                          'Gobernanza',
                          'Otro'
                        ].map(area => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => handleCheckboxArray(area)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-sans transition-all duration-300 border ${formData.areasInteres.includes(area) ? 'bg-[#00A6D6]/20 border-[#00A6D6]/50 text-white shadow-[0_0_10px_rgba(0,166,214,0.15)]' : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.05] hover:border-white/20'}`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-white/5 mb-4 relative z-10"></div>

                    <h3 className="font-dm-sans text-white text-base font-medium mb-3 relative z-10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]"></div>
                      Estado del proyecto
                    </h3>
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Solo necesito orientación.',
                        'Iniciando un proceso.',
                        'Proceso en curso.',
                        'Conflicto legal.',
                        'Urgente.'
                      ].map(estado => (
                        <label key={estado} className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors duration-300 ${formData.estadoProyecto === estado ? 'bg-[#00A6D6]/10 border-[#00A6D6]/40' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
                          <input 
                            type="radio" 
                            name="estadoProyecto" 
                            value={estado}
                            checked={formData.estadoProyecto === estado}
                            onChange={handleInputChange}
                            className="mt-0.5 appearance-none min-w-[12px] min-h-[12px] rounded-full border border-white/40 checked:border-[#00A6D6] checked:border-[3.5px] transition-all outline-none"
                          />
                          <span className={`text-[11px] font-light leading-snug ${formData.estadoProyecto === estado ? 'text-white' : 'text-white/70'}`}>{estado}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PARTE INFERIOR */}
              <div 
                className="bg-gradient-to-br from-[#020A14]/80 to-[#041A25]/80 backdrop-blur-[16px] border border-white/5 rounded-[20px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group"
                style={{
                  opacity: contentEntered ? 1 : 0,
                  transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 800ms ease-out 400ms'
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#00A6D6]/5 to-transparent pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 relative z-10 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Región (Ubicación)</label>
                    <select name="region" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value, comuna: ''})} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors appearance-none">
                      <option value="" className="text-black">Selecciona una región</option>
                      {regiones.map((r) => (
                        <option key={r.region} value={r.region} className="text-black">{r.region}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Comuna (Ubicación)</label>
                    <select name="comuna" value={formData.comuna} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors appearance-none" disabled={!formData.region}>
                      <option value="" className="text-black">{formData.region ? "Selecciona una comuna" : "Primero selecciona una región"}</option>
                      {formData.region && regiones.find(r => r.region === formData.region)?.comunas.map((c) => (
                        <option key={c} value={c} className="text-black">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h3 className="font-dm-sans text-white text-base font-medium mb-2.5 relative z-10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]"></div>
                  Cuéntanos tu caso
                </h3>
                
                <div className="flex flex-col gap-1.5 relative z-10 mb-5">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Describe brevemente tu situación</label>
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required rows="3" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors resize-none" placeholder="Explícanos los detalles aquí..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10 mb-5">
                  {/* Documentación Adicional (Aviso) */}
                  <div className="flex flex-col gap-2 justify-center h-full pt-1">
                    <h3 className="font-dm-sans text-white text-[13px] font-medium flex items-center gap-2">Documentos Adicionales</h3>
                    <div className="bg-[#00A6D6]/5 border border-[#00A6D6]/20 rounded-lg p-3.5 flex items-start gap-3">
                      <div className="mt-0.5 text-[#00A6D6]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                      </div>
                      <p className="text-[12px] font-light text-white/70 leading-relaxed">
                        Si tu consulta requiere documentación adicional, te contactaremos para coordinar el envío de los antecedentes.
                      </p>
                    </div>
                  </div>

                  {/* Preferencias */}
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Preferencia de contacto</label>
                      <div className="relative">
                        <select name="preferenciaContacto" value={formData.preferenciaContacto} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors appearance-none cursor-pointer">
                          <option value="" disabled className="bg-[#020A14] text-white/50">Selecciona...</option>
                          <option value="WhatsApp" className="bg-[#020A14]">WhatsApp</option>
                          <option value="Teléfono" className="bg-[#020A14]">Teléfono</option>
                          <option value="Correo electrónico" className="bg-[#020A14]">Correo</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/60 ml-2">Nivel de urgencia</label>
                      <div className="relative">
                        <select name="urgencia" value={formData.urgencia} onChange={handleInputChange} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2 text-white text-[13px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors appearance-none cursor-pointer">
                          <option value="" disabled className="bg-[#020A14] text-white/50">Selecciona...</option>
                          <option value="Baja" className="bg-[#020A14]">Baja</option>
                          <option value="Media" className="bg-[#020A14]">Media</option>
                          <option value="Alta" className="bg-[#020A14]">Alta</option>

                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmacion y Envio */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-4 border-t border-white/5 relative z-10">
                  <label className="flex items-center gap-3 cursor-pointer group flex-1">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        name="confirmacion" 
                        checked={formData.confirmacion}
                        onChange={handleInputChange}
                        className="appearance-none w-4 h-4 border border-white/30 rounded focus:outline-none group-hover:border-[#00A6D6]/70 transition-colors"
                      />
                      {formData.confirmacion && (
                        <div className="absolute pointer-events-none text-[#00A6D6]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                        </div>
                      )}
                    </div>
                    <span className="text-[12px] font-light text-white/80 group-hover:text-white transition-colors leading-tight">
                      Confirmo que la información entregada es correcta.
                    </span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={!formData.confirmacion}
                    className={`inline-flex items-center justify-center whitespace-nowrap gap-2 px-7 py-2.5 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 transform ${formData.confirmacion ? 'bg-[#00A6D6] hover:bg-[#00B8ED] text-[#020A14] shadow-[0_4px_15px_rgba(0,166,214,0.4)] hover:-translate-y-0.5 cursor-pointer font-semibold' : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'}`}
                  >
                    Enviar solicitud
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  </button>
                </div>
              </div>
            </form>
            </>
          ) : (
            /* SUCCESS VIEW (Recuadro 25% más compacto, centrado vertical y horizontalmente) */
            <div 
              className="w-full bg-gradient-to-b from-[#020D1A]/95 via-[#031627]/90 to-[#020A14]/95 backdrop-blur-[24px] border border-[#00A6D6]/40 rounded-[28px] p-6 sm:p-8 lg:p-9 shadow-[0_20px_60px_rgba(0,166,214,0.18)] relative overflow-hidden flex flex-col items-center text-center animate-fade-in my-auto"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00A6D6]/15 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Encabezado: Icono circular con símbolo de verificación (✓) en azul brillante con resplandor suave */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#00A6D6]/15 border border-[#00A6D6]/60 flex items-center justify-center mb-4 sm:mb-5 relative z-10 shadow-[0_0_25px_rgba(0,166,214,0.45)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A6D6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              
              {/* Título: Tipografía font-dm-sans (idéntica a "Un equipo comprometido con el agua y las personas") */}
              <h2 className="font-dm-sans text-white text-[22px] sm:text-[26px] lg:text-[30px] uppercase tracking-wide leading-tight mb-2 relative z-10 font-medium">
                SOLICITUD RECIBIDA
              </h2>

              {/* Subtítulo */}
              <p className="font-sans text-[#00A6D6] text-[12px] sm:text-[13px] font-medium tracking-[0.15em] uppercase mb-5 relative z-10">
                Gracias por confiar en LegalizaTuAgua.
              </p>

              {/* Texto principal - Justificado */}
              <div className="flex flex-col gap-3 max-w-lg mx-auto mb-6 relative z-10 text-white/85 font-sans text-[12.5px] sm:text-[13.5px] leading-[1.7] font-light text-justify">
                <p>
                  Hemos recibido correctamente tus antecedentes y nuestro equipo iniciará la revisión de la información para determinar la estrategia jurídica más adecuada para tu caso.
                </p>
                <p className="text-white/70 text-[12px] sm:text-[13px]">
                  Un especialista se pondrá en contacto contigo para indicarte los próximos pasos y resolver cualquier duda que tengas.
                </p>
              </div>

              {/* Aviso de confidencialidad */}
              <div className="w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-xl p-3.5 sm:p-4 mb-6 flex items-center gap-3.5 text-left backdrop-blur-md relative z-10">
                <div className="text-[#00A6D6] shrink-0 p-2 rounded-lg bg-[#00A6D6]/10 border border-[#00A6D6]/20">
                  {/* Escudo con candado */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <rect x="9" y="11" width="6" height="5" rx="1"/>
                    <path d="M10 11V9a2 2 0 0 1 4 0v2"/>
                  </svg>
                </div>
                <p className="font-sans text-[11.5px] sm:text-[12.5px] text-white/85 leading-snug text-justify">
                  Tu información ha sido registrada de forma <span className="text-[#00A6D6] font-medium">segura y confidencial</span>.
                </p>
              </div>

              {/* Botón: Bordes redondeados, degradado azul, brillo, hover suave y flecha derecha */}
              <button 
                onClick={() => window.location.hash = '#inicio'}
                className="relative z-10 inline-flex items-center gap-3 bg-gradient-to-r from-[#00A6D6] to-[#008BB4] text-[#020A14] px-8 py-3 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase shadow-[0_0_20px_rgba(0,166,214,0.35)] hover:shadow-[0_0_30px_rgba(0,166,214,0.6)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                VOLVER AL INICIO
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
