import * as PIXI from 'pixi.js';
import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";
import { PointUtils } from "../../../math/PointUtils";

export class PhoenixParticleSpeedModifier extends PhoenixParticleModifier {
    private _startSpeed: number = 0;
    private _endSpeed: number = 100;

    public constructor(startSpeed: number = 0, endSpeed: number = 100) {
        super();
        this._startSpeed = startSpeed;
        this._endSpeed = endSpeed;
    }

    public override updateParticle(particle: PhoenixParticle, delta: number, lifePercentage: number): void {
        const speed = this._startSpeed + (this._endSpeed - this._startSpeed) * lifePercentage;
        const direction = PointUtils.rotatePoint(new PIXI.Point(1, 0), particle.rotation);
        particle.x += direction.x * speed * (delta / 1000);
        particle.y += direction.y * speed * (delta / 1000);
    }
}