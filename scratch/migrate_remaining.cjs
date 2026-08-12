const fs = require('fs');
const path = require('path');

const srcPath = path.resolve('src/data/articulosData.js');
let content = fs.readFileSync(srcPath, 'utf8');

// Extraemos solo el array ARTICULOS_DATA
const match = content.match(/export const ARTICULOS_DATA = (\[[\s\S]*?\]);\s*\n\/\/ Helper functions/);
if (!match) {
  console.error("No se pudo encontrar ARTICULOS_DATA");
  process.exit(1);
}

let arrayStr = match[1];

// Reemplazamos las variables de imagen por strings vacíos
arrayStr = arrayStr.replace(/image: catLegislacion,/g, "image: '',");
arrayStr = arrayStr.replace(/image: catGuias,/g, "image: '',");
arrayStr = arrayStr.replace(/image: catNoticias,/g, "image: '',");
arrayStr = arrayStr.replace(/image: catBiblio,/g, "image: '',");
arrayStr = arrayStr.replace(/image: catGestion,/g, "image: '',");

// Evaluamos el string para obtener el array
let articulos;
try {
  articulos = eval('(' + arrayStr + ')');
} catch (e) {
  console.error("Error evaluando el array:", e);
  process.exit(1);
}

const destDir = path.resolve('src/content/biblioteca');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

articulos.forEach((art, index) => {
  const jsonContent = {
    slug: art.slug || `articulo-${index}`,
    title: art.title,
    category: art.category,
    date: art.date || '15 Jul 2026',
    readingTime: art.readingTime || '5 min',
    author: art.author || 'Equipo Legaliza Tu Agua',
    image: '',
    excerpt: art.excerpt,
    content: art.content,
    featured: art.featured || false,
    status: 'published'
  };

  const filename = path.join(destDir, `${jsonContent.slug}.json`);
  fs.writeFileSync(filename, JSON.stringify(jsonContent, null, 2), 'utf8');
  console.log(`Guardado: ${filename}`);
});

console.log("Completado exitosamente.");
