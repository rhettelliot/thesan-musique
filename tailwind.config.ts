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
        void: {
          DEFAULT: '#000000',
          raised: '#0C0C0C',
          elevated: '#141414',
          subtle: '#1C1C1C',
        },
        signal: {
          DEFAULT: '#00FFDD',
          dim: '#00B29B',
        },
        cream: {
          DEFAULT: '#ECE8D9',
          dim: '#C9C5B8',
          muted: '#8A877D',
        },
        edge: {
          faint: 'rgba(236,232,217,0.07)',
          subtle: 'rgba(236,232,217,0.14)',
          medium: 'rgba(236,232,217,0.22)',
          bright: 'rgba(236,232,217,0.38)',
        },
        light: {
          DEFAULT: '#ECE8D9',
          dim: '#C9C5B8',
          muted: '#8A877D',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s cubic-bezier(0, 0, 0.25, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0, 0, 0.25, 1) forwards',
        marquee: 'marquee 18s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
