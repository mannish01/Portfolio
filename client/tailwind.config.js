/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: '#7957FF',
          light: '#9B80FF',
          dark: '#5836E6',
        },
        coral: {
          DEFAULT: '#FF7058',
          light: '#FF8F7B',
          dark: '#E6543C',
        },
        pink: {
          soft: '#FFB6C8',
          light: '#FFCCD9',
          glow: '#FFA3BA',
        },
        lime: {
          DEFAULT: '#D7FF64',
          light: '#E3FF8A',
          dark: '#BBE642',
        },
        navy: {
          DEFAULT: '#17152D',
          dark: '#0E0C1C',
          deep: '#121024',
          surface: '#1E1B3A',
          card: '#252247',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        offwhite: {
          DEFAULT: '#FAF8F3',
          warm: '#F4EFE6',
          muted: '#E6E0D4',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'mesh-glow': 'radial-gradient(circle at 50% 50%, rgba(121, 87, 255, 0.15), rgba(255, 112, 88, 0.1) 40%, transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

