import { PhoenixParticleModifier } from "../PhoenixParticleModifier";
import type { PhoenixParticle } from "../PhoenixParticle";
import { PointUtils } from "../../../math/PointUtils";

export class PhoenixParticleRotationModifier extends PhoenixParticleModifier {
    private _minRotation: number = 0;
    private _maxRotation: number = 360;

    public constructor(minRotation: number = 0, maxRotation: number = 360) {
        super();
        this._minRotation = PointUtils.degreesToRadians(minRotation);
        this._maxRotation = PointUtils.degreesToRadians(maxRotation);
    }

    public override initializeParticle(particle: PhoenixParticle): void {
        particle.rotation = this._minRotation + Math.random() * (this._maxRotation - this._minRotation);
    }
}