import catGuias from '../assets/cat_guias_practicas.jpg';
import catLegislacion from '../assets/cat_legislacion_casos.jpg';
import catNoticias from '../assets/cat_noticias.jpg';
import catGestion from '../assets/cat_gestion_hidrica.jpg';
import catBiblio from '../assets/cat_biblio_juridica.jpg';

export const CATEGORIES = [
  'Todos',
  'Guías prácticas',
  'Legislación',
  'Casos y análisis',
  'Noticias',
  'Gestión hídrica'
];

export const CATEGORY_IMAGES = {
  "guias-practicas": catGuias,
  "legislacion": catLegislacion,
  "casos-y-analisis": catBiblio,
  "noticias": catNoticias,
  "gestion-hidrica": catGestion
};

export function normalizeCategorySlug(cat) {
  if (!cat) return "guias-practicas";
  const normalized = cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  if (normalized.includes("guia")) return "guias-practicas";
  if (normalized.includes("legislacion") || normalized.includes("ley")) return "legislacion";
  if (normalized.includes("caso") || normalized.includes("analisis") || normalized.includes("jurisprudencia")) return "casos-y-analisis";
  if (normalized.includes("noticia")) return "noticias";
  if (normalized.includes("gestion") || normalized.includes("hidrica")) return "gestion-hidrica";
  return "guias-practicas";
}

export function getCategoryImage(category, explicitImage) {
  if (explicitImage) return explicitImage;
  const key = normalizeCategorySlug(category);
  return CATEGORY_IMAGES[key] || catGuias;
}

