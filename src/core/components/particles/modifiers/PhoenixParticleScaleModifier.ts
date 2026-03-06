import { PhoenixParticleModifier } from '../PhoenixParticleModifier';
import type { PhoenixParticle } from '../PhoenixParticle';
import { MathUtils } from '../../../math/MathUtils';

/**
 * Modifies a particle's scale over time
 */
export class PhoenixParticleScaleModifier extends PhoenixParticleModifier {
    /**
     * Starting scale
     */
    private _startScale: number = 1;
    /**
     * Ending scale
     */
    private _endScale: number = 2;

    /**
     * @param startScale - Start scale
     * @param endScale - End Scale
     */
    public constructor(startScale: number = 1, endScale: number = 2) {
        super();
        this._startScale = startScale;
        this._endScale = endScale;
    }

    /**
     * Updates a particle's scale over its lifetime
     * @param particle - Particle to update
     * @param _delta - Unused
     * @param lifePercentage - Percentage of life. Used as lerp factor
     */
    public override updateParticle(particle: PhoenixParticle, _delta: number, lifePercentage: number): void {
        const scale = MathUtils.lerp(this._startScale, this._endScale, lifePercentage);
        particle.scaleX = scale;
        particle.scaleY = scale;
    }
}