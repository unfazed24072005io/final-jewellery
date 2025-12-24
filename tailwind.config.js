/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FFFDF0',
          100: '#FEF9DD',
          200: '#FCF0B8',
          300: '#FAE693',
          400: '#F7DC6E',
          500: '#F5D249',
          600: '#D4AF37',
          700: '#B08C2A',
          800: '#8C691D',
          900: '#684610',
        },
        // ADD THIS charcoal color scale:
        charcoal: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#303030',
          800: '#212121',
          900: '#0A0A0A',
          DEFAULT: '#212121',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
