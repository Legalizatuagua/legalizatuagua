import React, { useState, useEffect } from 'react';
import { getPublishedItems } from '../data/cmsStore';
import AnimatedBorders from '../components/AnimatedBorders';

export default function Team() {
  const [members, setMembers] = useState(() => getPublishedItems('equipo'));

  useEffect(() => {
    document.title = "Equipo - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });

    const refreshData = () => {
      setMembers(getPublishedItems('equipo'));
    };

    refreshData();
    window.addEventListener('cms-store-updated', refreshData);
    return () => window.removeEventListener('cms-store-updated', refreshData);
  }, []);

  const defaultAvatar = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="bg-[#041014] min-h-screen text-white font-sans overflow-x-hidden relative selection:bg-[#00A6D6]/30 selection:text-white pt-[110px] lg:pt-[120px] pb-24">
      {/* Background Elements */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #061A23 0%, #041014 60%, #02070A 100%)'
        }}
      />
      <AnimatedBorders />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-8 lg:py-10">
        
        {/* Cabecera */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6] shadow-[0_0_8px_#00A6D6]"></div>
            <span className="text-white/80 text-[9px] lg:text-[10px] tracking-[0.2em] font-medium uppercase">ESPECIALISTAS</span>
          </div>
          <h1 className="font-dm-sans text-white/90 text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-wide uppercase mb-4 leading-[1.25]">
            Nuestro <span className="text-[#00A6D6]">Equipo</span>
          </h1>
          <p className="font-sans text-white/70 text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.6] lg:leading-[1.7] font-light max-w-[700px] text-justify hyphens-auto">
            Legaliza Tu Agua es una oficina jurídica especializada en Derecho de Aguas y Gestión Hídrica, dedicada a entregar asesoría integral a personas, agricultores, empresas, organizaciones de usuarios y comunidades de aguas.
          </p>
        </div>

        {/* Miembros de Equipo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {members.map((member, i) => (
            <article 
              key={member.slug || member.id || i} 
              className="bg-[#020A14]/80 backdrop-blur-[16px] border border-white/10 rounded-[24px] overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-[#00A6D6]/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col md:flex-row group"
            >
              <div className="md:w-2/5 h-64 md:h-auto bg-[#061A23] relative overflow-hidden shrink-0">
                <img
                  src={member.image || defaultAvatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#020A14] pointer-events-none"></div>
              </div>
              <div className="p-6 sm:p-8 md:w-3/5 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-dm-sans text-xl font-medium text-white group-hover:text-[#00A6D6] transition-colors">{member.name}</h3>
                  <span className="text-[10px] font-semibold text-[#00A6D6] uppercase tracking-widest block mt-1">{member.role}</span>
                  <p className="text-white/70 text-xs leading-relaxed mt-4 text-justify">
                    {member.bio}
                  </p>
                </div>
                {(member.email || member.linkedin) && (
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-4">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-white/60 hover:text-[#00A6D6] text-xs transition-colors">
                        {member.email}
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00A6D6] text-xs transition-colors">
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
          {members.length === 0 && (
            <div className="col-span-2 text-center py-16 text-white/50">
              No hay miembros registrados en el equipo actualmente.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
