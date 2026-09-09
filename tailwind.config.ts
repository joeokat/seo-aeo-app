import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EDEBE1',
        ink: '#151F1B',
        'ink-soft': '#4B5650',
        found: '#2F7A52',
        'found-soft': '#DCEADF',
        signal: '#D98A2B',
        'signal-soft': '#F4E4CB',
        quiet: '#8C9490',
        line: '#D8D5C8'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        data: ['"IBM Plex Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
export default config
