import React, { useState, useEffect } from 'react';
import { getPublishedItems } from '../data/cmsStore';
import AnimatedBorders from '../components/AnimatedBorders';
import waterDark from '../assets/water_dark.jpg';

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState("Todos");
  const [posts, setPosts] = useState(() => getPublishedItems('blog'));
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    document.title = "Blog - Legaliza Tu Agua";
    window.scrollTo({ top: 0, behavior: 'instant' });

    const refreshData = () => {
      setPosts(getPublishedItems('blog'));
    };

    refreshData();
    window.addEventListener('cms-store-updated', refreshData);
    return () => window.removeEventListener('cms-store-updated', refreshData);
  }, []);

  const categories = ['Todos', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

  const filteredPosts = selectedCat === "Todos" 
    ? posts 
    : posts.filter(post => post.category === selectedCat);

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
            <span className="text-white/80 text-[9px] lg:text-[10px] tracking-[0.2em] font-medium uppercase">ACTUALIDAD Y GUÍAS</span>
          </div>
          <h1 className="font-dm-sans text-white/90 text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-wide uppercase mb-4 leading-[1.25]">
            Blog <span className="text-[#00A6D6]">Hídrico</span>
          </h1>
          <p className="font-sans text-white/70 text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.6] lg:leading-[1.7] font-light max-w-[650px] text-justify hyphens-auto">
            Publicación de artículos técnicos, plazos de regularización y consejos normativos sobre el Código de Aguas en Chile.
          </p>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-[11px] lg:text-[13px] tracking-[0.1em] transition-all duration-300 font-medium cursor-pointer ${
                selectedCat === cat 
                  ? 'bg-[#00A6D6] text-white border border-[#00A6D6] shadow-[0_0_20px_rgba(0,166,214,0.45)] scale-[1.03]'
                  : 'bg-white/[0.03] backdrop-blur-md border border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id || post.slug} 
              className="bg-[#020A14]/80 backdrop-blur-[16px] border border-white/10 rounded-[20px] overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#00A6D6]/40 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="h-44 bg-gradient-to-br from-[#061A23] to-[#020A14] relative overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#00A6D6]/30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                  </div>
                )}
                <span className="absolute bottom-3 left-3 bg-[#00A6D6] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  {post.category || 'Actualidad'}
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-dm-sans text-lg font-medium text-white group-hover:text-[#00A6D6] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/65 text-xs leading-relaxed mt-2 text-justify">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-white/40">{post.date || 'Reciente'}</span>
                  {post.content && (
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-[#00A6D6] hover:text-[#00B8ED] text-[10px] font-semibold tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
                    >
                      Leer más &rarr;
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-3 text-center py-16 text-white/50 font-medium">
              No hay artículos publicados en esta categoría actualmente.
            </div>
          )}
        </div>

      </div>

      {/* MODAL PARA LEER POST COMPLETO */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="bg-[#020A14] border border-white/20 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-left relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPost(null)} 
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl cursor-pointer"
            >
              &times;
            </button>
            <span className="text-[#00A6D6] text-xs font-semibold tracking-wider uppercase block mb-2">{selectedPost.category}</span>
            <h2 className="font-dm-sans text-2xl text-white font-medium mb-4">{selectedPost.title}</h2>
            <div className="text-white/40 text-xs mb-6 pb-3 border-b border-white/10">{selectedPost.date} &bull; {selectedPost.author || 'Legaliza Tu Agua'}</div>
            <div 
              className="font-sans text-white/80 text-sm leading-relaxed space-y-4 text-justify"
              dangerouslySetInnerHTML={{ __html: selectedPost.content || `<p>${selectedPost.excerpt}</p>` }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
