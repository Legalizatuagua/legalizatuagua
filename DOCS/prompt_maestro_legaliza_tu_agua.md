# PROMPT MAESTRO --- LEGALIZA TU AGUA

## Rol

Actúa como Tecnólogo Creativo Senior, Director de Experiencia Digital e
Ingeniero Frontend Principal. Construye una experiencia web
cinematográfica de alta fidelidad, moderna, responsive y orientada a
conversión para **Legaliza Tu Agua**. Cada scroll debe sentirse
intencionado y cada animación debe tener peso y profesionalidad. Elimina
patrones genéricos de IA.

Todo el contenido visible debe estar en español natural y profesional:
navegación, títulos, botones, formularios, validaciones, etiquetas de
accesibilidad, footer y metadatos.

## Contexto fijo --- no preguntar

No solicites información inicial sobre marca, propósito, estética,
propuestas de valor o CTA. Ya están definidos.

### Marca y propósito

**Legaliza Tu Agua** es una oficina jurídica especializada en Derecho de
Aguas y Gestión Hídrica en Chile. Acompaña a personas, agricultores,
empresas y organizaciones en la regularización, constitución,
perfeccionamiento, inscripción, defensa y gestión de derechos de
aprovechamiento de aguas, entregando asesoría jurídica especializada y
acompañamiento durante cada etapa.

### Público objetivo

Personas con necesidades relacionadas con derechos de agua; agricultores
y productores agrícolas; propietarios de predios rurales; empresas;
Comunidades de Aguas; Asociaciones de Canalistas; Juntas de Vigilancia;
Organizaciones de Usuarios de Aguas.

La experiencia debe ser comprensible para usuarios que no necesariamente
conocen el lenguaje jurídico ni tienen alta experiencia digital.

### Propuestas de valor

1.  Especialización en Derecho de Aguas y Gestión Hídrica.
2.  Atención personalizada y acompañamiento claro durante todo el
    proceso.
3.  Soluciones jurídicas integrales adaptadas a personas, agricultores,
    empresas y organizaciones.

### Conversión

CTA principal: **Solicitar Asesoría**. CTA secundario: **Conocer
nuestros servicios**. Preparar arquitectura para un futuro formulario
inteligente que recopile antecedentes y derive a WhatsApp. No
implementar chatbot de IA en esta fase.

------------------------------------------------------------------------

## Preset obligatorio --- Profundidad Hídrica Editorial

No usar presets médicos, biotech, brutalistas ni de lujo nocturno.

### Identidad

Combinar profundidad del agua, territorio chileno, agricultura,
conocimiento jurídico especializado, precisión técnica, confianza y
acompañamiento humano. Debe sentirse como el encuentro entre una
consultora jurídica especializada, una publicación editorial
contemporánea y un paisaje hídrico-territorial. Nunca como startup
tecnológica, app médica o bufete jurídico tradicional.

### Paleta

-   Azul profundo: #0A2342
-   Azul marino: #061A33
-   Azul agua: #00A6D6
-   Celeste: #60C5E8
-   Azul claro: #EAF7FC
-   Blanco: #FFFFFF
-   Texto oscuro: #102A43

Ajustar levemente solo si el logo oficial lo requiere.

### Tipografía

Sans serif moderna y legible para navegación, cuerpo e interfaz;
tipografía editorial de carácter para títulos selectos o palabras de
énfasis. Evitar estética excesivamente clásica.

### Imágenes

Buscar agua y agricultura, canales de riego, territorio productivo,
paisajes agrícolas, cursos de agua, embalses, sistemas de riego, vistas
aéreas de agricultura y agua y texturas naturales. Evitar gotas stock
genéricas, manos con agua, martillos, balanzas, tribunales, apretones de
manos, ejecutivos genéricos, imágenes médicas y estética de laboratorio.

------------------------------------------------------------------------

## Logo oficial --- obligatorio

El proyecto incluirá el archivo oficial del logo/isotipo de gota de
Legaliza Tu Agua dentro de los assets.

Usar exclusivamente ese archivo. Si no está disponible, solicitar
únicamente la ruta del asset antes de sustituirlo.

