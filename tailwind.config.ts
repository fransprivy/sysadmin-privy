import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Figma: bg/*
        background: 'var(--bg-default)',
        layer1: 'var(--bg-layer1)',
        'bg-alpha': 'var(--bg-default-alpha)',
        info: 'var(--bg-info)',
        success: 'var(--bg-success)',
        inverse: 'var(--bg-inverse)',

        // Figma: fg/*
        foreground: 'var(--fg-default)',
        subtle: 'var(--fg-subtle)',
        subtlest: 'var(--fg-subtlest)',
        link: 'var(--fg-link)',
        'info-fg': 'var(--fg-info)',
        'success-fg': 'var(--fg-success)',

        // Figma: border/*
        border: 'var(--border-default)',

        // Figma: brand/* and palette
        accent: 'var(--brand-accent)',
        logo: 'var(--brand-logo)',
        blue40: 'var(--blue-40)',
        green40: 'var(--green-40)',
        teal40: 'var(--teal-40)',
        orange40: 'var(--orange-40)',
        purple40: 'var(--purple-40)',
        red40: 'var(--red-40)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Figma type ramp: body/caption2, body/caption1, body/p2, body/p1, heading/h6
        caption2: ['11px', { lineHeight: '16px', letterSpacing: '0.4px' }],
        caption1: ['12px', { lineHeight: '16px', letterSpacing: '0.2px' }],
        p2: ['14px', { lineHeight: '20px', letterSpacing: '0.2px' }],
        p1: ['16px', { lineHeight: '24px', letterSpacing: '0.2px' }],
        b1: ['16px', { lineHeight: '24px', letterSpacing: '0.4px' }],
        h6: ['20px', { lineHeight: 'normal', letterSpacing: '0px' }],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        small: 'var(--shadow-small)',
        medium: 'var(--shadow-medium)',
      },
      spacing: {
        topbar: 'var(--topbar-height)',
        sidebar: 'var(--sidebar-width)',
      },
      maxWidth: {
        content: 'var(--content-max-width)',
      },
    },
  },
  plugins: [],
};
export default config;
