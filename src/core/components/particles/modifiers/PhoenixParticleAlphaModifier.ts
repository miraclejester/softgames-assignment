import { PhoenixParticleModifier } from '../PhoenixParticleModifier';
import type { PhoenixParticle } from '../PhoenixParticle';
import { MathUtils } from '../../../math/MathUtils';

/**
 * Initializes and updates alpha during a particle's lifetime
 */
export class PhoenixParticleAlphaModifier extends PhoenixParticleModifier {
    /**
     * Alpha at start of the particle's life
     */
    private _startAlpha: number = 1;
    /**
     * Alpha by the end of the particle's life
     */
    private _endAlpha: number = 0;

    /**
     * Initialize the start and end alphas
     * @param startAlpha - Starting alpha
     * @param endAlpha - End alpha
     */
    public constructor(startAlpha: number = 1, endAlpha: number = 0) {
        super();
        this._startAlpha = startAlpha;
        this._endAlpha = endAlpha;
    }

    /**
     * Set the initial particle
     * @param particle - Particle to initialize
     */
    public override initializeParticle(particle: PhoenixParticle): void {
        particle.alpha = this._startAlpha;
    }

    /**
     * Update alpha based on the particle's life
     * @param particle - Particle to update
     * @param _delta - Unused
     * @param lifePercentage - Particle's life expressed as a percentage
     */
    public override updateParticle(particle: PhoenixParticle, _delta: number, lifePercentage: number): void {
        particle.alpha = MathUtils.lerp(this._startAlpha, this._endAlpha, lifePercentage);
    }
}