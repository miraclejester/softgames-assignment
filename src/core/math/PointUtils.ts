import * as PIXI from 'pixi.js';

/**
 * Utility class for Point/Vector operations
 */
export class PointUtils {
    /**
     * Given a vector, returns the vector rotated at an angle
     * @param point - Vector to rotate
     * @param angle - Angle to rotate by, in radians
     * @returns Rotated vector
     */
    public static rotatePoint(point: PIXI.Point, angle: number): PIXI.Point {
        const c: number = Math.cos(angle);
        const s: number = Math.sin(angle);
        return new PIXI.Point(
            point.x * c - point.y * s,
            point.x * s + point.y * c
        );
    }

    /**
     * Converts a degrees value into radians
     * @param deg - Degrees value
     * @returns Value in radians 
     */
    public static degreesToRadians(deg: number): number {
        return deg * (Math.PI / 180);
    }
}