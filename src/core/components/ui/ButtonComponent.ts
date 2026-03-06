import * as PIXI from 'pixi.js';
import { FancyButton } from '@pixi/ui';
import { Component } from '../../Component';
import type { ButtonConfig } from './ButtonTypes';
import { App } from '../../App';
import { TextComponent } from './TextComponent';
import { GameObject } from '../../GameObject';

/**
 * Component that manages an instance of FancyButton
 */
export class ButtonComponent extends Component {
    /**
     * Configuration object
     */
    private _config: ButtonConfig;
    /**
     * Managed button
     */
    private _innerButton: FancyButton;
    /**
     * Spritesheet for the button
     */
    private _spritesheet: PIXI.Spritesheet | undefined;

    /**
     * Sets the config object
     * @param config - Config object
     */
    public constructor(config: ButtonConfig) {
        super();
        this._config = config;

        this._innerButton = new FancyButton({
            defaultView: this.getButtonTexture(this._config.defaultKey),
            hoverView: this.getButtonTexture(this._config.hoverKey),
            pressedView: this.getButtonTexture(this._config.pressedKey),
        });
        this._innerButton.anchor.set(0.5);
        this._innerButton.onPress.connect(() => {
            App.instance.audio.playSfx('blip', false);
        });
    }

    /**
     * Initializes the inner button and its assets
     */
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

    /**
     * Get a texture for the button
     * @param key - Key in the spritesheet
     * @returns The texture of the spritesheet or the key if it doesn't exist
     */
    public getButtonTexture(key: string): PIXI.Texture | string {
        return this._spritesheet?.textures[key] ?? key;
    }

    /**
     * Adds a callback to the butto's onPress signal
     * @param listener - Callback to add
     */
    public addOnPressListener(listener: () => void): void {
        this._innerButton.onPress.connect(listener);
    }

    /**
     * Removes onPress listeners
     */
    public override destroy(): void {
        this._innerButton.onPress.disconnectAll();
        super.destroy();
    }
}