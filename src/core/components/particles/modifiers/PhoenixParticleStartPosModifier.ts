import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";

export class PhoenixParticleStartPosModifier extends PhoenixParticleModifier {
    private _minX: number = 0;
    private _maxX: number = 0;
    private _minY: number = 0;
    private _maxY: number = 0;

    public constructor(minX: number = 0, maxX: number = 0, minY: number = 0, maxY: number = 0) { 
        super();
        this._minX = minX;
        this._maxX = maxX;
        this._minY = minY;
        this._maxY = maxY;
    }

    public override initializeParticle(particle: PhoenixParticle): void {
        particle.x = this._minX + Math.random() * (this._maxX - this._minX);
        particle.y = this._minY + Math.random() * (this._maxY - this._minY);
    }
}