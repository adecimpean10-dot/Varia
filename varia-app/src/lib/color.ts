import * as culori from "culori";
import type { Oklch } from 'culori';

// Converters
const toOKLCH = culori.converter("oklch");
const toRGB = culori.converter("rgb");

// Oklch color type
//      mode?: "oklch";         // Color mode (can be "rgb", "oklch", etc.)
//      l: number;              // Lightness [0, 1]
//      c: number;              // Chroma [0, ~0.4]
//      h?: number | null;      // Hue [0, 360) or null

/** Internal: convert any CSS color/hex to Oklch or throw */
function convertColorToOklch(color: string): Oklch {
    const oklchColor = toOKLCH(color) as Oklch | undefined;
    
    if (!oklchColor || Number.isNaN(oklchColor.l))
    {
        throw new Error(`Invalid color: ${color}`);
    }
    
    return {
        mode: "oklch",
        l: oklchColor.l,
        c: oklchColor.c ?? 0,
        h: oklchColor.h 
    };
}

/** Internal: format Oklch back to clamped sRGB hex */
function convertOklchToHex(oklch: Oklch): string {
    const rgb = toRGB(oklch);
    return culori.formatHex(rgb);   
}

/**
 * Lighten
 * Increase lightness by a relative amount.
 * @param hex     Color like "#6750A4" or "rebeccapurple"
 * @param amount  
 */
export function lighten(hex: string, amount = 0.1) {
    let ok = convertColorToOklch(hex);

    const l = Math.min(1, ok.l + amount);

    return convertOklchToHex({ ...ok, l });
}

/**
 * Darken
 * Decrease lightness by a relative amount.
 * @param hex     Color like "#6750A4" or "rebeccapurple"
 * @param amount  
 */
export function darken(hex: string, amount = 0.1) {
    let ok = convertColorToOklch(hex);

    const l = Math.max(0, ok.l - amount);

    return convertOklchToHex({ ...ok, l });
}

/**
 * Saturate
 * Increase chroma (colorfulness) by a relative amount.
 * @param hex     Color like "#6750A4" or "rebeccapurple"
 * @param amount  0.0–1.0 typical (e.g., 0.1 = +10%). Can be >1, will just push harder.
 */
export function saturate(hex: string, amount: number): string {
    const ok = convertColorToOklch(hex);
    
    const amt = Number.isFinite(amount) ? amount : 0;
    const c = Math.max(0, ok.c * (1 + amt));
    
    return convertOklchToHex({ ...ok, c });     // ... = object spread (instead of creating a new object, it copies all properties from ok, then override c)
}

/**
 * Desaturate
 * Decrease chroma (colorfulness) by a relative amount.
 * @param hex     Color like "#6750A4"
 * @param amount  0.0–1.0 typical (0.1 = -10%). Values >=1 drive chroma toward 0.
 */
export function desaturate(hex: string, amount: number): string {
    const ok = convertColorToOklch(hex);
    
    const amt = Math.min(Math.max(amount, 0), 10); // keep it sane
    const c = Math.max(0, ok.c * (1 - amt));
    
    return convertOklchToHex({ ...ok, c });
}

// Rotate Hue
/**
 * Rotate hue by degrees in OKLCH space.
 * @param hex Color like "#6750A4"
 * @param deg Degrees to rotate (e.g., +20, -45)
 */
export function rotateHue(hex: string, deg: number): string {
    const ok = convertColorToOklch(hex);
    const d = Number.isFinite(deg) ? deg : 0;

    // Normalize to [0, 360)
    const h = (((ok.h ?? 0) + d) % 360 + 360) % 360;
    
    return convertOklchToHex({ ...ok, h });
}