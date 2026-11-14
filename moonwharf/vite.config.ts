import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
// Builds to one self-contained dist/index.html so it can be published as a single page.
export default defineConfig({ plugins: [viteSingleFile()], test: { globals: true } } as any);
