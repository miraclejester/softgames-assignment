import { MathUtils } from "./MathUtils";

/**
 * Utility functions operating on colors
 */
export class ColorUtils {
    /**
     * Interpolate between two color values
     * @param startColor - Starting color
     * @param endColor - End Color
     * @param t - Lerp factor (0-1)
     * @returns The interpolated color
     */
    public static lerpColor(startColor: number, endColor: number, t: number): number {
        // Get the RGB components of the start and end colors
        const startRed: number = (startColor >> 16) & 0xff;
        const startGreen: number = (startColor >> 8) & 0xff;
        const startBlue: number = startColor & 0xff;

        const endRed: number = (endColor >> 16) & 0xff;
        const endGreen: number = (endColor >> 8) & 0xff;
        const endBlue: number = endColor & 0xff;

        // Interpolate each component
        const red: number = Math.round(MathUtils.lerp(startRed, endRed, t));
        const green: number = Math.round(MathUtils.lerp(startGreen, endGreen, t));
        const blue: number = Math.round(MathUtils.lerp(startBlue, endBlue, t));

        // Place back the components bitwise into the final color value
        return (red << 16) | (green << 8) | blue;
    }
}