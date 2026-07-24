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
        // Void Architecture — absolute black, depth carved from nothing
        void: {
          DEFAULT: '#000000',
          raised: '#0C0C0C',
          elevated: '#141414',
          subtle: '#1C1C1C',
        },
        // Single Signal — warehouse cyan. Active states, key data, section labels only.
        signal: {
          DEFAULT: '#00FFDD',
          dim: '#00B29B',
        },
        edge: {
          faint: 'rgba(255,255,255,0.06)',
          subtle: 'rgba(255,255,255,0.12)',
          medium: 'rgba(255,255,255,0.2)',
          bright: 'rgba(255,255,255,0.35)',
        },
        light: {
          DEFAULT: '#F0F0F0',
          dim: '#A6A6A6',
          muted: '#767676',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        enter: 'cubic-bezier(0, 0, 0.25, 1)',
        exit: 'cubic-bezier(0.75, 0, 1, 1)',
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
        flicker: {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '0.8' },
          '20%': { opacity: '1' },
          '40%': { opacity: '0.6' },
          '50%': { opacity: '1' },
          '70%': { opacity: '0.9' },
          '80%': { opacity: '1' },
        },
        'strobe-reveal': {
          '0%': { opacity: '0', transform: 'scaleY(1.05)' },
          '5%': { opacity: '1', transform: 'scaleY(1)' },
          '8%': { opacity: '0' },
          '12%': { opacity: '1' },
          '18%': { opacity: '0.4' },
          '25%': { opacity: '1' },
          '35%': { opacity: '0.7' },
          '45%': { opacity: '1' },
          '55%': { opacity: '0.85' },
          '70%': { opacity: '1' },
          '85%': { opacity: '0.95' },
          '100%': { opacity: '1', transform: 'scaleY(1)' },
        },
        'strobe-flash': {
          '0%': { opacity: '0' },
          '10%': { opacity: '0.8' },
          '20%': { opacity: '0' },
          '30%': { opacity: '0.5' },
          '35%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s cubic-bezier(0, 0, 0.25, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0, 0, 0.25, 1) forwards',
        flicker: 'flicker 3s ease-in-out infinite',
        'strobe-reveal': 'strobe-reveal 1.2s steps(1, end) forwards',
        'strobe-flash': 'strobe-flash 0.6s steps(1, end) forwards',
        marquee: 'marquee 24s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
