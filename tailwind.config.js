/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './templates/**/*.json',
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ffb4a9",
        "primary-container": "#fb5a48",
        "on-primary": "#690001",
        "on-primary-fixed": "#410000",
        "primary-fixed-dim": "#ffb4a9",
        "surface": "#131313",
        "surface-container-low": "#1b1b1b",
        "surface-container": "#1f1f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353535",
        "surface-variant": "#353535",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#e2beb9",
        "tertiary-container": "#909191",
        "outline-variant": "#5a403d",
        "outline": "#aa8984",
        "night": "#131313",
        "card": "#1b1b1b",
        "accent": "#ffb4a9"
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Space Grotesk", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0px",
        "sm": "0px",
        "md": "0px",
        "lg": "0px",
        "xl": "0px",
        "2xl": "0px",
        "full": "9999px"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
