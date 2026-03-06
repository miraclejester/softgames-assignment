import type { PhoenixParticle } from './PhoenixParticle';

/**
 * Base class for all the particle modifiers
 * In charge of initializing and updating particles over time
 */
export abstract class PhoenixParticleModifier {
    /**
     * Called during particle initialization
     * @param _particle - Particle to initialize
     */
    initializeParticle(_particle: PhoenixParticle): void { /* override me */};
    /**
     * Calling as the particle updates
     * @param _particle - Particle to update
     * @param _delta - Time since last update in milliseconds
     * @param _lifePercentage - Percentage (0-1) of life for the particle
     */
    updateParticle(_particle: PhoenixParticle, _delta: number, _lifePercentage: number): void { /* override me */};
}