NO recrear, redibujar, generar otra gota, reemplazar por icono Lucide o
emoji, deformar, recolorear ni recortar.

Usos: - Navbar: logo oficial a la izquierda; versión completa en
escritorio y isotipo oficial en móvil si existe. - Footer: repetir logo
con espacio de protección. - Favicon: usar isotipo oficial si existe
archivo independiente. - Mantener proporción con object-fit: contain.

------------------------------------------------------------------------

## Sistema visual premium

Implementar ruido CSS global sutil mediante SVG feTurbulence a \~0.05 de
opacidad. Usar radios amplios de 2rem a 3rem en contenedores destacados
cuando corresponda, sin forzarlos en todo.

Botones: scale(1.03) sutil en hover con
cubic-bezier(0.25,0.46,0.45,0.94), overflow-hidden y capa de fondo
deslizante. Enlaces: translateY(-1px). Tarjetas: elevación mínima,
transición de borde y movimiento vertical de pocos píxeles.

Usar gsap.context() dentro de useEffect y ctx.revert() en limpieza.
Easing power3.out para entradas y power2.inOut para transformaciones.
Stagger 0.08 para texto y 0.15 para tarjetas. Respetar
prefers-reduced-motion.

------------------------------------------------------------------------

## Arquitectura y rutas

Crear versión visual completa y navegable: - / Inicio - /nosotros -
/servicios - /equipo - /casos-de-exito - /blog - /contacto

Mantener componentes reutilizables y datos fáciles de sustituir luego
por CMS o base de datos.

## Navbar --- Isla Flotante

Navbar fixed, elegante, centrado. Transparente o liviano sobre Hero; al
superar Hero transicionar a fondo claro o azul translúcido con blur,
borde sutil y alta legibilidad. Usar IntersectionObserver o
ScrollTrigger.

Contenido: logo oficial, Inicio, Nosotros, Servicios, Casos de Éxito,
Blog, Contacto y CTA "Solicitar Asesoría" o WhatsApp según ancho. Menú
móvil accesible.

## Hero --- Plano de Apertura

Altura \~100dvh. Imagen a sangre completa de agua, agricultura y
territorio. Gradiente azul profundo a negro solo para legibilidad.
Contenido en tercio inferior izquierdo. Composición editorial y fade-up
GSAP.

Título: **Protegemos y regularizamos tus derechos de agua** Complemento:
**con respaldo jurídico y experiencia especializada.** Subtítulo: **En
Legaliza Tu Agua acompañamos a personas, agricultores, empresas y
organizaciones en la regularización, constitución, defensa y gestión de
derechos de aprovechamiento de aguas, entregando asesoría integral
durante todo el proceso.** CTA: **Solicitar Asesoría** Secundario:
**Conocer nuestros servicios**

## Sobre Legaliza Tu Agua

Título: **Especialistas en Derecho de Aguas y Gestión Hídrica** Texto:
**Somos un equipo especializado en Derecho de Aguas y Gestión Hídrica,
comprometido con entregar soluciones jurídicas claras, eficientes y
adaptadas a las necesidades de cada cliente. Nuestro trabajo combina
conocimiento legal, experiencia técnica y un acompañamiento cercano para
brindar seguridad en cada etapa del proceso.** Usar composición
editorial, no bloque centrado genérico.

## Propuestas de valor --- artefactos interactivos

Mantener sofisticación del prompt cinematográfico, eliminando
referencias médicas.

1.  **Situación Jurídica del Agua:** tarjetas dinámicas con
    Regularización, Constitución y Perfeccionamiento e inscripción.
2.  **Ruta de Orientación:** flujo animado con "Revisamos tu situación",
    "Analizamos los antecedentes", "Identificamos alternativas",
    "Definimos los próximos pasos".
3.  **Acompañamiento Especializado:** progresión Consulta inicial →
    Revisión de antecedentes → Estrategia jurídica → Gestión y
    acompañamiento.

Deben sentirse como artefactos editoriales interactivos, no tarjetas
SaaS.

## Servicios destacados en Inicio

