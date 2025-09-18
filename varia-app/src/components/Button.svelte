<script lang="ts">
    export let variant: 'primary' | 'ghost' = 'primary';
    export let disabled = false;
</script>

<button class={`varia-button ${variant}`} {disabled}>
    <slot />
</button>


<style lang="scss"></style>