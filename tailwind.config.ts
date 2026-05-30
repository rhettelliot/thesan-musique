import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Thesan Musique — warehouse / rave / bass pressure
        void: {
          DEFAULT: '#000000',
          raised: '#080808',
          elevated: '#0F0F0F',
          subtle: '#161616',
        },
        // Neon Cyan — main signal (not blue, not purple — pure rave cyan)
        neon: {
          DEFAULT: '#00FFDD',
          dim: '#00CCB3',
          glow: '#00FFDD26',
          hot: '#00FFDD',
        },
        // Magenta Flash — secondary, bass hits, strobe accents
        mag: {
          DEFAULT: '#FF0066',
          dim: '#CC0052',
          glow: '#FF006622',
        },
        // Warning Yellow — tempo markers, BPM data
        volt: {
          DEFAULT: '#FFE600',
          dim: '#CCB800',
        },
        edge: {
          faint: 'rgba(255,255,255,0.05)',
          subtle: 'rgba(255,255,255,0.1)',
          medium: 'rgba(255,255,255,0.18)',
          bright: 'rgba(255,255,255,0.35)',
        },
        light: {
          DEFAULT: '#F0F0F0',
          dim: '#A0A0A0',
          muted: '#555555',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        strobe: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'bass-pulse': {
          '0%, 100%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(1.4)' },
        },
        'eq-bar': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '0.8' },
          '20%': { opacity: '1' },
          '40%': { opacity: '0.6' },
          '50%': { opacity: '1' },
          '70%': { opacity: '0.9' },
          '80%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        strobe: 'strobe 0.15s ease-in-out 3',
        'bass-pulse': 'bass-pulse 0.6s ease-in-out infinite',
        'eq-bar': 'eq-bar 0.8s ease-in-out infinite',
        flicker: 'flicker 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config