Título: **Nuestros Servicios** Texto: **Brindamos asesoría especializada
en materias relacionadas con derechos de aguas y gestión hídrica,
ofreciendo soluciones integrales tanto para particulares como para
empresas y organizaciones.** Mostrar selección y botón **Ver todos los
servicios** hacia /servicios.

## Página Servicios --- prioridad visual

Fondo azul marino profundo; título y bajada superior; tarjetas
integradas al fondo oscuro; bordes finos azul agua; iconografía lineal
celeste; títulos blancos; texto de alto contraste; hover sutil. No
tarjetas blancas SaaS.

Introducción: **En Legaliza Tu Agua ofrecemos asesoría jurídica
especializada en Derecho de Aguas y Gestión Hídrica, acompañando a
nuestros clientes desde el análisis inicial hasta la ejecución de cada
procedimiento. Nuestro objetivo es entregar soluciones claras, seguras y
adaptadas a las necesidades de cada caso.**

Servicios: 1. Regularización de Derechos de Aprovechamiento de Aguas ---
Asesoramos en la regularización de derechos superficiales y
subterráneos, desarrollando los procedimientos necesarios para otorgar
certeza jurídica y resguardar los derechos conforme a la normativa
vigente. 2. Constitución de Derechos de Agua --- Apoyamos solicitudes
para constituir nuevos derechos ante organismos competentes y
acompañamos cada etapa administrativa. 3. Perfeccionamiento e
Inscripción de Derechos --- Gestionamos actualización, perfeccionamiento
e inscripción en registros correspondientes. 4. Estudios y Diagnóstico
Jurídico --- Realizamos análisis técnicos y jurídicos para evaluar
situación legal, identificar riesgos y proponer estrategias. 5. Asesoría
a Agricultores y Empresas --- Acompañamiento en recursos hídricos,
proyectos productivos y cumplimiento normativo. 6. Asesoría a
Comunidades de Aguas y Organizaciones de Usuarios --- Apoyo en
administración, gobernanza, cumplimiento normativo y decisiones
estratégicas. 7. Procedimientos Administrativos --- Representación ante
Dirección General de Aguas y otros organismos públicos. 8.
Representación Judicial --- Patrocinio y representación en
procedimientos judiciales sobre derechos de aprovechamiento de aguas. 9.
Consultoría en Gestión Hídrica --- Planificación y gestión del recurso
hídrico integrando aspectos jurídicos, regulatorios y estratégicos.

Cada tarjeta: icono lineal, título, descripción y "Más información".
Dejar preparada la interacción para decidir luego detalle, acordeón,
modal o ruta individual.

CTA: **¿Necesitas asesoría?** Texto: **Si tienes dudas sobre la
situación de tus derechos de agua o necesitas apoyo en un procedimiento
específico, contáctanos. Estaremos disponibles para orientarte y
ayudarte a encontrar la mejor solución para tu caso.** Botón:
**Solicitar Asesoría**

## Filosofía --- Manifiesto

Fondo azul profundo con textura hídrica/territorial. Texto menor: **Los
procesos relacionados con derechos de agua pueden ser jurídicamente
complejos y difíciles de comprender.** Texto protagonista: **Nosotros
los abordamos con especialización, claridad y acompañamiento cercano.**
Destacar especialización, claridad y acompañamiento. Revelado GSAP por
líneas o palabras. Si SplitText no está disponible, usar alternativa sin
dependencia premium.

## Proceso --- Ruta de Acompañamiento

Adaptar archivo apilable sticky a cuatro etapas: 1. **Cuéntanos tu
situación** --- Recibimos antecedentes iniciales y comprendemos la
necesidad. 2. **Revisamos los antecedentes** --- Analizamos información
y documentación disponible. 3. **Analizamos las alternativas** ---
Evaluamos escenario jurídico y vías posibles. 4. **Definimos los
próximos pasos** --- Proponemos una ruta clara y acompañamos el proceso.

Usar recursos inspirados en ondas de agua, líneas topográficas, rutas,
capas documentales, mapas abstractos, círculos concéntricos y flujo de
cauce. No ADN, láser médico ni ECG.

## Nosotros

