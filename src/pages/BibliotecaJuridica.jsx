import React, { useEffect, useState } from 'react';
import waterDark from '../assets/water_dark.jpg';
import AnimatedBorders from '../components/AnimatedBorders';
import { CATEGORIES, getAllArticles, normalizeCategorySlug } from '../data/articulosData';
import { getPublishedItems } from '../data/cmsStore';

export default function BibliotecaJuridica() {
  const [contentEntered, setContentEntered] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [displayedCategory, setDisplayedCategory] = useState('Todos');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [articles, setArticles] = useState(getAllArticles);
  const [recursos, setRecursos] = useState(() => getPublishedItems('recursos'));

  useEffect(() => {
    document.title = "Biblioteca Jurídica - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });

    const loadData = () => {
      setArticles(getAllArticles());
      setRecursos(getPublishedItems('recursos'));
    };

    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('cms-store-updated', handleUpdate);

    const timer = setTimeout(() => {
      setContentEntered(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('cms-store-updated', handleUpdate);
    };
  }, []);

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory || isTransitioning) return;
    setActiveCategory(cat);
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedCategory(cat);
      setIsTransitioning(false);
    }, 200);
  };

  const isTodos = displayedCategory === 'Todos';

  const featuredArticle = articles.find(art => art.featured) || articles[0];

  const gridArticles = isTodos
    ? articles.filter(art => !art.featured)
    : articles.filter(art => normalizeCategorySlug(art.category) === normalizeCategorySlug(displayedCategory));

  return (
    <div className="w-full min-h-screen bg-[#041014] relative overflow-hidden font-sans text-white selection:bg-[#00A6D6] selection:text-white">
      
      {/* GLOBAL BACKGROUND SYSTEM */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        {/* Deep blue base layer */}
        <div className="absolute inset-0 bg-[#020810]"></div>
        
        {/* Subtle Water Texture with Slow Pan */}
        <div className="absolute inset-0 w-[200%] h-full animate-super-slow-pan opacity-20 mix-blend-screen">
          <img src={waterDark} alt="Water texture" className="w-full h-full object-cover" />
        </div>
        
        {/* Dramatic Vignette / Shadows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020810_100%)] opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020810] via-transparent to-[#020810] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#020810] via-transparent to-[#020810] opacity-80"></div>
      </div>

      <AnimatedBorders />

      {/* PAGE CONTENT */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-12 pointer-events-auto">
        
        {/* HERO SECTION */}
        <div 
          className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10 lg:mb-14"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 300ms'
          }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6] shadow-[0_0_8px_#00A6D6]"></div>
            <span className="text-white/80 text-[9px] lg:text-[10px] tracking-[0.2em] font-medium uppercase">BIBLIOTECA JURÍDICA</span>
          </div>
          
          <h1 className="font-dm-sans text-white/90 text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-wide uppercase mb-4 leading-[1.25]">
            <span className="block">Conocimiento que protege</span>
            <span className="block text-[#00A6D6]">tus derechos de agua</span>
          </h1>
          
          <p className="font-sans text-white/70 text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.6] lg:leading-[1.7] font-light max-w-[650px] text-justify hyphens-auto">
            Compartimos análisis jurídicos, guías prácticas, cambios normativos y contenido especializado sobre Derecho de Aguas y Gestión Hídrica para ayudar a agricultores, empresas, comunidades y organizaciones de usuarios a tomar decisiones informadas.
          </p>
        </div>

        {/* CATEGORY FILTERS (Glassmorphism Capsules) */}
        <div 
          className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 mb-12 lg:mb-16"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 500ms'
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-[11px] lg:text-[13px] tracking-[0.1em] transition-all duration-300 font-medium cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-[#00A6D6] text-white border border-[#00A6D6] shadow-[0_0_20px_rgba(0,166,214,0.45)] scale-[1.03]'
                  : 'bg-white/[0.03] backdrop-blur-md border border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* DYNAMIC CONTENT AREA WITH SMOOTH FADE, BLUR & TRANSLATE */}
        <div 
          className={`transition-all duration-400 ease-out ${
            isTransitioning 
              ? 'opacity-0 scale-[0.985] blur-[3px] translate-y-3 pointer-events-none' 
              : 'opacity-100 scale-100 blur-0 translate-y-0'
          }`}
        >
          {/* FEATURED ARTICLE (Horizontal Big Card - ONLY IN 'TODOS') */}
          {isTodos && featuredArticle && (
            <div 
              className="bg-[#020A14]/80 backdrop-blur-[16px] border border-white/5 rounded-[20px] lg:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group mb-10 lg:mb-14 flex flex-col-reverse lg:flex-row hover:border-[#00A6D6]/30 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
              
              <div className="flex-1 p-6 lg:p-10 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 text-[9px] lg:text-[10px] tracking-[0.15em] uppercase font-medium mb-4">
                  <span className="text-[#00A6D6]">{featuredArticle.category}</span>
                  <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  <span className="text-white/50">{featuredArticle.date}</span>
                  <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  <span className="text-white/50">{featuredArticle.readingTime}</span>
                </div>
                
                <h2 className="font-dm-sans text-[#FFFAF0] text-[20px] sm:text-[24px] lg:text-[28px] font-medium leading-[1.2] mb-4">
                  {featuredArticle.title}
                </h2>
                
                <p className="font-sans text-white/60 text-[13px] lg:text-[15px] leading-[1.6] font-light mb-6 text-justify hyphens-auto">
                  {featuredArticle.excerpt}
                </p>
                
                {/* CONDITIONAL LEER ARTÍCULO BUTTON */}
                {Boolean(featuredArticle.content || featuredArticle.slug) && (
                  <div className="mt-auto">
                    <a 
                      href={`#/biblioteca/${featuredArticle.slug}`} 
                      className="inline-flex items-center gap-2 bg-transparent border border-[#00A6D6]/50 text-[#00A6D6] px-5 py-2.5 rounded-full text-[10px] tracking-[0.15em] uppercase hover:bg-[#00A6D6] hover:text-white transition-colors duration-300 font-semibold cursor-pointer shadow-[0_0_15px_rgba(0,166,214,0.15)]"
                    >
                      Leer artículo
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-[45%] h-[180px] lg:h-auto shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00A6D6]/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-[#020A14] z-10 pointer-events-none"></div>
                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {gridArticles.length === 0 && !isTodos ? (
            <div className="w-full py-16 lg:py-24 px-6 flex flex-col items-center justify-center text-center bg-[#020A14]/60 backdrop-blur-[16px] border border-white/5 rounded-[20px] lg:rounded-[32px] my-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
              <div className="w-14 h-14 rounded-full bg-[#00A6D6]/10 border border-[#00A6D6]/30 flex items-center justify-center mb-5 text-[#00A6D6] shadow-[0_0_20px_rgba(0,166,214,0.25)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
                </svg>
              </div>
              <h4 className="font-dm-sans text-white text-[17px] sm:text-[19px] lg:text-[20px] font-medium tracking-wide mb-2">
                «Próximamente agregaremos nuevos contenidos».
              </h4>
              <p className="font-sans text-white/60 text-[13px] sm:text-[14px] font-light max-w-md">
                Estamos preparando nuevas publicaciones y guías especializadas para esta categoría.
              </p>
            </div>
          ) : (
            /* ARTICLES GRID */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-16 lg:mb-20">
              {gridArticles.map((article, i) => (
                <div 
                  key={article.slug || i} 
                  className="bg-[#020A14]/70 backdrop-blur-[16px] border border-white/5 rounded-[14px] sm:rounded-[16px] lg:rounded-[24px] flex flex-col shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative overflow-hidden group hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500"
                  style={{
                    animationDelay: `${i * 60}ms`
                  }}
                >
                  <div className="h-[100px] sm:h-[140px] lg:h-[180px] w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#00A6D6]/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"></div>
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="p-3 sm:p-5 lg:p-6 flex flex-col flex-1 relative z-20">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.12em] lg:tracking-[0.15em] uppercase font-medium mb-2 lg:mb-3">
                      <span className="text-[#00A6D6] line-clamp-1">{article.category}</span>
                      <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block"></div>
                      <span className="text-white/40 hidden sm:block">{article.date}</span>
                    </div>
                    <h5 className="text-[#FFFAF0] font-dm-sans text-[12px] sm:text-[14px] lg:text-[17px] leading-[1.25] lg:leading-[1.3] font-medium mb-2 lg:mb-3 line-clamp-2">{article.title}</h5>
                    <p className="text-white/60 font-sans text-[10px] sm:text-[11px] lg:text-[13px] leading-[1.4] sm:leading-[1.5] lg:leading-[1.6] font-light mb-3 sm:mb-4 lg:mb-6 flex-1 text-justify hyphens-auto">{article.excerpt}</p>
                    
                    {/* BOTÓN CONDICIONAL «LEER ARTÍCULO» */}
                    {Boolean(article.content || article.slug) && (
                      <div className="mt-auto">
                        <a 
                          href={`#/biblioteca/${article.slug}`} 
                          className="inline-flex items-center gap-1.5 sm:gap-2 text-[#00A6D6] hover:text-[#00B8ED] text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.12em] lg:tracking-[0.15em] uppercase transition-colors duration-300 font-medium"
                        >
                          Leer artículo
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION: RECURSOS Y DOCUMENTOS DESCARGABLES (FROM CMS) */}
        {recursos.length > 0 && (
          <div 
            className="mb-16 lg:mb-20"
            style={{
              opacity: contentEntered ? 1 : 0,
              transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 800ms ease-out 800ms'
            }}
          >
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
              <div>
                <span className="text-[#00A6D6] text-[9px] lg:text-[10px] tracking-[0.2em] font-medium uppercase block mb-1">
                  MATERIAL DESCARGABLE Y NORMATIVA
                </span>
                <h3 className="font-dm-sans text-xl lg:text-2xl text-white font-medium">
                  Normativa y Documentos Oficiales
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {recursos.map((rec) => (
                <div 
                  key={rec.id}
                  className="bg-[#020A14]/80 backdrop-blur-[16px] border border-white/10 rounded-[18px] lg:rounded-[22px] p-5 lg:p-6 flex flex-col justify-between hover:border-[#00A6D6]/40 hover:bg-white/[0.04] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-medium uppercase tracking-widest text-[#00A6D6] bg-[#00A6D6]/10 px-2.5 py-1 rounded-md border border-[#00A6D6]/20">
                        {rec.category || 'Recurso'}
                      </span>
                      <span className="text-white/40 text-[10px]">{rec.fileType || 'Doc'}</span>
                    </div>
                    <h4 className="text-white font-dm-sans text-[15px] lg:text-[16px] font-medium mb-2 leading-snug group-hover:text-[#00A6D6] transition-colors">
                      {rec.title}
                    </h4>
                    <p className="text-white/60 font-sans text-[12px] leading-relaxed mb-4 text-justify">
                      {rec.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 mt-2">
                    {rec.externalUrl ? (
                      <a 
                        href={rec.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#00A6D6] hover:text-white text-[11px] font-medium tracking-wide transition-colors"
                      >
                        Ver enlace oficial
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                      </a>
                    ) : rec.fileUrl ? (
                      <a 
                        href={rec.fileUrl} 
                        download
                        className="inline-flex items-center gap-2 text-[#00A6D6] hover:text-white text-[11px] font-medium tracking-wide transition-colors"
                      >
                        Descargar archivo
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                      </a>
                    ) : (
                      <span className="text-white/40 text-[11px] italic">Disponible a solicitud</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER ACTION BLOCKS: SUBSCRIPTION ONLY */}
        <div 
          className="mb-12 flex justify-start"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 1100ms'
          }}
        >
          {/* COMPACT SUBSCRIPTION BLOCK */}
          <div className="w-full max-w-[350px] bg-gradient-to-br from-[#020A14] to-[#041A25] backdrop-blur-[16px] border border-[#00A6D6]/20 rounded-[24px] px-6 py-6 flex flex-col shadow-[0_8px_32px_0_rgba(0,166,214,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#00A6D6]/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 mb-4 text-left">
              <h3 className="font-dm-sans text-[#FFFAF0] text-[16px] lg:text-[18px] font-medium tracking-tight mb-1.5">
                Recibe nuestras publicaciones
              </h3>
              <p className="font-sans text-white/70 text-[11px] lg:text-[12px] leading-[1.5] font-light m-0 text-justify">
                Análisis jurídicos y normativos en tu correo.
              </p>
            </div>
            
            <div className="w-full relative z-10">
              <form className="flex flex-col gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full px-4 py-2 text-white text-[11px] font-light focus:outline-none focus:border-[#00A6D6]/50 transition-colors"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full bg-[#00A6D6] hover:bg-[#00B8ED] text-white px-4 py-2 rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer"
                >
                  Suscribirme
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
