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
import { UIUtils } from '../../core/components/ui/UIUtils';

/**
 * Scene for the Phoenix Flame Section
 */
export class PhoenixFlameScene extends Scene {
    /**
     * @inheritdoc
     */
    protected static override readonly ROOT_NAME: string = "Phoenix Flame Scene";

    /**
     * Set up the particle system and the dignified holding hands
     */
    public override async start(): Promise<void> {
        // Dignified hands
        const hand: PIXI.Sprite = PIXI.Sprite.from('hand-fire');
        hand.x = 360;
        hand.y = 280;
        this._root.addChild(hand);

        // Particle system. Uses 3 different particle images to simulate
        // A kind of fire that reminds of a Phoenix
        const phoenix: GameObject = new GameObject({
            label: "Phoenix Flame"
        });

        // Limit is set to 9 to still have the dignified hand and comply with the 10-sprite limit
        phoenix.addComponent(new PhoenixParticleSystemComponent({
            maxParticles: 9,
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
        phoenix.position.set(630, 480);
        this._root.addChild(phoenix);

        this._root.addChild(UIUtils.createBackToMenuButton());
    }
}