import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";

export class PhoenixParticleLifeModifier extends PhoenixParticleModifier {
    private _minLife: number = 0;
    private _maxLife: number = 1;

    public constructor(minLife: number = 0, maxLife: number = 1) {
        super();
        this._minLife = minLife;
        this._maxLife = maxLife;
    }

    public override initializeParticle(particle: PhoenixParticle): void {
        particle.maxLifeTime = this._minLife + Math.random() * (this._maxLife - this._minLife);
    }
}