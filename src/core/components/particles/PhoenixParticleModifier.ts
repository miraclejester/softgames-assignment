import type { PhoenixParticle } from './PhoenixParticle';

export abstract class PhoenixParticleModifier {
    initializeParticle(_particle: PhoenixParticle): void { /* override me */};
    updateParticle(_particle: PhoenixParticle, _delta: number, _lifePercentage: number): void { /* override me */};
}