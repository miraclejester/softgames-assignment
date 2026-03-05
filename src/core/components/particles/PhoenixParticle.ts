import * as PIXI from 'pixi.js';

export class PhoenixParticle extends PIXI.Particle {
    private _maxLifeTime: number = 1000;
    public set maxLifeTime(value: number) {
        this._maxLifeTime = value;
        if (this._lifeTime > this._maxLifeTime) {
            this._lifeTime = this._maxLifeTime;
        }
    }
    private _lifeTime: number = 0;
    public get lifeTime(): number {
        return this._lifeTime;
    }
    public set lifeTime(value: number) {
        this._lifeTime = value;
    }

    public get lifeTimePercentage(): number {
        const res: number = this._lifeTime / this._maxLifeTime;
        return res > 1 ? 1 : res;
    }

    public get isDead(): boolean {
        return this._lifeTime >= this._maxLifeTime;
    }
}