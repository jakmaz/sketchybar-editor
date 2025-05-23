// Helper function to convert 0xAARRGGBB hex to CSS rgba
export function argbToRgba(argbHex: string): string {
  try {
    // Handle 0xAARRGGBB format
    if (argbHex.startsWith("0x") && argbHex.length === 10) {
      const hex = argbHex.substring(2); // Remove '0x' prefix
      const a = parseInt(hex.slice(0, 2), 16) / 255;
      const r = parseInt(hex.slice(2, 4), 16);
      const g = parseInt(hex.slice(4, 6), 16);
      const b = parseInt(hex.slice(6, 8), 16);

      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    // Return the original value if it doesn't match expected formats
    return argbHex;
  } catch (e) {
    console.error("Error parsing color:", e);
    return argbHex; // Return original on error
  }
}
