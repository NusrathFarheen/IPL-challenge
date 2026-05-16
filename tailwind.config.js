/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050505",
          primary: "#00f2ff",
          secondary: "#7000ff",
          accent: "#ff00e5",
          glass: "rgba(255, 255, 255, 0.05)",
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #00f2ff, 0 0 10px #00f2ff' },
          'to': { boxShadow: '0 0 20px #00f2ff, 0 0 30px #00f2ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
