import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";
import { MathUtils } from "../../../math/MathUtils";

/**
 * Modifies the min and max life of a particle during initialization
 */
export class PhoenixParticleLifeModifier extends PhoenixParticleModifier {
    /**
     * Minimum amount of life in milliseconds
     */
    private _minLife: number = 0;
    /**
     * Maximum amount of life in milliseconds
     */
    private _maxLife: number = 1;

    /**
     * @param minLife - Min life 
     * @param maxLife - Max life
     */
    public constructor(minLife: number = 0, maxLife: number = 1) {
        super();
        this._minLife = minLife;
        this._maxLife = maxLife;
    }

    /**
     * Initialize's a particle's life at random between minLife and maxLife
     * @param particle - Particle to initialize
     */
    public override initializeParticle(particle: PhoenixParticle): void {
        particle.maxLifeTime = MathUtils.randomRange(this._minLife, this._maxLife);
    }
}