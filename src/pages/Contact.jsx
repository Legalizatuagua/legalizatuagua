import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formMode, setFormMode] = useState('classic'); // 'classic' or 'smart'
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    consulta: "",
    mensaje: "",
    // Smart fields
    region: "",
    situacion: "",
    docs: ""
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitClassic = (e) => {
    e.preventDefault();
    alert("Consulta enviada (Versión de prueba local). En la siguiente etapa se conectará el envío a base de datos.");
  };

  const getWhatsAppLink = () => {
    const text = `Hola Legaliza Tu Agua, me gustaría cotizar una asesoría.\nNombre: ${formData.nombre}\nCorreo: ${formData.correo}\nTeléfono: ${formData.telefono}\nRegión: ${formData.region}\nConsulta: ${formData.consulta}\nSituación: ${formData.situacion}\nDocumentos: ${formData.docs}`;
    return `https://wa.me/56912345678?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-primary-light text-text-dark min-h-screen pt-[90px]">
      
      {/* Cabecera */}
      <section className="py-20 bg-primary-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-water-sky">Canales y Orientación</span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-white">¿Conversemos?</h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Si necesitas orientación o deseas iniciar un proceso relacionado con derechos de agua o gestión hídrica, estaremos disponibles para ayudarte. Completa el formulario o comunícate directamente con nosotros a través de nuestros canales de contacto.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario y Canales */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Alternar formulario */}
          <div className="flex gap-2 justify-center mb-12">
            <button
              onClick={() => setFormMode('classic')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${formMode === 'classic' ? 'bg-primary-deep text-white shadow-md' : 'bg-white text-primary-deep border border-text-dark/5 shadow-sm'}`}
            >
              Consulta Clásica
            </button>
            <button
              onClick={() => setFormMode('smart')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${formMode === 'smart' ? 'bg-primary-deep text-white shadow-md' : 'bg-white text-primary-deep border border-text-dark/5 shadow-sm'}`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Diagnóstico Inteligente
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Canales Directos */}
            <div className="lg:col-span-5 bg-primary-navy text-white p-10 rounded-[2.5rem] space-y-8 text-left shadow-xl border border-white/5">
              <div>
                <h3 className="font-editorial text-2xl font-bold">Canales Directos</h3>
                <p className="text-white/60 text-xs mt-1">Comunícate de forma ágil para resolver tus requerimientos hídricos.</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="p-2 bg-white/5 rounded-lg shrink-0 flex items-center justify-center h-10 w-10">
                    <MessageSquare className="w-5 h-5 text-water-sky fill-water-sky/15" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">WhatsApp Directo</h4>
                    <p className="text-white/50 text-xs mt-0.5">+56 9 1234 5678</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-white/5 rounded-lg shrink-0 flex items-center justify-center h-10 w-10">
                    <Mail className="w-5 h-5 text-water-sky" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Correo Electrónico</h4>
                    <p className="text-white/50 text-xs mt-0.5">contacto@legalizatuagua.cl</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-white/5 rounded-lg shrink-0 flex items-center justify-center h-10 w-10">
                    <MapPin className="w-5 h-5 text-water-sky" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Ubicación y Cobertura</h4>
                    <p className="text-white/50 text-xs mt-0.5">Santiago y visitas a terreno a nivel nacional</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center shadow-md transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2 fill-white" /> Escríbenos por WhatsApp
              </a>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-7 bg-white p-10 rounded-[2.5rem] shadow-sm border border-text-dark/5 text-left">
              {formMode === 'classic' ? (
                /* Consulta Clásica */
                <form onSubmit={submitClassic} className="space-y-6">
                  <div>
                    <label className="text-xs font-semibold text-primary-deep uppercase tracking-wider block mb-1.5">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      required 
                      onChange={handleInput} 
                      value={formData.nombre} 
                      className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue focus:ring-1 focus:ring-water-blue" 
                      placeholder="Ej. Juan Pérez" 
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-primary-deep uppercase tracking-wider block mb-1.5">Correo Electrónico</label>
                      <input 
                        type="email" 
                        name="correo" 
                        required 
                        onChange={handleInput} 
                        value={formData.correo} 
                        className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue focus:ring-1 focus:ring-water-blue" 
                        placeholder="juan@ejemplo.cl" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-primary-deep uppercase tracking-wider block mb-1.5">Teléfono</label>
                      <input 
                        type="tel" 
                        name="telefono" 
                        required 
                        onChange={handleInput} 
                        value={formData.telefono} 
                        className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue focus:ring-1 focus:ring-water-blue" 
                        placeholder="+56 9 1234 5678" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-primary-deep uppercase tracking-wider block mb-1.5">Tipo de Consulta</label>
                    <select 
                      name="consulta" 
                      required 
                      onChange={handleInput} 
                      value={formData.consulta} 
                      className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue focus:ring-1 focus:ring-water-blue"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Regularización">Regularización de Derechos</option>
                      <option value="Constitución">Constitución de Derechos</option>
                      <option value="Perfeccionamiento">Perfeccionamiento o Inscripción</option>
                      <option value="Defensa">Defensa o Litigio DGA</option>
                      <option value="Otro">Otras materias de agua</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-primary-deep uppercase tracking-wider block mb-1.5">Mensaje o Caso</label>
                    <textarea 
                      name="mensaje" 
                      required 
                      onChange={handleInput} 
                      value={formData.mensaje} 
                      className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue focus:ring-1 focus:ring-water-blue h-32" 
                      placeholder="Explique brevemente su consulta jurídica..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-primary-deep hover:bg-primary-navy text-white py-3.5 rounded-lg font-semibold uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Enviar consulta
                  </button>
                </form>
              ) : (
                /* Formulario Inteligente Multi-step */
                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-lg text-primary-deep font-bold">Diagnóstico Rápido Hídrico</h3>
                    <p className="text-text-dark/60 text-xs">Completa las preguntas para generar una solicitud prellenada y derivarla directamente a WhatsApp.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-primary-deep block mb-1">1. Región donde se ubica el derecho de agua o pozo:</label>
                      <input 
                        type="text" 
                        name="region" 
                        onChange={handleInput} 
                        value={formData.region} 
                        className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue" 
                        placeholder="Ej. Región del Maule" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-primary-deep block mb-1">2. Estado o situación general del agua:</label>
                      <select 
                        name="situacion" 
                        onChange={handleInput} 
                        value={formData.situacion} 
                        className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue"
                      >
                        <option value="">Seleccione</option>
                        <option value="Tengo agua pero no papeles">Tengo el pozo/canal operativo pero no tengo inscripciones</option>
                        <option value="Inscripción antigua incompleta">Tengo inscripciones antiguas pero faltan caudales o coordenadas</option>
                        <option value="Tercero me está fiscalizando">Tengo un conflicto con terceros o fiscalización de la DGA</option>
                        <option value="Quiero solicitar nuevo caudal">Quiero solicitar un derecho hídrico desde cero</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-primary-deep block mb-1">3. ¿Dispone de documentación previa?</label>
                      <select 
                        name="docs" 
                        onChange={handleInput} 
                        value={formData.docs} 
                        className="w-full bg-[#EAF7FC]/40 border border-text-dark/10 rounded-lg p-3 text-sm focus:outline-none focus:border-water-blue"
                      >
                        <option value="">Seleccione</option>
                        <option value="Tengo escrituras e inscripciones">Tengo escrituras de compraventa e inscripciones de dominio</option>
                        <option value="No tengo ningún papel">No tengo ningún tipo de documentación en este momento</option>
                      </select>
                    </div>
                  </div>
                  
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-lg font-semibold uppercase tracking-wider text-xs block shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" /> Derivar Diagnóstico a WhatsApp
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
