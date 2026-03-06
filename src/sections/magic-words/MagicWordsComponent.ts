import * as PIXI from 'pixi.js';
import { Component } from '../../core/Component';
import type { EMagicWordsAvatarPosition, MagicWordsAvatarSpec, MagicWordsConfigSchema, MagicWordsDialogueLine } from './MagicWordsTypes';
import { MagicWordsTextboxComponent } from './MagicWordsTextboxComponent';
import { GameObject } from '../../core/GameObject';
import { MagicWordsAvatarComponent } from './MagicWordsAvatarComponent';

/**
 * Handles the logic for the Magic Words section
 */
export class MagicWordsComponent extends Component {
    /**
     * Map of position and avatar sprite for quick access
     */
    private _avatarSpriteMap: Map<EMagicWordsAvatarPosition, MagicWordsAvatarComponent> = new Map<EMagicWordsAvatarPosition, MagicWordsAvatarComponent>();
    /**
     * Configuration Object
     */
    private _config: MagicWordsConfigSchema;
    /**
     * Portrat components
     */
    private _leftPortraitSprite: MagicWordsAvatarComponent;
    private _rightPortraitSprite: MagicWordsAvatarComponent;
    /**
     * Handler for the textbos
     */
    private _textboxComp: MagicWordsTextboxComponent;
    /**
     * Map with config objects for the avatars
     */
    private _avatarSpecMap: Map<string, MagicWordsAvatarSpec>;
    /**
     * Points to the current line of dialogue
     */
    private _lineIndex: number = 0;
    /**
     * Hand that appears at the end of the conversation
     */
    private _pointingHand: PIXI.Sprite; 

    /**
     * Tracks time to see when to make the next dialogue appear
     */
    private _time: number = 0;
    /**
     * Time that passes between lines
     */
    private _timeBetweenLines: number = 2000;

    /**
     * Set the config object
     * @param config - Configuration object
     */
    public constructor(config: MagicWordsConfigSchema) {
        super();
        this._config = config;
    }

    /**
     * Set up the visual elements of Magic Words
     */
    public override ready(): void {
        // Ending Hand
        this._pointingHand = PIXI.Sprite.from('hand-point');
        this._pointingHand.visible = false;
        this._pointingHand.x = 1050;
        this._pointingHand.y = 100;
        this.gameObject.addChild(this._pointingHand);

        // Avatars
        this._avatarSpecMap = new Map<string, MagicWordsAvatarSpec>();
        this._config.avatars.forEach((avatarSpec: MagicWordsAvatarSpec) => {
            this._avatarSpecMap.set(avatarSpec.name, avatarSpec);
        });
        this._leftPortraitSprite = this.createAvatarPortrait(100, 600);
        this._rightPortraitSprite = this.createAvatarPortrait(1000, 600);

        this._avatarSpriteMap.set('left', this._leftPortraitSprite);
        this._avatarSpriteMap.set('right', this._rightPortraitSprite);
        
        // Textbox
        const textbox: GameObject = new GameObject({
            label: 'Textbox'
        });
        textbox.position.set(250, 600);
        this._textboxComp = new MagicWordsTextboxComponent();
        textbox.addComponent(this._textboxComp);
        this.gameObject.addChild(textbox);

        // Start dialogue
        this._timeBetweenLines = this._config.timeBetweenLines ?? 2000;
        this._lineIndex = 0;
        this.playNextLine();
    }

    /**
     * Passes to the next dialogue once enough time has passed
     * @param delta - Time since last frame in milliseconds
     */
    public override update(delta: number): void {
        this._time += delta;
        if (this._time >= this._timeBetweenLines) {
            this._time -= this._timeBetweenLines;
            this.playNextLine();
        }
    }

    /**
     * Play the next line. Activates the hand if there is no next line
     * @returns 
     */
    public playNextLine(): void {
        if (this._lineIndex >= this._config.dialogue.length) {
            this._pointingHand.visible = true;
            return;
        }
        this.playLine(this._config.dialogue[this._lineIndex]!);
        this._lineIndex++;
    }

    /**
     * Play the given line
     * @param line - Line to play
     */
    public playLine(line: MagicWordsDialogueLine): void {
        this._leftPortraitSprite.gameObject.visible = false;
        this._rightPortraitSprite.gameObject.visible = false;

        const avatarData: MagicWordsAvatarSpec | undefined = this._avatarSpecMap.get(line.name);
        const avatarSprite: MagicWordsAvatarComponent | undefined = avatarData ? this._avatarSpriteMap.get(avatarData.position) : undefined;
        if (avatarData && avatarSprite) {
            avatarSprite.setData(avatarData);
            avatarSprite.gameObject.visible = true;
        }
        this._textboxComp.setText(line.text);
    }

    /**
     * Create an avatar portrait component and add it to the gameObject
     * @param x - The x position
     * @param y - The y position
     * @returns An avatar component
     */
    private createAvatarPortrait(x: number, y: number): MagicWordsAvatarComponent {
        const obj: GameObject = new GameObject({
            label: "AvatarPortrait"
        });
        const comp: MagicWordsAvatarComponent = new MagicWordsAvatarComponent();
        obj.addComponent(comp);
        this.gameObject.addChild(obj);
        obj.x = x;
        obj.y = y;
        return comp;
    }
}