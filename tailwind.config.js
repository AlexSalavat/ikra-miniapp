/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glass-blue': '0 12px 34px rgba(14,129,255,0.20)',
        'glass-blue-hover': '0 18px 46px rgba(14,129,255,0.30)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // ✅ Поддержка line-clamp
  ],
};
