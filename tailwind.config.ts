import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(0 0% 3.6%)',
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(0 0% 3.6%)',
        popover: 'hsl(0 0% 100%)',
        'popover-foreground': 'hsl(0 0% 3.6%)',
        muted: 'hsl(0 0% 96.1%)',
        'muted-foreground': 'hsl(0 0% 45.1%)',
        accent: 'hsl(0 0% 9.0%)',
        'accent-foreground': 'hsl(0 0% 100%)',
        destructive: 'hsl(0 84.2% 60.2%)',
        'destructive-foreground': 'hsl(0 0% 100%)',
        border: 'hsl(0 0% 89.8%)',
        input: 'hsl(0 0% 89.8%)',
        ring: 'hsl(0 0% 3.6%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
export default config;
