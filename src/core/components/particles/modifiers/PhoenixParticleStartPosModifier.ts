import { PhoenixParticleModifier } from '../PhoenixParticleModifier';
import type { PhoenixParticle } from '../PhoenixParticle';
import { MathUtils } from '../../../math/MathUtils';

/**
 * Modifies the starting position of a particle
 */
export class PhoenixParticleStartPosModifier extends PhoenixParticleModifier {
    /**
     * Min position x
     */
    private _minX: number = 0;
    /**
     * Max position x
     */
    private _maxX: number = 0;
    /**
     * Min position y
     */
    private _minY: number = 0;
    /**
     * Max position y
     */
    private _maxY: number = 0;

    /**
     * @param minX - Min X
     * @param maxX - Max X
     * @param minY - Min Y
     * @param maxY - Max Y
     */
    public constructor(minX: number = 0, maxX: number = 0, minY: number = 0, maxY: number = 0) { 
        super();
        this._minX = minX;
        this._maxX = maxX;
        this._minY = minY;
        this._maxY = maxY;
    }

    /**
     * Initializes the particle's position
     * @param particle - Particle to update
     */
    public override initializeParticle(particle: PhoenixParticle): void {
        particle.x = MathUtils.randomRange(this._minX, this._maxX);
        particle.y = MathUtils.randomRange(this._minY, this._maxY);
    }
}