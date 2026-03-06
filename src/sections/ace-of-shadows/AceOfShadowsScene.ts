import * as PIXI from 'pixi.js'
import { App } from '../../core/App';
import { UIUtils } from '../../core/components/ui/UIUtils';
import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';
import { AceOfShadowsComponent } from './AceOfShadowsComponent';

export class AceOfShadowsScene extends Scene {
    protected static override readonly ROOT_NAME: string = 'Ace Of Shadows Scene';

    public override async start(): Promise<void> {
        const aos: GameObject = new GameObject({
            label: "Ace of Shadows"
        });

        aos.addChild(PIXI.Sprite.from('poker_table'));

        const atlasKey: string = 'cards';
        const backingFrame: string = 'card_backing'
        const sheet: PIXI.Spritesheet = App.instance.assets.get<PIXI.Spritesheet>(atlasKey);
        aos.addComponent(new AceOfShadowsComponent({
            atlasKey,
            backingFrame,
            cardFrames: Object.keys(sheet.textures).filter((frame: string) => frame !== backingFrame),
            startingStack: {
                initialCards: 144,
                atlasKey,
                backingFrame,
                x: 650,
                y: 100
            },
            emptyStacks: [
                {
                    initialCards: 0,
                    atlasKey, backingFrame, x: 300, y: 50
                },
                {
                    initialCards: 0,
                    atlasKey, backingFrame, x: 1000, y: 50
                },
                {
                    initialCards: 0,
                    atlasKey, backingFrame, x: 400, y: 150
                },
                {
                    initialCards: 0,
                    atlasKey, backingFrame, x: 900, y: 150
                },
            ]
        }))

        this._root.addChild(aos);

        this._root.addChild(UIUtils.createBackToMenuButton());
    }
}