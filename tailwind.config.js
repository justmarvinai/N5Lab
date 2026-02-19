/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core palette — Japanese minimalism
        ink: {
          DEFAULT: '#0F0E0C',  // Deep warm black (sumi ink)
          soft: '#1C1B18',
          muted: '#3A3835',
        },
        washi: {
          DEFAULT: '#F5F2EB',  // Warm paper white
          soft: '#EDE9DF',
          warm: '#E4DFD3',
        },
        lacquer: {
          DEFAULT: '#C8312B',  // Traditional red (urushi lacquer)
          light: '#E04840',
          dark: '#A02520',
          muted: '#F0D0CE',
        },
        gold: {
          DEFAULT: '#B8923A',  // Gilded accent (kintsugi gold)
          light: '#D4A94A',
          muted: '#F0E6CE',
        },
        mist: {
          DEFAULT: '#7A8C96',  // Distant mountain blue-grey
          light: '#A8B8C0',
          soft: '#E8EEF0',
        },
        moss: {
          DEFAULT: '#4A6741',  // Forest green (matcha)
          light: '#6A8F60',
          muted: '#D8E8D4',
        },
      },
      fontFamily: {
        // Noto Serif JP for Japanese elegance, Crimson Pro for roman body text
        display: ['"Crimson Pro"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        japanese: ['"Noto Serif JP"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      fontSize: {
        'kana-xl': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'kana-lg': ['2.5rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'kana-md': ['1.75rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'paper': '0 1px 3px 0 rgba(15,14,12,0.06), 0 4px 12px 0 rgba(15,14,12,0.04)',
        'card': '0 2px 8px 0 rgba(15,14,12,0.08), 0 8px 24px 0 rgba(15,14,12,0.06)',
        'lifted': '0 8px 24px 0 rgba(15,14,12,0.12), 0 24px 48px 0 rgba(15,14,12,0.08)',
        'glow-red': '0 0 20px 0 rgba(200,49,43,0.2)',
        'glow-gold': '0 0 20px 0 rgba(184,146,58,0.25)',
        'inner-washi': 'inset 0 1px 2px 0 rgba(15,14,12,0.06)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
        'washi-gradient': 'linear-gradient(135deg, #F5F2EB 0%, #EDE9DF 50%, #E4DFD3 100%)',
        'ink-gradient': 'linear-gradient(135deg, #0F0E0C 0%, #1C1B18 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