Nuestra Historia: **Legaliza Tu Agua nace con el propósito de acercar
soluciones jurídicas especializadas a quienes enfrentan desafíos
relacionados con el uso, regularización y protección de los recursos
hídricos. Creemos que una asesoría clara, cercana y técnicamente sólida
permite entregar tranquilidad y respaldo a nuestros clientes.**

Misión: **Entregar asesoría jurídica especializada en Derecho de Aguas,
ofreciendo soluciones eficientes, responsables y adaptadas a las
necesidades de cada cliente.**

Visión: **Consolidarnos como un referente nacional en Derecho de Aguas y
Gestión Hídrica, destacándonos por nuestra experiencia, profesionalismo
y compromiso.**

Compromiso: **Cada caso es único. Por ello trabajamos con una atención
personalizada, estudiando cada situación en detalle y proponiendo
soluciones jurídicas responsables, eficientes y ajustadas a la realidad
de nuestros clientes.**

Valores: Compromiso, Transparencia, Profesionalismo, Confianza,
Excelencia, Cercanía.

Usar composición editorial variada, no tarjetas idénticas.

## Equipo

Introducción: **Legaliza Tu Agua es una oficina jurídica especializada
en Derecho de Aguas y Gestión Hídrica, dedicada a entregar asesoría
integral a personas, agricultores, empresas, organizaciones de usuarios
y comunidades de aguas. Nuestro propósito es acompañar a cada cliente
con soluciones jurídicas claras, eficientes y técnicamente sólidas,
entregando seguridad durante todo el proceso de regularización,
constitución, perfeccionamiento y defensa de sus derechos de
aprovechamiento de aguas.**

**Rodrigo Bulnes Ríos --- Abogado \| Fundador de Legaliza Tu Agua**
Abogado con más de quince años de experiencia en Derecho de Aguas y
Gestión Hídrica. Fundador y director, con trayectoria especializada en
regularización, perfeccionamiento e inscripción de derechos. Ha
asesorado a agricultores, empresas, comunidades de aguas, juntas de
vigilancia y asociaciones gremiales, representando clientes ante la
Dirección General de Aguas, tribunales y organismos públicos. Su
experiencia incluye estrategias jurídicas para organizaciones de
usuarios y procedimientos administrativos y judiciales complejos.

**Magdalena Lührs Meschede --- Egresada de Derecho \| Apoyo Jurídico**
Egresada de Derecho de la Pontificia Universidad Católica de Valparaíso,
preparando su examen de grado. Realizó intercambio en Ruprecht Karls
Universität Heidelberg, con formación en Derecho Ambiental
Internacional, Protección de Datos, Derecho Privado Comparado y Derecho
Penal Internacional. Colabora en investigación jurídica, preparación de
antecedentes y proyectos de regularización de derechos de aguas,
incluyendo aguas subterráneas.

No inventar integrantes. Preparar componentes para datos futuros desde
CMS/base de datos.

## Casos de Éxito y Testimonios

Casos: preparar arquitectura para problema abordado, trabajo realizado y
resultados obtenidos. No inventar casos, clientes, cifras ni resultados.
Testimonios: usar solo la introducción **La confianza de nuestros
clientes es el reflejo del compromiso y la dedicación que ponemos en
cada proyecto.** No inventar testimonios.

## Blog / Noticias

Crear listado, tarjeta reutilizable y plantilla individual. Temáticas:
Cambios normativos, Derecho de Aguas, Gestión Hídrica, Jurisprudencia,
Noticias relevantes y Consejos para usuarios. No inventar noticias,
fechas ni fuentes. Preparar para CMS futuro.

## FAQ

Acordeón accesible para: Regularización, Constitución, Trámites
administrativos, Plazos, Costos, Procedimientos y Requisitos generales.
No inventar respuestas jurídicas definitivas; dejar estructura para
contenido validado.

## Contacto

Título: **¿Conversemos?** Texto: **Si necesitas orientación o deseas
iniciar un proceso relacionado con derechos de agua o gestión hídrica,
estaremos disponibles para ayudarte. Completa el formulario o comunícate
directamente con nosotros a través de nuestros canales de contacto.**

