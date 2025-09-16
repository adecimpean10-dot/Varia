import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/src/styles/_globals.scss" as *;'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
