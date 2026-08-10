/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          deep: '#0A2342',     /* Azul profundo */
          navy: '#061A33',     /* Azul marino */
          light: '#EAF7FC',    /* Azul claro */
        },
        water: {
          blue: '#00A6D6',    /* Azul agua */
          sky: '#60C5E8',      /* Celeste */
          clear: '#EAF7FC',    /* Azul claro */
        },
        text: {
          dark: '#102A43',     /* Texto oscuro */
          light: '#FFFFFF',    /* Texto claro */
        }
      },
      fontFamily: {
        title: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      }
    },
  },
  plugins: [],
}