Formulario: Nombre, Correo electrónico, Teléfono, Tipo de consulta,
Mensaje. Botón: **Enviar consulta**. Agregar WhatsApp sin inventar
número; usar variable/configuración.

CTA global: **¿Necesitas asesoría?** Texto: **Cada caso es diferente.
Cuéntanos sobre tu situación y conversemos sobre las alternativas
disponibles.** Botón: **Solicitar Asesoría**

No crear membresías ni precios.

## Formulario inteligente --- preparar arquitectura

Preparar frontend multi-step para futura fase: tipo de consulta,
situación general, región/ubicación, disponibilidad de documentación,
nombre, correo, teléfono, descripción adicional, resumen final y
WhatsApp prellenado. No finalizar preguntas jurídicas ni ramificaciones
sin aprobación. No llamarlo chatbot de IA si no existe IA real.

## Footer

Fondo azul marino profundo, radio superior amplio si funciona, logo
oficial, posicionamiento, navegación, contacto, redes cuando existan
enlaces oficiales y área legal/copyright. No usar "Sistema Operativo".
Puede tener detalle animado muy sutil inspirado en ondas o flujo de
agua.

## Responsive y accesibilidad

Mobile-first. Verificar Header, menú móvil, Hero, servicios, tipografía,
botones, formularios, Footer y ausencia de scroll horizontal. Usar HTML
semántico, jerarquía de headings, teclado, focus visible, contraste,
labels, alt text y reduced motion.

## Requisitos técnicos

Stack objetivo: React 19, Tailwind CSS v3.4.17, GSAP 3 + ScrollTrigger y
Lucide React. Antes de reemplazar stack, inspeccionar proyecto existente
y explicar impacto. Cargar fuentes por Google Fonts. Usar imágenes
reales apropiadas, nunca placeholders. Si App.jsx supera \~600 líneas,
separar en components/, pages/ y data/. Centralizar tokens, no duplicar
componentes/rutas ni instalar dependencias innecesarias. Preparar
Equipo, Servicios y Blog para futura API/CMS. Sin placeholders falsos de
contenido jurídico, casos, testimonios, credenciales o estadísticas.

## Exactitud --- reglas estrictas

No inventar afirmaciones jurídicas, resultados garantizados,
credenciales, años de experiencia distintos de los entregados,
estadísticas, número de clientes, tasas de éxito, premios,
certificaciones, testimonios, integrantes, oficinas, teléfonos, correos
o redes sociales.

## Fases

### Fase actual

Sistema visual, navegación, Hero, Inicio, Servicios, Nosotros, Equipo,
Casos de Éxito estructural, Blog estructural, FAQ estructural, Contacto,
CTA, responsive, accesibilidad básica y animaciones adaptadas.

### Fase futura --- no construir aún

Login administrador, panel de administración, gestión de equipo, gestión
de artículos, CRUD, base de datos, autenticación, CMS y chatbot IA.

## Secuencia

1.  Inspeccionar proyecto existente y resumir stack, rutas, dependencias
    y arquitectura.
2.  Confirmar ubicación del asset oficial del logo si no está
    disponible.
3.  Mapear Profundidad Hídrica Editorial a tokens.
4.  Crear rutas y componentes.
5.  Construir Navbar, Hero y sistema visual.
6.  Construir Inicio.
7.  Construir /servicios con 9 tarjetas.
8.  Construir Nosotros y Equipo.
9.  Construir Casos, Blog y FAQ sin inventar contenido.
10. Construir Contacto y CTA.
11. Conectar animaciones.
12. Verificar desktop, tablet y móvil.
13. Verificar navegación, accesibilidad, imágenes y cleanup.
14. No implementar CMS, autenticación ni base de datos en esta fase.

## Directiva final

**No construyas un sitio web genérico; construye una experiencia digital
especializada. Cada scroll debe sentirse intencionado, cada animación
debe sentirse con peso y profesionalidad. Elimina los patrones genéricos
de IA.**

Sensación final: **Especialización jurídica + agua + territorio +
claridad + confianza + acompañamiento.**
