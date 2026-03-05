import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";

export class PhoenixParticleScaleModifier extends PhoenixParticleModifier {
    private _startScale: number = 1;
    private _endScale: number = 2;

    public constructor(startScale: number = 1, endScale: number = 2) {
        super();
        this._startScale = startScale;
        this._endScale = endScale;
    }

    public override updateParticle(particle: PhoenixParticle, _delta: number, lifePercentage: number): void {
        const scale = this._startScale + (this._endScale - this._startScale) * lifePercentage;
        particle.scaleX = scale;
        particle.scaleY = scale;
    }
}