import * as PIXI from 'pixi.js';
import { FancyButton } from '@pixi/ui';
import { Component } from '../../Component';
import type { ButtonConfig } from './ButtonTypes';
import { App } from '../../App';
import { TextComponent } from '../TextComponent';
import { GameObject } from '../../GameObject';

export class ButtonComponent extends Component {
    private _config: ButtonConfig;
    private _innerButton: FancyButton;
    private _spritesheet: PIXI.Spritesheet | undefined;

    public constructor(config: ButtonConfig) {
        super();
        this._config = config;

        this._innerButton = new FancyButton({
            defaultView: this.getButtonTexture(this._config.defaultKey),
            hoverView: this.getButtonTexture(this._config.hoverKey),
            pressedView: this.getButtonTexture(this._config.pressedKey),
        });
        this._innerButton.anchor.set(0.5);
    }

    public override ready(): void {
        if (this._config.atlasKey) {
            this._spritesheet = App.instance.assets.get<PIXI.Spritesheet>(this._config.atlasKey);
        }
        
        this.gameObject.addChild(this._innerButton);
        const textObj: GameObject = new GameObject({
            label: "Button Text"
        });
        textObj.addComponent(new TextComponent(this._config.text));
        this.gameObject.addChild(textObj);
    }

    public getButtonTexture(key: string): PIXI.Texture | string {
        return this._spritesheet?.textures[key] ?? key;
    }

    public addOnPressListener(listener: () => void): void {
        this._innerButton.onPress.connect(listener);
    }
}