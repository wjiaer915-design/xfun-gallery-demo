/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        modal: '0 32px 120px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
