import * as PIXI from 'pixi.js';
import { PhoenixParticleModifier } from '../PhoenixParticleModifier';
import type { PhoenixParticle } from '../PhoenixParticle';
import { PointUtils } from '../../../math/PointUtils';
import { MathUtils } from '../../../math/MathUtils';

/**
 * Modifies the speed of the particle over time
 */
export class PhoenixParticleSpeedModifier extends PhoenixParticleModifier {
    /**
     * Starting speed
     */
    private _startSpeed: number = 0;
    /**
     * End of life speed
     */
    private _endSpeed: number = 100;

    /**
     * @param startSpeed - Start speed
     * @param endSpeed - End Speed
     */
    public constructor(startSpeed: number = 0, endSpeed: number = 100) {
        super();
        this._startSpeed = startSpeed;
        this._endSpeed = endSpeed;
    }

    /**
     * Updates the particle speed based on the amount of life left
     * @param particle - Particle to update
     * @param delta - Time since last update. Used to make movement not frame dependant
     * @param lifePercentage - Life left. Used as a lerp factor
     */
    public override updateParticle(particle: PhoenixParticle, delta: number, lifePercentage: number): void {
        const speed = MathUtils.lerp(this._startSpeed, this._endSpeed, lifePercentage);
        const direction = PointUtils.rotatePoint(new PIXI.Point(1, 0), particle.rotation);
        particle.x += direction.x * speed * (delta / 1000);
        particle.y += direction.y * speed * (delta / 1000);
    }
}