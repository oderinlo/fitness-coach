import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep obsidian foundation
        obsidian: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#0f0f0f',
          800: '#141414',
          700: '#1e1e1e',
          600: '#2a2a2a',
          500: '#3d3d3d',
        },
        // Gold accent palette
        gold: {
          DEFAULT: '#d4a574',
          50: '#faf6f1',
          100: '#f0e6d9',
          200: '#e8c9a0',
          300: '#d4a574',
          400: '#c4915c',
          500: '#b08850',
          600: '#9a7344',
          700: '#7d5c38',
          800: '#674b32',
          900: '#553f2c',
        },
        // Ivory text palette
        ivory: {
          DEFAULT: '#f5f3ef',
          50: '#fafaf8',
          100: '#f5f3ef',
          200: '#e8e5df',
          300: '#d4d2ce',
          400: '#b0ada8',
          500: '#8a8885',
          600: '#6b6966',
          700: '#55534f',
          800: '#3d3c39',
          900: '#2a2928',
        },
        // Level theme colors (unlockable)
        theme: {
          gold: '#d4a574',
          silver: '#94a3b8',
          amethyst: '#a78bfa',
          bronze: '#fb923c',
          platinum: '#22d3ee',
        },
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-out-right': 'slideOutRight 0.3s ease-out',
        'progress-fill': 'progressFill 0.6s ease-out',
        'level-up-glow': 'levelUpGlow 2s ease-in-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'streak-flame': 'streakFlame 1.5s ease-in-out infinite',
        'badge-shine': 'badgeShine 3s ease-in-out infinite',
        'typing': 'typing 1.4s ease-in-out infinite',
        'confetti-fall': 'confettiFall 3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        levelUpGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(212, 165, 116, 0)' },
          '50%': { boxShadow: '0 0 40px 10px rgba(212, 165, 116, 0.4)' },
          '100%': { boxShadow: '0 0 0 0 rgba(212, 165, 116, 0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        streakFlame: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
        },
        badgeShine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        typing: {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.3' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 165, 116, 0.25)',
        'gold-glow-lg': '0 0 40px rgba(212, 165, 116, 0.35)',
        'inner-gold': 'inset 0 1px 0 rgba(212, 165, 116, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(212, 165, 116, 0.1) 50%, transparent 75%)',
      },
    },
  },
  plugins: [],
};
export default config;
