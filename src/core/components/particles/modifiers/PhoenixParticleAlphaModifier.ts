import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";

export class PhoenixParticleAlphaModifier extends PhoenixParticleModifier {
    private _startAlpha: number = 1;
    private _endAlpha: number = 0;

    public constructor(startAlpha: number = 1, endAlpha: number = 0) {
        super();
        this._startAlpha = startAlpha;
        this._endAlpha = endAlpha;
    }

    public override initializeParticle(particle: PhoenixParticle): void {
        particle.alpha = this._startAlpha;
    }

    public override updateParticle(particle: PhoenixParticle, _delta: number, lifePercentage: number): void {
        particle.alpha = this._startAlpha + (this._endAlpha - this._startAlpha) * lifePercentage;
    }
}