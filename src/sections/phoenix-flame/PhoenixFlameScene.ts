import * as PIXI from 'pixi.js';
import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';
import { App } from '../../core/App';
import { PhoenixParticleSystemComponent } from '../../core/components/particles/PhoenixParticleSystemComponent';
import { PhoenixParticleAlphaModifier } from '../../core/components/particles/modifiers/PhoenixParticleAlphaModifier';
import { PhoenixParticleColorModifier } from '../../core/components/particles/modifiers/PhoenixParticleColorModifier';
import { PhoenixParticleLifeModifier } from '../../core/components/particles/modifiers/PhoenixParticleLifeModifier';
import { PhoenixParticleRotationModifier } from '../../core/components/particles/modifiers/PhoenixParticleRotationModifier';
import { PhoenixParticleScaleModifier } from '../../core/components/particles/modifiers/PhoenixParticleScaleModifier';
import { PhoenixParticleSpeedModifier } from '../../core/components/particles/modifiers/PhoenixParticleSpeedModifier';
import { PhoenixParticleStartPosModifier } from '../../core/components/particles/modifiers/PhoenixParticleStartPosModifier';

export class PhoenixFlameScene extends Scene {
    protected static override readonly ROOT_NAME: string = "Phoenix Flame Scene";

    public override async start(): Promise<void> {
        const phoenix: GameObject = new GameObject({
            label: "Phoenix Flame"
        });
        phoenix.addComponent(new PhoenixParticleSystemComponent({
            maxParticles: 10,
            spritesheet: App.instance.assets.get<PIXI.Spritesheet>('particles'),
            frames: [
                'feather',
                'pFire',
                'pFire2'
            ],
            modifiers: [
                new PhoenixParticleStartPosModifier(-40, 40, -20, 20),
                new PhoenixParticleLifeModifier(100, 200),
                new PhoenixParticleRotationModifier(220, 260),
                new PhoenixParticleSpeedModifier(300, 50),
                new PhoenixParticleScaleModifier(2, 4),
                new PhoenixParticleColorModifier(0xff0000, 0xfff200),
                new PhoenixParticleAlphaModifier(1, 0)
            ]
        }));
        phoenix.position.set(650, 400);
        this._root.addChild(phoenix);
    }
}