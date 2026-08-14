import React, { useState, useEffect } from 'react';
import NoiseOverlay from './components/NoiseOverlay';
import Home from './pages/Home';
import BibliotecaJuridica from './pages/BibliotecaJuridica';
import ArticuloDetalle from './pages/ArticuloDetalle';
import NuestraVision from './pages/NuestraVision';
import SolicitarAsesoria from './pages/SolicitarAsesoria';
import Contacto from './pages/Contacto';
import PalabrasFundador from './pages/PalabrasFundador';
import Servicios from './pages/Servicios';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';

import Footer from './components/Footer';
import SiteHeader from './components/SiteHeader';

const getRouteState = () => {
  if (typeof window === 'undefined') return { route: 'home', param: null };
  const hash = window.location.hash;
  const pathname = window.location.pathname;

  // Rutas de Decap CMS se manejan nativamente vía /admin/index.html

  if (hash.startsWith('#/biblioteca/')) {
    const slug = hash.replace('#/biblioteca/', '').trim();
    if (slug) {
      return { route: 'articulo', param: slug };
    }
  }

  if (hash.startsWith('#/biblioteca')) return { route: 'biblioteca', param: null };
  if (hash.startsWith('#/vision')) return { route: 'vision', param: null };
  if (hash.startsWith('#/asesoria')) return { route: 'asesoria', param: null };
  if (hash.startsWith('#/contacto')) return { route: 'contacto', param: null };
  if (hash.startsWith('#/fundador')) return { route: 'fundador', param: null };
  if (hash.startsWith('#/servicios')) return { route: 'servicios', param: null };
  if (hash.startsWith('#/politica-de-privacidad')) return { route: 'politica', param: null };
  if (hash.startsWith('#/terminos-y-condiciones')) return { route: 'terminos', param: null };
  return { route: 'home', param: null };
};

export default function App() {
  const [routeState, setRouteState] = useState(getRouteState);

  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(getRouteState());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Only scroll to top if not navigating to a specific section anchor
    const hash = window.location.hash;
    if (!hash || hash.startsWith('#/') || hash === '#inicio' || hash === '#portada') {
      window.scrollTo(0, 0);
    }
  }, [routeState]);

  const { route, param } = routeState;

  // If in CMS admin dashboard, it will be handled by public/admin/index.html

  return (
    <div className="flex flex-col min-h-screen bg-[#061A33] text-white relative">
      {/* Noise filter background overlay */}
      <NoiseOverlay />
      
      {route !== 'home' && <SiteHeader currentRoute={route === 'articulo' ? 'biblioteca' : route} />}

      {/* Main pages router */}
      <main className="flex-grow flex flex-col">
        {route === 'biblioteca' && <BibliotecaJuridica />}
        {route === 'articulo' && <ArticuloDetalle slug={param} />}
        {route === 'vision' && <NuestraVision />}
        {route === 'asesoria' && <SolicitarAsesoria />}
        {route === 'contacto' && <Contacto />}
        {route === 'fundador' && <PalabrasFundador />}
        {route === 'servicios' && <Servicios />}
        {route === 'politica' && <PoliticaPrivacidad />}
        {route === 'terminos' && <TerminosCondiciones />}
        {route === 'home' && <Home />}
      </main>

      {route !== 'home' && <Footer />}
    </div>
  );
}
