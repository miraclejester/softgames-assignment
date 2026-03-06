import * as PIXI from 'pixi.js';
import { Component } from '../../Component';
import type { PhoenixParticleModifier } from './PhoenixParticleModifier';
import type { PhoenixPartileContainerOptions as PhoenixParticleContainerOptions } from './PhoenixParticleSystemTypes';
import { PhoenixParticle } from './PhoenixParticle';

/**
 * Light particle system implementation made for Phoenix Flame,
 * It can be extended with new modifiers
 */
export class PhoenixParticleSystemComponent extends Component {
    /**
     * Internal PIXI.ParticleContainer that this manages
     */
    private _particleContainer: PIXI.ParticleContainer;
    /**
     * Options for the particle system in general. Passed during construction
     */
    private _options: PhoenixParticleContainerOptions;
    /**
     * Max amount of particles that can be alive at any time.
     * If the particle system attempts to spawn a new particle
     * while the max amount is alive, it won't spawn it
     */
    private _maxParticles: number = 100;
    /**
     * Time in milliseconds between new particle spawns
     */
    private _spawnRate: number = 10;
    /**
     * List of currently active particle modifiers
     */
    private _modifiers: PhoenixParticleModifier[] = [];
    /**
     * The spritesheet used for the particle assets
     */
    private _particleSpritesheet: PIXI.Spritesheet;
    /**
     * List of aliases for the particle frames on the spritesheet
     */
    private _particleFrames: string[] = [];
    /**
     * Tracks time passed since last time a particle was spawned
     */
    private _timeSinceLastSpawn: number = 0;

    /**
     * @param options - Particle system options 
     */
    public constructor(options: PhoenixParticleContainerOptions) {
        super();
        this._options = options;
    }

    /**
     * Initializes private variables and creates the particle cotnainer
     * Adds the container to the parent GameObject
     */
    public override ready(): void {
        this._maxParticles = this._options.maxParticles;
        this._particleContainer = new PIXI.ParticleContainer({
            dynamicProperties: {
                scale: this._options.scale ?? true,
                position: this._options.position ?? true,
                rotation: this._options.rotation ?? false,
                alpha: this._options.alpha ?? true,
                color: this._options.color ?? true
            }
        });
        if (this._options.modifiers) {
            this._modifiers = this._options.modifiers;
        }
        this._particleSpritesheet = this._options.spritesheet;
        this._particleFrames = this._options.frames;
        this.gameObject.addChild(this._particleContainer);
    }

    /**
     * Updates particles and spawns new ones if needed
     * @param delta - Time since last update in milliseconds
     */
    public override update(delta: number): void {
        // If enough time has passed, attempt to spawn particles
        this._timeSinceLastSpawn += delta;
        while (this._timeSinceLastSpawn >= this._spawnRate) {
            this.addParticle();
            this._timeSinceLastSpawn -= this._spawnRate;
        }

        // Determine which particles are at the end of their lifecycle and prepare to remove them
        // Also have the modifier update all particles
        const toRemove: PhoenixParticle[] = [];
        this._particleContainer.particleChildren.forEach((particle: PIXI.IParticle) => {
            if (!(particle instanceof PhoenixParticle)) {
                return;
            }

            particle.lifeTime += delta;

            if (particle.isDead) {
                toRemove.push(particle);
                return;
            }
            this._modifiers.forEach((modifier: PhoenixParticleModifier) => {
                modifier.updateParticle(particle, delta, particle.lifeTimePercentage);
            });
        });

        // Remove all dead particles
        toRemove.forEach((particle: PhoenixParticle) => {
            this._particleContainer.removeParticle(particle);
        });
    }

    /**
     * Spawn a new particle unless the max amount has been reached
     * Calls the initialize function on all active modifiers
     * The particle asset is selected at random from the spritesheet
     */
    private addParticle(): void {
        if (this._particleContainer.particleChildren.length >= this._maxParticles) {
            return;
        }
        const frame: string = this._particleFrames[Math.floor(Math.random() * this._particleFrames.length)]!;
        const texture: PIXI.Texture | undefined = this._particleSpritesheet.textures[frame];
        if (!(texture)) {
            return
        }

        const particle: PhoenixParticle = new PhoenixParticle({ 
            texture
        });
        this._modifiers.forEach((modifier: PhoenixParticleModifier) => {
            modifier.initializeParticle(particle); 
        });
        this._particleContainer.addParticle(particle);
    }
}