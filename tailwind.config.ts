// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
    },
    extend: {
      colors: {
        'legacy-blue': '#1fb6ff',
      },
    },
  },

}
