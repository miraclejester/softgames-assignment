import * as PIXI from 'pixi.js';

/**
 * Particles to use with the PhoenixParticleSystem
 * Extends PIXI's particle with life tracking
 */
export class PhoenixParticle extends PIXI.Particle {
    /**
     * Max life for this particle in milliseconds
     */
    private _maxLifeTime: number = 1000;
    public set maxLifeTime(value: number) {
        this._maxLifeTime = value;
        // Do not let max life be less than lifetime
        if (this._lifeTime > this._maxLifeTime) {
            this._lifeTime = this._maxLifeTime;
        }
    }
    
    /**
     * Current life
     */
    private _lifeTime: number = 0;
    public get lifeTime(): number {
        return this._lifeTime;
    }
    public set lifeTime(value: number) {
        this._lifeTime = value;
    }

    /**
     * Current life expressed as a percentage value going from 0 to 1
     */
    public get lifeTimePercentage(): number {
        const res: number = this._lifeTime / this._maxLifeTime;
        return res > 1 ? 1 : res;
    }

    /**
     * True if the particle's life has exceeeded the max
     */
    public get isDead(): boolean {
        return this._lifeTime >= this._maxLifeTime;
    }
}