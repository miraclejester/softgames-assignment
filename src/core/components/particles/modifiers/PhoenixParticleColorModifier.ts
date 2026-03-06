import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";
import { ColorUtils } from "../../../math/ColorUtils";

/**
 * Modifies the color of particle during its lifetime
 */
export class PhoenixParticleColorModifier extends PhoenixParticleModifier {
    /**
     * Starting color
     */
    private _startColor: number = 0x000000;
    /**
     * Color by end of life
     */
    private _endColor: number = 0xffffff;

    /**
     * @param startColor - Starting color
     * @param endColor - Ending color
     */
    public constructor(startColor: number = 0x000000, endColor: number = 0xffffff) {
        super();
        this._startColor = startColor;
        this._endColor = endColor;
    }

    /**
     * Updates the particle's color based on lifetime
     * @param particle - Particle to update
     * @param _delta - unused
     * @param lifePercentage - Life percentage. Used as interpolation factor
     */
    public override updateParticle(particle: PhoenixParticle, _delta: number, lifePercentage: number): void {
        const color = ColorUtils.lerpColor(this._startColor, this._endColor, lifePercentage);
        particle.tint = color;
    }
}