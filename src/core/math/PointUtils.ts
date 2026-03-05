import * as PIXI from 'pixi.js';

/**
 * Utility class for Point/Vector operations
 */
export class PointUtils {
    public static rotatePoint(point: PIXI.Point, angle: number): PIXI.Point {
        const c: number = Math.cos(angle);
        const s: number = Math.sin(angle);
        return new PIXI.Point(
            point.x * c - point.y * s,
            point.x * s + point.y * c
        );
    }

    public static degreesToRadians(deg: number): number {
        return deg * (Math.PI / 180);
    }
}