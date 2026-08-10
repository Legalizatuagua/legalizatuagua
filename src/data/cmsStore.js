// Import JSONs statically using Vite glob eager
const serviciosCtx = import.meta.glob('../content/servicios/*.json', { eager: true });
const bibliotecaCtx = import.meta.glob('../content/biblioteca/*.json', { eager: true });
const equipoCtx = import.meta.glob('../content/equipo/*.json', { eager: true });
const recursosCtx = import.meta.glob('../content/recursos/*.json', { eager: true });
const configCtx = import.meta.glob('../content/config/general.json', { eager: true });

function loadCollection(ctx) {
  return Object.values(ctx).map(mod => mod.default || mod);
}

export const getCmsStore = () => {
  const servicios = loadCollection(serviciosCtx);
  const biblioteca = loadCollection(bibliotecaCtx);
  const equipo = loadCollection(equipoCtx);
  const recursos = loadCollection(recursosCtx);
  
  // Config uses a single file normally
  const configuracionFiles = loadCollection(configCtx);
  const configuracion = configuracionFiles[0] || {
    siteTitle: 'Legaliza Tu Agua',
    tagline: 'Especialistas en Derecho de Aguas y Gestión Hídrica'
  };

  return {
    servicios,
    biblioteca,
    equipo,
    recursos,
    configuracion
  };
};

export const getServicios = () => {
  const store = getCmsStore();
  return store.servicios
    .filter(s => s.status !== 'draft')
    .sort((a, b) => (a.order || 99) - (b.order || 99));
};

export const getBiblioteca = () => {
  const store = getCmsStore();
  return store.biblioteca
    .filter(a => a.status !== 'draft')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getEquipo = () => {
  const store = getCmsStore();
  return store.equipo
    .filter(e => e.status !== 'draft')
    .sort((a, b) => (a.order || 99) - (b.order || 99));
};

export const getRecursos = () => {
  const store = getCmsStore();
  return store.recursos
    .filter(r => r.status !== 'draft')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getSiteConfig = () => {
  const store = getCmsStore();
  return store.configuracion || {};
};

export const getPublishedItems = (collectionName) => {
  const store = getCmsStore();
  const collection = store[collectionName] || [];
  return collection
    .filter(item => item.status !== 'draft')
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return (a.order || 99) - (b.order || 99);
    });
};

// Dummy functions since localStorage is gone and we don't save from frontend anymore
export const saveItem = () => console.warn('saveItem disabled. CMS real utilizado.');
export const deleteItem = () => console.warn('deleteItem disabled. CMS real utilizado.');
export const saveSiteConfig = () => console.warn('saveSiteConfig disabled.');
export const toggleItemStatus = () => console.warn('toggleItemStatus disabled.');
export const resetStore = () => console.warn('resetStore disabled.');
