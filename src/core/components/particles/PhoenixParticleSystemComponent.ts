import * as PIXI from 'pixi.js';
import { Component } from '../../Component';
import type { PhoenixParticleModifier } from './PhoenixParticleModifier';
import type { PhoenixPartileContainerOptions as PhoenixParticleContainerOptions } from './PhoenixParticleSystemTypes';
import { PhoenixParticle } from './PhoenixParticle';

export class PhoenixParticleSystemComponent extends Component {
    private _particleContainer: PIXI.ParticleContainer;
    private _options: PhoenixParticleContainerOptions;
    private _maxParticles: number = 100;
    private _spawnRate: number = 10;
    private _modifiers: PhoenixParticleModifier[] = [];
    private _particleSpritesheet: PIXI.Spritesheet;
    private _particleFrames: string[] = [];
    private _timeSinceLastSpawn: number = 0;

    public constructor(options: PhoenixParticleContainerOptions) {
        super();
        this._options = options;
    }

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

    public override update(delta: number): void {
        this._timeSinceLastSpawn += delta;
        while (this._timeSinceLastSpawn >= this._spawnRate) {
            this.addParticle();
            this._timeSinceLastSpawn -= this._spawnRate;
        }

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
        toRemove.forEach((particle: PhoenixParticle) => {
            this._particleContainer.removeParticle(particle);
        });
    }

    public addModifier(modifier: PhoenixParticleModifier): void {
        this._modifiers.push(modifier)
    }

    private addParticle(): void {
        if (this._particleContainer.particleChildren.length >= this._maxParticles) {
            return;
        }
        const frame: string = this._particleFrames[Math.floor(Math.random() * this._particleFrames.length)]!;
        const texture: PIXI.Texture = this._particleSpritesheet.textures[frame]!;
        const particle: PhoenixParticle = new PhoenixParticle({ 
            texture
        });
        this._modifiers.forEach((modifier: PhoenixParticleModifier) => {
            modifier.initializeParticle(particle); 
        });
        this._particleContainer.addParticle(particle);
    }
}