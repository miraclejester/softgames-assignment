import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";
import { ColorUtils } from "../../../math/ColorUtils";

export class PhoenixParticleColorModifier extends PhoenixParticleModifier {
    private _startColor: number = 0x000000;
    private _endColor: number = 0xffffff;

    public constructor(startColor: number = 0x000000, endColor: number = 0xffffff) {
        super();
        this._startColor = startColor;
        this._endColor = endColor;
    }

    public override updateParticle(particle: PhoenixParticle, _delta: number, lifePercentage: number): void {
        const color = ColorUtils.lerpColor(this._startColor, this._endColor, lifePercentage);
        particle.tint = color;
    }
}