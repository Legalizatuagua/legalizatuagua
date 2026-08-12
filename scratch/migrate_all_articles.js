import fs from 'fs';
import path from 'path';
import { ARTICULOS_DATA } from './src/data/articulosData.js';

const BASE_DIR = path.resolve('src/content/biblioteca');
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

ARTICULOS_DATA.forEach((item, index) => {
  // Solo exportaremos los que no sean los 2 de ejemplo que ya pusimos (o los sobreescribimos todos)
  // El formato que requiere el CMS para la biblioteca:
  const obj = {
    slug: item.slug || `articulo-${index}`,
    title: item.title,
    category: item.category,
    date: item.date || '15 Jul 2026',
    readingTime: item.readingTime || '5 min',
    author: item.author || 'Equipo Legaliza Tu Agua',
    image: '',
    excerpt: item.excerpt,
    content: item.content,
    featured: item.featured || false,
    status: 'published'
  };

  const filename = path.join(BASE_DIR, `${obj.slug}.json`);
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2), 'utf-8');
  console.log(`Saved ${filename}`);
});
