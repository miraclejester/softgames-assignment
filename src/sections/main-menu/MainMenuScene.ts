import { App } from '../../core/App';
import { UIUtils } from '../../core/components/ui/UIUtils';
import { Scene } from '../../core/scenes/Scene';

export class MainMenuScene extends Scene {
    protected static override readonly ROOT_NAME: string = "MainMenuScene";

    public override async start(): Promise<void> {
        this._root.addChild(UIUtils.createButtonObj({
            buttonName: "AceOfShadows",
            buttonText: "Ace of Shadows",
            x: 700,
            y: 300,
            callback: this.moveToScene.bind(this, 'ace-of-shadows')
        }));
        this._root.addChild(UIUtils.createButtonObj({
            buttonName: "MagicWords",
            buttonText: "Magic Words",
            x: 700,
            y: 400,
            callback: this.moveToScene.bind(this, 'magic-words')
        }));
        this._root.addChild(UIUtils.createButtonObj({
            buttonName: "PhoenixFlame",
            buttonText: "Phoenix Flame",
            x: 700,
            y: 500,
            callback: this.moveToScene.bind(this, 'phoenix-flame')
        }));
    }

    private moveToScene(key: string): void {
        App.instance.scenes.switchTo(key);
    }
}