export const ARTICULOS_DATA = [
  {
    slug: "reforma-codigo-aguas-aspectos-clave",
    title: "Reforma al Código de Aguas: aspectos clave para agricultores y organizaciones de usuarios",
    category: "Legislación",
    image: catLegislacion,
    date: "15 Jul 2026",
    readingTime: "8 min",
    author: "Rodrigo Bulnes - Legaliza Tu Agua",
    excerpt: "Un análisis exhaustivo de las modificaciones de la Ley 21.435 y sus implicancias directas para titulares de derechos de aprovechamiento de aguas en Chile.",
    featured: true,
    content: `
## Introducción al nuevo marco normativo
La promulgación y entrada en vigencia de las últimas reformas al Código de Aguas en Chile ha marcado un hito en la gestión, regulación y amparo de los derechos de aprovechamiento de aguas (DAA). Estas modificaciones introducen plazos perentorios de inscripción, causales específicas de caducidad y extinción por no uso, y una mayor exigencia en la entrega de información a la Dirección General de Aguas (DGA).


## 1. Plazos de Regularización e Inscripción en el CBR y Catastro Público de Aguas
Uno de los puntos más críticos para los titulares de derechos constituidos con anterioridad a la reforma radica en la obligación de registrar e inscribir sus títulos en el Registro de Propiedad de Aguas del Conservador de Bienes Raíces respectivo y, posteriormente, remitir los antecedentes al Catastro Público de Aguas (CPA) de la DGA.

El incumplimiento de estos plazos puede acarrear la caducidad del derecho, extinguiéndose la titularidad y revirtiendo el recurso al dominio público. Es fundamental que cada usuario revise minuciosamente el estado de sus fojas, números y años de inscripción.


## 2. El principio de caducidad por no uso y la patente por no utilización
La reforma refuerza el concepto de que el agua debe ser utilizada efectivamente para los fines autorizados. Se establecen mecanismos más estrictos de cálculo de patentes por no uso y plazos fatales que extinguen el derecho si las obras de captación o restitución no se construyen en los periodos definidos por la ley.


> «La seguridad jurídica del agua ya no depende únicamente de contar con una escritura guardada en una carpeta; requiere una gestión técnica y registral activa y periódica ante los organismos correspondientes.»

## 3. Obligaciones para Comunidades de Aguas y Juntas de Vigilancia
Las organizaciones de usuarios de aguas (OUA) asumen un rol protagónico en el nuevo escenario. Deben mantener sus registros de comuneros permanentemente actualizados, colaborar en los sistemas de monitoreo y aforos de extracciones efectivas, y adecuar sus estatutos conforme a las exigencias vigentes.


## Recomendaciones estratégicas
Para evitar contingencias legales, recomendamos a todos los titulares de derechos:


  - **Auditoría de títulos:** Realizar un estudio de títulos completo de las aguas inscritas a nombre de la persona natural, empresa o sucesión.
  - **Perfeccionamiento de caudales:** Iniciar oportunamente las acciones judiciales o administrativas de perfeccionamiento si el derecho está expresado en regadores, cuadras o porcentajes y no en volumen por unidad de tiempo (L/s o m³/año).
  - **Instalación de sistemas de medición:** Implementar oportunamente los sistemas de monitoreo de extracciones exigidos por la DGA según el estándar del tramo de caudal correspondiente.

    `
  },
  {
    slug: "como-regularizar-un-derecho-de-aprovechamiento-de-aguas",
    title: "Cómo regularizar un derecho de aprovechamiento de aguas",
    category: "Guías prácticas",
    image: catGuias,
    date: "14 Jul 2026",
    readingTime: "5 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Guía práctica paso a paso para identificar y regularizar usos históricos y derechos consuetudinarios bajo el marco legal chileno.",
    featured: false,
    content: `
## ¿Qué es la regularización de derechos de agua?
La regularización es el procedimiento jurídico y técnico mediante el cual un usuario que ha venido utilizando aguas de manera continua, pacífica e ininterrumpida desde antes de las fechas fijadas por la ley puede obtener el reconocimiento oficial de su derecho de aprovechamiento e inscribirlo en el Conservador de Bienes Raíces.


## Principales vías de regularización
Dependiendo del origen del uso del agua y los antecedentes disponibles, existen dos vías principales:


  - **Artículo 2° Transitorio del Código de Aguas:** Aplicable para usos consuetudinarios iniciados con anterioridad al Código de Aguas de 1981, siempre que se cumpla con los requisitos probatorios de uso continuo y sin violencia ni clandestinidad.
  - **Artículo 5° Transitorio:** Orientado a derechos emanados de procesos de reforma agraria y parcelaciones de la Corporación de la Reforma Agraria (CORA).


## Documentos indispensables para iniciar el trámite
Antes de comenzar, es necesario recopilar:


  - Copia de dominio vigente del predio donde se utiliza el agua.
  - Certificados de rol de avalúo fiscal y planos prediales.
  - Antecedentes técnicos de las obras de captación (pozo, bocatoma, canal, estanque).
  - Declaraciones juradas de colindantes o certificaciones de la Comunidad de Aguas si corresponde.


## ¿Por qué es urgente actuar hoy?
La legislación actual ha fijado fechas límite improrrogables para ingresar estas solicitudes. Quienes no regularicen a tiempo corren el riesgo de perder definitivamente el acceso legal al agua, exponiéndose a sanciones y a la imposibilidad de vender, hipotecar o transferir sus predios con respaldo hídrico.

    `
  },
  {
    slug: "diferencias-entre-derechos-consuntivos-y-no-consuntivos",
    title: "Diferencias entre derechos consuntivos y no consuntivos",
    category: "Legislación",
    image: catLegislacion,
    date: "10 Jul 2026",
    readingTime: "4 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Comprende las implicancias legales, operativas y patrimoniales entre los distintos tipos de derechos según la normativa de aguas.",
    featured: false,
    content: `
## Clasificación fundamental de los derechos de aprovechamiento
El Código de Aguas chileno clasifica los derechos de aprovechamiento de aguas según diversos criterios, siendo la distinción entre derechos consuntivos y no consuntivos una de las más relevantes tanto económica como jurídicamente.


## 1. Derechos Consuntivos
Son aquellos que facultan a su titular para consumir totalmente las aguas en cualquier actividad lícita, sin obligación de restituirlas al cauce natural o acuífero de origen. Son los derechos característicos de:


  - Agricultura y riego tecnificado.
  - Consumo humano y agua potable rural (APR).
  - Procesos agroindustriales y mineros donde el recurso se incorpora al producto o se evapora.


## 2. Derechos No Consuntivos
Permiten al titular emplear el agua sin consumirla, con la obligación expresa de restituirla a la fuente natural en la cantidad y calidad convenidas, y en el punto de restitución georreferenciado fijado en la resolución de constitución.

Se utilizan principalmente en proyectos hidroeléctricos de pasada, pisciculturas, y ciertas actividades industriales de enfriamiento.


## Importancia registral y comercial
Al adquirir un predio o transferir derechos, es imperativo comprobar si el título corresponde a un derecho consuntivo o no consuntivo, permanente o eventual, continuo o discontinuo, ya que de ello depende su valor comercial y su utilidad real para la actividad productiva.

    `
  },
  {
    slug: "funciones-direccion-general-de-aguas-dga",
    title: "¿Qué funciones cumple la Dirección General de Aguas?",
    category: "Noticias",
    image: catNoticias,
    date: "05 Jul 2026",
    readingTime: "6 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Un repaso detallado de las competencias, fiscalizaciones y procedimientos de la DGA en la administración del recurso hídrico nacional.",
    featured: false,
    content: `
## El rol de la Dirección General de Aguas
La Dirección General de Aguas (DGA), dependiente del Ministerio de Obras Públicas (MOP), es el organismo técnico del Estado encargado de promover la gestión y administración sustentable del recurso hídrico en Chile.


## Principales facultades de la DGA

  - **Constitución de derechos:** Tramita y resuelve las solicitudes de nuevos derechos de aprovechamiento en fuentes superficiales y subterráneas.
  - **Fiscalización y sanción:** Inspecciona en terreno extracciones no autorizadas, obras en cauces no aprobadas y falta de instalación de sistemas de telemetría, aplicando multas que pueden superar las miles de UTM.
  - **Catastro Público de Aguas (CPA):** Mantiene el registro público oficial de todos los derechos de agua legalmente constituidos y vigentes en el país.
  - **Monitoreo y aforos:** Mide caudales, niveles freáticos de pozos y calidad de las aguas en las distintas cuencas hidrológicas.


## ¿Cómo interactuar adecuadamente ante la DGA?
Ante una fiscalización o requerimiento de la DGA, es fundamental responder dentro de los plazos administrativos con asesoría legal y técnica especializada para presentar descargos fundamentados y evitar la aplicación de multas gravosas.

    `
  },
  {
    slug: "errores-frecuentes-inscripcion-conservador-bienes-raices",
    title: "Errores frecuentes al inscribir un derecho de aprovechamiento",
    category: "Casos y análisis",
    image: catBiblio,
    date: "28 Jun 2026",
    readingTime: "7 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Evita los errores más habituales al registrar títulos en el Conservador de Bienes Raíces y protege la certeza jurídica de tu patrimonio.",
    featured: false,
    content: `
## La importancia del Registro de Propiedad de Aguas
En el sistema jurídico chileno, la tradición de los derechos reales de aprovechamiento de aguas se efectúa mediante la inscripción del título en el Registro de Propiedad de Aguas del Conservador de Bienes Raíces del territorio jurisdiccional respectivo.


## Errores más comunes detectados en auditorías legales

  - **Inscripción en el Conservador equivocado:** Ocurre cuando el punto de captación se encuentra en una comuna sujeta a una jurisdicción conservatoria distinta a la del predio principal.
  - **Falta de correlación de títulos anteriores:** Vacíos en la cadena de dominio que impiden acreditar la continuidad histórica desde la constitución original del derecho.
  - **Confusión entre compraventa del predio y del agua:** Creer que la compraventa de un inmueble rural transfiere automáticamente las aguas sin cláusula expresa y sin la inscripción separada en el Registro de Aguas.
  - **No registro en el Catastro Público de Aguas:** Cumplir con el Conservador pero omitir el ingreso formal ante la DGA, lo que deja el derecho invisible para el catastro nacional.


## Conclusión
Realizar un saneamiento preventivo de títulos evita costosos litigios futuros y asegura que el valor del predio y sus aguas esté plenamente blindado.

    `
  },
  {
    slug: "guia-comunidades-de-aguas-juntas-de-vigilancia",
    title: "Guía para comunidades de aguas y juntas de vigilancia",
    category: "Gestión hídrica",
    image: catGestion,
    date: "20 Jun 2026",
    readingTime: "8 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Estrategias prácticas para optimizar la organización, administración estatutaria y gobernanza de las agrupaciones de usuarios.",
    featured: false,
    content: `
## Estructura de las Organizaciones de Usuarios de Aguas (OUA)
Las organizaciones de usuarios agrupan a quienes comparten una misma fuente o sistema de distribución de aguas (canales, esteros, ríos o acuíferos subterráneos). Se distinguen principalmente en:


  - **Comunidades de Aguas:** Administran canales matrices o ramales compartidos por múltiples usuarios.
  - **Asociaciones de Canalistas:** Personas jurídicas constituidas para administrar canales de mayor envergadura bajo un régimen formal corporativo.
  - **Juntas de Vigilancia:** Administran y distribuyen las aguas de una cuenca natural o sección de río, velando por los derechos de todas las organizaciones y usuarios individuales que la componen.


## Desafíos actuales de gobernanza
Hoy las OUA enfrentan el reto de digitalizar sus padrones, gestionar cuotas sociales, responder a fiscalizaciones de la DGA y mediar en controversias internas entre comuneros con rapidez y transparencia.

    `
  },
  {
    slug: "procedimiento-perfeccionamiento-titulos-hidricos",
    title: "Procedimiento de perfeccionamiento de títulos hídricos",
    category: "Guías prácticas",
    image: catGuias,
    date: "08 Jun 2026",
    readingTime: "6 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Paso a paso para transformar títulos expresados en regadores o porcentajes a caudales en litros por segundo con certeza jurídica.",
    featured: false,
    content: `
## ¿Qué es el perfeccionamiento de un derecho de agua?
Muchos derechos de agua antiguos fueron constituidos o transferidos con medidas históricas tradicionales tales como «regadores», «acciones», «tejas» o «cuadras», sin especificar las coordenadas UTM exactas de captación ni el caudal métrico expresado en litros por segundo (L/s) o metros cúbicos anuales.

El perfeccionamiento es el procedimiento que determina con precisión técnica y jurídica las características esenciales del derecho: caudal, tipo, ejercicio, punto de captación y fuente natural.


## Etapas del procedimiento

  - **Estudio técnico e hidrológico:** Determinación de equivalencias de caudal según estatutos de la junta de vigilancia o mediciones en canal.
  - **Presentación de la solicitud:** Ingreso de la gestión judicial no contenciosa ante el Juzgado de Letras competente o tramitación administrativa.
  - **Informe técnico de la DGA:** La autoridad fiscaliza y valida las equivalencias propuestas.
  - **Sentencia e inscripción:** Se dicta resolución favorable y se procede a la subinscripción en el Registro de Propiedad de Aguas del CBR.

    `
  },
  {
    slug: "medicion-extracciones-efectivas-dga",
    title: "Nuevas normativas de medición y fiscalización de la DGA",
    category: "Noticias",
    image: catNoticias,
    date: "01 Jun 2026",
    readingTime: "5 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Requisitos de instalación, calibración y transmisión telemática de sistemas de monitoreo de extracciones de aguas exigidos por la autoridad.",
    featured: false,
    content: `
## El Sistema de Monitoreo de Extracciones Efectivas (MME)
La DGA ha emitido diversas resoluciones que obligan a los titulares de derechos de aprovechamiento de aguas subterráneas y superficiales a instalar flujómetros, sensores de nivel freático y componentes de transmisión telemática directa.


## Categorías de exigencia según caudal
Las exigencias varían según el tramo de extracción:


  - **Estándar Muy Pequeño y Pequeño:** Registro manual periódico y envío digital mensual.
  - **Estándar Medio:** Medición electrónica con almacenamiento de datos y transmisión periódica.
  - **Estándar Mayor y General:** Telemetría en tiempo real con conexión automática al servidor central de la DGA.


## Sanciones por incumplimiento
No contar con el sistema instalado o no transmitir los datos en los plazos fijados constituye una infracción gravísima con multas directas aplicadas por la DGA.

    `
  },
  {
    slug: "planificacion-cuencas-escasez-hidrica",
    title: "Planificación y eficiencia en cuencas con escasez hídrica",
    category: "Gestión hídrica",
    image: catGestion,
    date: "22 May 2026",
    readingTime: "7 min",
    author: "Equipo Legaliza Tu Agua",
    excerpt: "Herramientas técnicas y marcos legales para la optimización de recursos hídricos en épocas de sequía y decretos de escasez.",
    featured: false,
    content: `
## Los Decretos de Escasez Hídrica
Cuando una zona presenta una severa sequía, el Ministerio de Obras Públicas puede declarar decretos de escasez hídrica. Esto otorga facultades extraordinarias a la DGA para redistribuir aguas y asegurar el consumo humano y saneamiento.


## Estrategias de mitigación para usuarios

  - **Acuerdos de redistribución:** Convenios voluntarios entre canalistas y juntas de vigilancia para turnos y prorrateos eficientes.
  - **Infiltración y recarga de acuíferos:** Proyectos para acumular excedentes en épocas de deshielo o lluvias.
  - **Revisión legal de autorizaciones temporales:** Tramitación de autorizaciones de extracción de emergencia conforme al artículo 314 del Código de Aguas.

    `
  }
];

