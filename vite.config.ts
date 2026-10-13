import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrgPage = repositoryName?.endsWith('.github.io');
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserOrOrgPage
  ? `/${repositoryName}/`
  : '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
