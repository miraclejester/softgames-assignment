import * as PIXI from 'pixi.js';
import { App } from '../../core/App';
import { TextComponent } from '../../core/components/ui/TextComponent';
import { UIUtils } from '../../core/components/ui/UIUtils';
import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';
import { PointUtils } from '../../core/math/PointUtils';
import gsap from 'gsap';

/**
 * Scene for the main menu
 */
export class MainMenuScene extends Scene {
    /**
     * @inheritdoc
     */
    protected static override readonly ROOT_NAME: string = "MainMenuScene";

    /**
     * Configure the title, the buttons that lead into sections, and the fun hands
     */
    public override async start(): Promise<void> {
        const titleComp: TextComponent = new TextComponent("Jose Montenegro - Softgames Test!", {
            fontSize: 40
        });
        const titleObj: GameObject = new GameObject({
            label: 'Title'
        });
        titleObj.addComponent(titleComp);

        titleObj.x = 640;
        titleObj.y = 200;
        this._root.addChild(titleObj);

        this._root.addChild(UIUtils.createButtonObj({
            buttonName: "AceOfShadows",
            buttonText: "Ace of Shadows",
            x: 640,
            y: 400,
            callback: this.moveToScene.bind(this, 'ace-of-shadows')
        }));
        this._root.addChild(UIUtils.createButtonObj({
            buttonName: "MagicWords",
            buttonText: "Magic Words",
            x: 640,
            y: 500,
            callback: this.moveToScene.bind(this, 'magic-words')
        }));
        this._root.addChild(UIUtils.createButtonObj({
            buttonName: "PhoenixFlame",
            buttonText: "Phoenix Flame",
            x: 640,
            y: 600,
            callback: this.moveToScene.bind(this, 'phoenix-flame')
        }));

        this.startBobHand(
            this.createHand(200, 160, PointUtils.degreesToRadians(90)),
            -20
        );
        this.startBobHand(
            this.createHand(1080, 250, PointUtils.degreesToRadians(-90)),
            20
        );

        App.instance.audio.playBgm('check-this-out');
    }

    /**
     * Create a fun hand
     * @param x - Position x
     * @param y - Position y
     * @param rotation - Rotation of the hand in radians
     * @returns The hand's sprite
     */
    private createHand(x: number, y: number, rotation: number): PIXI.Sprite {
        const hand: PIXI.Sprite = PIXI.Sprite.from('hand-point');
        hand.x = x;
        hand.y = y;
        hand.rotation = rotation;
        this._root.addChild(hand);
        return hand;
    }

    /**
     * Start the hand's bobbing animation. Loops around
     * @param hand - Hand to animated
     * @param xOffset - Horizontal offset to animate to
     */
    private startBobHand(hand: PIXI.Sprite, xOffset: number): void {
        var tx: number = hand.x + xOffset;
        gsap.to(hand, {
            x: tx, duration: 0.3, ease: "power1.out",
            onComplete: this.startBobHand.bind(this, hand, -xOffset) 
        });
    }

    /**
     * Move to a section
     */
    private moveToScene(key: string): void {
        App.instance.scenes.switchTo(key);
    }
}