// Helper functions for easy querying
function getStoredBiblioteca() {
  if (typeof window === 'undefined') return ARTICULOS_DATA;
  try {
    const raw = localStorage.getItem('legalizatuagua_cms_store_v2') || localStorage.getItem('legalizatuagua_cms_store_v1');
    if (raw) {
const parsed = JSON.parse(raw);
if (Array.isArray(parsed.biblioteca) && parsed.biblioteca.length > 0) {
  return parsed.biblioteca;
}
    }
  } catch (e) {
    console.error('Error reading biblioteca from localStorage:', e);
  }
  return ARTICULOS_DATA;
}

export function getAllArticles() {
  const items = getStoredBiblioteca();
  return items
    .filter(art => art.status === 'published' || art.status === undefined)
    .map(art => ({
...art,
image: getCategoryImage(art.category, art.image)
    }));
}

export function getArticleBySlug(slug) {
  if (!slug) return null;
  const articles = getAllArticles();
  const match = articles.find(art => art.slug === slug);
  if (!match) return null;
  return {
    ...match,
    image: getCategoryImage(match.category, match.image)
  };
}

export function getArticlesByCategory(category) {
  if (!category || category === 'Todos') return getAllArticles();
  const normalizedSearch = normalizeCategorySlug(category);
  return getAllArticles().filter(art => normalizeCategorySlug(art.category) === normalizedSearch);
}

export function getRelatedArticles(currentSlug, limit = 3) {
  const current = getArticleBySlug(currentSlug);
  const articles = getAllArticles();
  if (!current) return articles.slice(0, limit);
  
  // Try same category first, excluding current
  const sameCat = articles.filter(art => art.slug !== currentSlug && normalizeCategorySlug(art.category) === normalizeCategorySlug(current.category));
  if (sameCat.length >= limit) return sameCat.slice(0, limit);

  // Fill remainder with other recent articles
  const other = articles.filter(art => art.slug !== currentSlug && !sameCat.includes(art));
  return [...sameCat, ...other].slice(0, limit);
}

