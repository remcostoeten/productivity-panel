// colorUtils.tsx

// Helper function to parse color strings
const parseColor = (color: string): string => {
  // Check if it's a Tailwind-style class
  if (color.startsWith('text-') || color.startsWith('bg-')) {
    // This is a simplified approach. You might need to map Tailwind colors to actual values
    const parts = color.split('-');
    const shade = parts[parts.length - 1];
    const baseColor = parts[parts.length - 2];
    // This is a placeholder. You'd need a proper Tailwind color mapping here
    return `#000000`; // Return a default color for now
  }

  // Check if it's a hex value
  if (color.startsWith('#')) {
    return color;
  }

  // Check if it's an RGB or RGBA value
  if (color.startsWith('rgb')) {
    const vals = color.match(/\d+/g);
    if (vals) {
      return vals.length === 3
        ? `rgb(${vals[0]}, ${vals[1]}, ${vals[2]})`
        : `rgba(${vals[0]}, ${vals[1]}, ${vals[2]}, ${vals[3]})`;
    }
  }

  // If it's a named color or CSS variable, return as is
  return color;
};

// Convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Convert RGB to HSL
const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } => {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return { h, s, l };
};

// Convert HSL to RGB
const hslToRgb = (
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) {
        t += 1;
      }

      if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }

      if (t < 1 / 2) {
        return q;
      }

      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

// Main function to adjust color lightness
export const adjustColorLightness = (color: string, amount: number): string => {
  const parsedColor = parseColor(color);

  // If it's a CSS variable or named color, we can't modify it
  if (parsedColor.startsWith('var(') || !parsedColor.startsWith('#')) {
    return parsedColor;
  }

  const rgb = hexToRgb(parsedColor);

  if (!rgb) {
    return parsedColor;
  }

  const { r, g, b } = rgb;
  let { h, s, l } = rgbToHsl(r, g, b);

  // Adjust lightness
  l = Math.max(0, Math.min(1, l + amount));

  const { r: r2, g: g2, b: b2 } = hslToRgb(h, s, l);

  // Convert back to hex
  return `#${((1 << 24) | (r2 << 16) | (g2 << 8) | b2).toString(16).slice(1)}`;
};

// Helper function to darken color
export const darken = (color: string, percentage: number): string =>
  adjustColorLightness(color, -percentage / 100);

// Helper function to lighten color
export const lighten = (color: string, percentage: number): string =>
  adjustColorLightness(color, percentage / 100);

//   Usage example:
// const ColorComponent: React.FC = () => {
//     const darkeredColor = darken('text-red-400', 5); // Darken by 5%
//     const lightenedColor = lighten('#ff0000', 10); // Lighten by 10%
//     const adjustedRgba = darken('rgba(255, 0, 0, 0.5)', 15); // Darken by 15%

//     return (
//       <div>
//         <div style={{ color: darkeredColor }}>Darkened Color</div>
//         <div style={{ color: lightenedColor }}>Lightened Color</div>
//         <div style={{ color: adjustedRgba }}>Adjusted RGBA Color</div>
//       </div>
//     );
//   };
