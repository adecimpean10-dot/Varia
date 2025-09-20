<script lang="ts">
  import { onMount } from 'svelte';
  import Button from './components/Button.svelte'
  import ColorDemo from './components/ColorDemo.svelte';
  import { lighten, darken } from "./lib/color";

  onMount(() => {
    console.log(lighten("#ff0000", 0.1));
    console.log(darken("#00ff00", 0.1));
  });
</script>

<main>
  <h1>Varia</h1>
  <div>
    <Button>Primary</Button>
    <Button variant="ghost">Ghost</Button>
    <ColorDemo base="#6750A6" />
  </div>
</main>

<style lang="scss"></style>