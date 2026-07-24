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
      backgroundImage: {
        'grid-lines': `linear-gradient(rgba(0,255,221,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,221,0.18) 1px, transparent 1px)`,
        'scanlines': `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,221,0.08) 3px, rgba(0,255,221,0.08) 4px)`,
        'scanlines-heavy': `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,221,0.14) 2px, rgba(0,255,221,0.14) 3px)`,
        'topo-lines': `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 28px, rgba(0,255,221,0.10) 28px, rgba(0,255,221,0.10) 29px, transparent 30px)`,
        'stamp-grain': `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        'wireframe-tunnel': `linear-gradient(rgba(0,255,221,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,221,0.28) 1px, transparent 1px)`,
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
        'strobe-cycle': {
          '0%, 100%': { opacity: '0.0' },
          '5%': { opacity: '0.7' },
          '8%': { opacity: '0.0' },
          '12%': { opacity: '0.45' },
          '15%': { opacity: '0.0' },
          '22%': { opacity: '0.6' },
          '26%': { opacity: '0.0' },
          '40%': { opacity: '0.2' },
          '45%': { opacity: '0.0' },
          '60%': { opacity: '0.35' },
          '68%': { opacity: '0.0' },
          '80%': { opacity: '0.15' },
          '90%': { opacity: '0.0' },
        },
        'tunnel-pulse': {
          '0%': { transform: 'scale(0.96) perspective(800px) translateZ(-120px)', opacity: '0.35' },
          '50%': { transform: 'scale(1.02) perspective(800px) translateZ(0px)', opacity: '0.55' },
          '100%': { transform: 'scale(0.96) perspective(800px) translateZ(-120px)', opacity: '0.35' },
        },
        'grid-scan': {
          '0%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(8px)' },
        },
        'data-tick': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-connector': {
          '0%, 100%': { opacity: '0.15', strokeDashoffset: '0' },
          '50%': { opacity: '0.55', strokeDashoffset: '-20' },
        },
        'stamp-jitter': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-0.5px, 0.5px)' },
          '50%': { transform: 'translate(0.5px, -0.5px)' },
          '75%': { transform: 'translate(-0.5px, -0.5px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s cubic-bezier(0, 0, 0.25, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0, 0, 0.25, 1) forwards',
        flicker: 'flicker 3s ease-in-out infinite',
        'strobe-reveal': 'strobe-reveal 1.2s steps(1, end) forwards',
        'strobe-flash': 'strobe-flash 0.6s steps(1, end) forwards',
        'strobe-cycle': 'strobe-cycle 3.2s steps(1, end) infinite',
        'tunnel-pulse': 'tunnel-pulse 8s ease-in-out infinite',
        'grid-scan': 'grid-scan 2.4s ease-in-out infinite alternate',
        'data-tick': 'data-tick 1.2s steps(1, end) infinite',
        'pulse-connector': 'pulse-connector 2.4s ease-in-out infinite',
        'stamp-jitter': 'stamp-jitter 0.35s steps(2, end) infinite',
        marquee: 'marquee 24s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
