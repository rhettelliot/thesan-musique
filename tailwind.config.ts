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
        canvas: '#0D0F12',
        surface: '#15181E',
        'surface-hi': '#1A1E24',
        ink: {
          DEFAULT: '#F4F3EE',
          2: '#9EA4B0',
          3: '#5C6370',
          ghost: 'rgba(244, 243, 238, 0.20)',
        },
        signal: '#FF5500',
        'signal-dim': 'rgba(255, 85, 0, 0.15)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-hi': 'rgba(255, 255, 255, 0.14)',
        cream: '#F4F3EE',
        // Legacy aliases
        void: {
          DEFAULT: '#0D0F12',
          raised: '#15181E',
          elevated: '#1A1E24',
          subtle: '#1C1C1C',
        },
        edge: {
          faint: 'rgba(244,243,238,0.07)',
          subtle: 'rgba(244,243,238,0.14)',
          medium: 'rgba(244,243,238,0.22)',
          bright: 'rgba(244,243,238,0.38)',
        },
        light: {
          DEFAULT: '#F4F3EE',
          dim: '#9EA4B0',
          muted: '#5C6370',
        },
      },
      fontFamily: {
        display: ['var(--font-body)', 'system-ui', 'sans-serif'],
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
