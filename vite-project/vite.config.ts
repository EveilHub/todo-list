/// <reference types="vitest" />
import { defineConfig } from 'vite'
//import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: './src/test/setup.ts',
  //   coverage: {
  //     exclude: [
  //       '**/*.css',
  //       '**/*.scss',
  //       '**/*.sass',
  //       '**/*.less',
  //       'src/lib/definitions.ts',
  //     ]
  //   }
  // },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});