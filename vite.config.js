import { defineConfig } from 'vite';

// base: './' makes the built files use relative paths, so the app works
// whether it's deployed at a domain root or in a sub-folder.
export default defineConfig({
  base: './',
});
