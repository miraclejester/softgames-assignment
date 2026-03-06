/**
 * Utility math methods
 */
export class MathUtils {
    /**
     * Linear interpolation of two values by a 0-1 factor
     * @param start - Start value
     * @param end - End Value
     * @param t - 0-1 factor
     * @returns - Interpolated value
     */
    public static lerp(start: number, end: number, t: number): number {
        return start + (end - start) * t;
    }

    /**
     * @param start - Start of range
     * @param end - End of range
     * @returns A random number between start and end
     */
    public static randomRange(start: number, end: number): number {
        return start + Math.random() * (end - start);
    }
}