import * as PIXI from 'pixi.js';
import { App } from '../../core/App';
import { TextComponent } from '../../core/components/ui/TextComponent';
import { UIUtils } from '../../core/components/ui/UIUtils';
import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';
import { PointUtils } from '../../core/math/PointUtils';
import gsap from 'gsap';

export class MainMenuScene extends Scene {
    protected static override readonly ROOT_NAME: string = "MainMenuScene";

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
    }

    private createHand(x: number, y: number, rotation: number): PIXI.Sprite {
        const hand: PIXI.Sprite = PIXI.Sprite.from('hand-point');
        hand.x = x;
        hand.y = y;
        hand.rotation = rotation;
        this._root.addChild(hand);
        return hand;
    }

    private startBobHand(hand: PIXI.Sprite, xOffset: number): void {
        var tx: number = hand.x + xOffset;
        gsap.to(hand, {
            x: tx, duration: 0.3, ease: "power1.out",
            onComplete: this.startBobHand.bind(this, hand, -xOffset) 
        });
    }

    private moveToScene(key: string): void {
        App.instance.scenes.switchTo(key);
    }
}