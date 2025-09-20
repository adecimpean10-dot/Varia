<script lang="ts">
    import { onMount } from 'svelte';
    import { lighten, darken, saturate, desaturate, rotateHue } from '../lib/color';
    
    export let base: string = '#6750A4'; // default base color

    // Make a small, opinionated set of variants
    const variants = [
        { label: 'Base',        color: base },
        { label: 'Light +10%',  color: lighten(base, 0.10) },
        { label: 'Dark  -10%',  color: darken(base, 0.10) },
        { label: 'Sat  +10%',   color: saturate(base, 0.10) },
        { label: 'Desat -10%',  color: desaturate(base, 0.10) },
        { label: 'Hue +20°',    color: rotateHue(base, 20) }
    ];

    onMount(() => {
        // Log once for a quick sanity check
        console.group('ColorDemo');
        console.log('Base:', base);
        
        for (const v of variants) console.log(v.label, v.color);
            console.groupEnd();
    });
</script>

<div class="color-demo-wrapper">
    {#each variants as v}
        <div class="swatch" style="background: {v.color}">
            <div class="row">
                <span class="pill">{v.label}</span>
                <span class="mono">{v.color}</span>
            </div>

            <!-- Eyeball contrast: show text in black and white on the swatch -->
            <div class="samples">
                <span style="color: #000">Aa</span>
                <span style="color: #fff">Aa</span>
            </div>
        </div>
    {/each}
</div>

<style>
    .color-demo-wrapper {
        margin: 1rem 0.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
    }
    
    .swatch {
        border-radius: 12px;
        padding: 12px;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 0 0 1px rgba(0,0,0,.06) inset, 0 1px 2px rgba(0,0,0,.08);
    }

    .row {
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        opacity: 0.9;
    }

    .samples {
        display: flex;
        gap: 8px;
        font-weight: 700;
    }
    
    .pill {
        border-radius: 8px;
        padding: 2px 6px;
        background: rgba(255,255,255,.18);
        color: rgba(0,0,0,.75);
        font-weight: 600;
        font-size: 11px;
    }

    .mono {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
</style>