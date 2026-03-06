import { App } from '../../core/App';
import { ButtonComponent } from '../../core/components/ui/ButtonComponent';
import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';

export class MainMenuScene extends Scene {
    protected static override readonly ROOT_NAME: string = "MainMenuScene";

    public override async start(): Promise<void> {
        this.createButton("AceOfShadows", "Ace of Shadows", 700, 300, this.moveToScene.bind(this, 'ace-of-shadows'));
        this.createButton("MagicWords", "Magic Words", 700, 400, this.moveToScene.bind(this, 'magic-words'));
        this.createButton("PhoenixFlame", "Phoenix Flame", 700, 500, this.moveToScene.bind(this, 'phoenix-flame'));
    }

    public createButton(buttonName: string, buttonText: string, x: number, y: number, callback?: () => void): void {
        const buttonObj: GameObject = new GameObject({
            label: buttonName
        });
        buttonObj.position.set(x, y);
        const buttonComp: ButtonComponent = new ButtonComponent({
            atlasKey: 'ui',
            defaultKey: 'button_default',
            hoverKey: 'button_hover',
            pressedKey: 'button_pressed',
            text: buttonText
        });
        if (callback) {
            buttonComp.addOnPressListener(callback);
        }
        buttonObj.addComponent(buttonComp);
        this._root.addChild(buttonObj);
    }
    

    private moveToScene(key: string): void {
        App.instance.scenes.switchTo(key);
    }
}