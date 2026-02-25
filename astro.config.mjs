import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rovshenashirov.github.io',
  output: 'static',
  build: {
    format: 'directory'
  },
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
  publicDir: './public'
});