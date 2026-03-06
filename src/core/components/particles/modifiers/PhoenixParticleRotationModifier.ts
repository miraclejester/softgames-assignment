import { PhoenixParticleModifier } from '../PhoenixParticleModifier';
import type { PhoenixParticle } from '../PhoenixParticle';
import { PointUtils } from '../../../math/PointUtils';
import { MathUtils } from '../../../math/MathUtils';

/**
 * Modifies the rotation of a particle during initialization
 */
export class PhoenixParticleRotationModifier extends PhoenixParticleModifier {
    /**
     * Minimum rotation in degrees
     */
    private _minRotation: number = 0;
    /**
     * Maximum rotation in degrees
     */
    private _maxRotation: number = 360;

    /**
     * @param minRotation - Min Rotation
     * @param maxRotation - Max Rotation
     */
    public constructor(minRotation: number = 0, maxRotation: number = 360) {
        super();
        this._minRotation = PointUtils.degreesToRadians(minRotation);
        this._maxRotation = PointUtils.degreesToRadians(maxRotation);
    }

    /**
     * Sets the particle rotation to a random value between min rotation and max rotation
     * @param particle - Particle to initialize
     */
    public override initializeParticle(particle: PhoenixParticle): void {
        particle.rotation = MathUtils.randomRange(this._minRotation, this._maxRotation);
    }
}