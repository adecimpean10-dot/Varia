import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  preprocess: vitePreprocess({
    style: {
      scss: {
        prependData: '@use "/src/styles/_globals.scss" as *;'
      }
    }
  })
};
