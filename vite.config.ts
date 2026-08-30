import { defineConfig } from 'vite';

export default defineConfig({
    // Relative base so the build works when served from a GitHub Pages
    // project subpath (https://<user>.github.io/softgames-assignment/).
    base: './',
});
