import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import AnimatedBorders from '../components/AnimatedBorders';
import waterDark from '../assets/water_dark.jpg';
import { getArticleBySlug, getRelatedArticles } from '../data/articulosData';

export default function ArticuloDetalle({ slug }) {
  const [contentEntered, setContentEntered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState(() => getArticleBySlug(slug));
  const [relatedArticles, setRelatedArticles] = useState(() => (slug ? getRelatedArticles(slug, 3) : []));

  useEffect(() => {
    const refreshData = () => {
      const art = getArticleBySlug(slug);
      setArticle(art);
      setRelatedArticles(art ? getRelatedArticles(art.slug, 3) : []);
      if (art) {
        document.title = `${art.title} - Biblioteca Jurídica | Legaliza Tu Agua`;
      } else {
        document.title = `Artículo no encontrado - Legaliza Tu Agua`;
      }
    };

    refreshData();
    window.scrollTo({ top: 0, behavior: 'instant' });

    window.addEventListener('cms-store-updated', refreshData);

    const timer = setTimeout(() => {
      setContentEntered(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('cms-store-updated', refreshData);
    };
  }, [slug]);


  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Te comparto este interesante artículo de Legaliza Tu Agua: "${article?.title}"\n`);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

  if (!article) {
    return (
      <div className="w-full min-h-screen bg-[#041014] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="fixed inset-0 bg-[#020810] z-0"></div>
        <AnimatedBorders />
        <div className="relative z-10 text-center max-w-lg bg-[#020A14]/80 backdrop-blur-[20px] border border-white/10 p-8 sm:p-10 rounded-[28px] shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#00A6D6]/10 border border-[#00A6D6]/30 flex items-center justify-center mx-auto mb-6 text-[#00A6D6]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <h1 className="font-dm-sans text-2xl sm:text-3xl text-white font-medium mb-3 uppercase tracking-wide">
            Publicación no encontrada
          </h1>
          <p className="font-sans text-white/70 text-sm font-light leading-relaxed mb-6 text-justify">
            El artículo que intentas consultar no existe o su enlace ha cambiado. Te invitamos a explorar el catálogo completo de nuestra Biblioteca Jurídica.
          </p>
          <a 
            href="#/biblioteca"
            className="inline-flex items-center gap-2 bg-[#00A6D6] hover:bg-[#00B8ED] text-[#020A14] px-6 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all shadow-[0_0_20px_rgba(0,166,214,0.35)]"
          >
            ← Volver a la Biblioteca Jurídica
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#041014] relative overflow-hidden font-sans text-white selection:bg-[#00A6D6] selection:text-white flex flex-col justify-between">
      
      {/* GLOBAL BACKGROUND SYSTEM */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020810]"></div>
        <div className="absolute inset-0 w-[200%] h-full animate-super-slow-pan opacity-20 mix-blend-screen">
          <img src={waterDark} alt="Water texture" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#020810_100%)] opacity-85"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020810] via-transparent to-[#020810] opacity-90"></div>
      </div>

      <AnimatedBorders />

      {/* ARTICLE CONTAINER */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-20 pointer-events-auto">
        
        {/* TOP BAR / BACK NAVIGATION */}
        <div 
          className="mb-6 lg:mb-8 flex items-center justify-between"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 600ms ease-out'
          }}
        >
          <a 
            href="#/biblioteca"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#00A6D6] text-xs sm:text-sm font-sans tracking-wide transition-colors group"
          >
            <span className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00A6D6]/50 group-hover:bg-[#00A6D6]/10 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </span>
            Volver a la Biblioteca Jurídica
          </a>

          {/* Social share actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              title="Compartir por WhatsApp"
              className="p-2 rounded-full bg-white/5 hover:bg-[#00A6D6]/20 border border-white/10 hover:border-[#00A6D6]/50 text-white/70 hover:text-[#00A6D6] transition-all cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </button>
            <button
              onClick={handleShare}
              title="Copiar enlace"
              className="p-2 rounded-full bg-white/5 hover:bg-[#00A6D6]/20 border border-white/10 hover:border-[#00A6D6]/50 text-white/70 hover:text-[#00A6D6] transition-all cursor-pointer relative"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-[#00A6D6] text-[#020A14] font-semibold text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap animate-fade-in">
                  ¡Enlace copiado!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ARTICLE HEADER CARD */}
        <header 
          className="bg-gradient-to-br from-[#020A14]/90 to-[#041A25]/90 backdrop-blur-[20px] border border-white/10 rounded-[24px] lg:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 sm:mb-12 relative overflow-hidden"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms ease-out 100ms'
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00A6D6]/10 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-4">
            
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold bg-[#00A6D6]/20 border border-[#00A6D6]/60 text-[#00A6D6] shadow-[0_0_12px_rgba(0,166,214,0.3)]">
                {article.category}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <span className="text-white/60 text-xs sm:text-sm font-light">{article.date}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <span className="text-white/60 text-xs sm:text-sm font-light flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {article.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-dm-sans text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-normal leading-[1.2] uppercase pt-2">
              {article.title}
            </h1>

            {/* Author */}
            {article.author && (
              <div className="flex items-center gap-3 pt-2 text-white/80 text-xs sm:text-sm font-light">
                <div className="w-8 h-8 rounded-full bg-[#00A6D6]/20 border border-[#00A6D6]/50 flex items-center justify-center text-[#00A6D6] font-medium text-xs">
                  {article.author.charAt(0)}
                </div>
                <span>Por <strong className="text-white font-medium">{article.author}</strong></span>
              </div>
            )}
          </div>
        </header>

        {/* FEATURED CATEGORY IMAGE */}
        <div 
          className="w-full h-[220px] sm:h-[340px] lg:h-[420px] rounded-[20px] lg:rounded-[28px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-8 sm:mb-12 relative group"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 200ms'
          }}
        >
          <div className="absolute inset-0 bg-[#00A6D6]/10 mix-blend-overlay z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/80 via-transparent to-transparent z-10 pointer-events-none"></div>
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* LEAD / EXCERPT BLOCK */}
        {article.excerpt && (
          <div 
            className="bg-[#020A14]/70 backdrop-blur-[16px] border-l-4 border-[#00A6D6] border-y border-r border-white/10 rounded-r-[18px] p-5 sm:p-7 mb-8 sm:mb-10 text-white/90 font-sans text-base sm:text-lg leading-[1.6] font-light shadow-lg text-justify hyphens-auto"
            style={{
              opacity: contentEntered ? 1 : 0,
              transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 800ms ease-out 300ms'
            }}
          >
            {article.excerpt}
          </div>
        )}

        {/* MAIN ARTICLE BODY (Formatted HTML with custom styling) */}
        <article 
          className="bg-[#020A14]/80 backdrop-blur-[20px] border border-white/5 rounded-[24px] lg:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-12 sm:mb-16 relative"
          style={{
            opacity: contentEntered ? 1 : 0,
            transform: contentEntered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms ease-out 400ms'
          }}
        >
          <div 
            className="article-body font-sans text-white/85 text-[14px] sm:text-[15.5px] leading-[1.8] font-light flex flex-col gap-6"
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{article.content}</ReactMarkdown>
          </div>

          <style>{`
            .article-body h2 {
              font-family: 'DM Sans', sans-serif;
              color: #FFFFFF;
              font-size: 1.35rem;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.03em;
              margin-top: 1.8rem;
              margin-bottom: 0.5rem;
              padding-bottom: 0.4rem;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .article-body h2::before {
              content: '';
              display: inline-block;
              width: 6px;
              height: 18px;
              background-color: #00A6D6;
              border-radius: 3px;
            }
            .article-body h3 {
              font-family: 'DM Sans', sans-serif;
              color: #00A6D6;
              font-size: 1.15rem;
              font-weight: 500;
              margin-top: 1.4rem;
              margin-bottom: 0.3rem;
            }
            .article-body p {
              text-align: justify;
              hyphens: auto;
              margin-bottom: 0.8rem;
              color: rgba(255, 255, 255, 0.85);
            }
            .article-body blockquote {
              border-left: 3px solid #00A6D6;
              padding: 1rem 1.25rem;
              margin: 1.5rem 0;
              background: rgba(0, 166, 214, 0.05);
              border-radius: 0 12px 12px 0;
              font-style: italic;
              color: #E2F1F8;
            }
            .article-body ul, .article-body ol {
              padding-left: 1.4rem;
              margin-bottom: 1.2rem;
              display: flex;
              flex-col: gap: 0.5rem;
            }
            .article-body ul {
              list-style-type: disc;
            }
            .article-body ol {
              list-style-type: decimal;
            }
            .article-body li {
              margin-bottom: 0.45rem;
              text-align: justify;
              hyphens: auto;
            }
            .article-body strong {
              color: #FFFFFF;
              font-weight: 600;
            }
          `}</style>
        </article>

        {/* CTA BANNER: ASESORÍA PERSONALIZADA */}
        <div 
          className="bg-gradient-to-r from-[#021424] via-[#042436] to-[#021424] border border-[#00A6D6]/40 rounded-[24px] lg:rounded-[32px] p-6 sm:p-10 shadow-[0_15px_45px_rgba(0,166,214,0.18)] mb-12 sm:mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#00A6D6]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col text-left max-w-xl">
            <span className="text-[#00A6D6] text-xs uppercase tracking-[0.2em] font-semibold mb-2">Asesoría jurídica especializada</span>
            <h3 className="font-dm-sans text-white text-xl sm:text-2xl font-medium leading-snug mb-2">
              ¿Tienes dudas sobre cómo este tema afecta a tus derechos de agua?
            </h3>
            <p className="font-sans text-white/70 text-xs sm:text-sm font-light text-justify">
              Nuestro equipo de abogados e ingenieros expertos revisará tus títulos y antecedentes para brindarte una solución estratégica y segura.
            </p>
          </div>

          <a 
            href="#/asesoria"
            className="inline-flex items-center whitespace-nowrap gap-2.5 bg-[#00A6D6] hover:bg-[#00B8ED] text-[#020A14] px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,166,214,0.4)] hover:shadow-[0_0_30px_rgba(0,166,214,0.6)] transform hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            SOLICITAR ASESORÍA
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-dm-sans text-white text-lg sm:text-xl font-medium uppercase tracking-wide flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A6D6]"></div>
                Publicaciones relacionadas
              </h3>
              <a href="#/biblioteca" className="text-xs text-[#00A6D6] hover:underline uppercase tracking-wider">
                Ver todas →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedArticles.map((rel) => (
                <div 
                  key={rel.slug}
                  className="bg-[#020A14]/70 backdrop-blur-[16px] border border-white/5 rounded-[18px] flex flex-col shadow-lg overflow-hidden group hover:border-[#00A6D6]/30 transition-all duration-300"
                >
                  <div className="h-[130px] sm:h-[150px] w-full overflow-hidden relative">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-[#00A6D6] font-medium mb-2">
                      <span>{rel.category}</span>
                      <div className="w-1 h-1 rounded-full bg-white/30"></div>
                      <span className="text-white/40">{rel.readingTime}</span>
                    </div>
                    <h4 className="font-dm-sans text-white text-sm sm:text-base font-medium leading-snug mb-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-white/60 text-xs font-light line-clamp-2 mb-4 text-justify hyphens-auto">
                      {rel.excerpt}
                    </p>
                    <div className="mt-auto">
                      <a 
                        href={`#/biblioteca/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#00A6D6] font-medium tracking-wide uppercase hover:text-[#00B8ED] transition-colors"
                      >
                        Leer artículo
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
