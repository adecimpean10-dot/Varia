import * as culori from "culori";

// Convert hex to OKLCH
export function hexToOklch(hex: string) {
    return culori.converter("oklch")(hex);
}

// Convert OKLCH back to hex
export function oklchToHex(oklch: culori.Color) {
    return culori.formatHex(oklch);
}

// Lighten by increasing lightness
export function lighten(hex: string, amount = 0.1) {
    let c = hexToOklch(hex);
    
    if (!c || c.mode !== "oklch") 
        return hex;
    
    c.l = Math.min(1, c.l + amount);
    return oklchToHex(c);
}

// Darken by decreasing lightness
export function darken(hex: string, amount = 0.1) {
    let c = hexToOklch(hex);

    if (!c || c.mode !== "oklch") 
        return hex;

    c.l = Math.max(0, c.l - amount);
    return oklchToHex(c);
}

// Temporary test logs
console.log(lighten("#ff0000", 0.1)); // expect lighter red
console.log(darken("#00ff00", 0.1));  // expect darker green