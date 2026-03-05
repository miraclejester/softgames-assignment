import * as PIXI from 'pixi.js';
import { Component } from '../../core/Component';
import type { EMagicWordsAvatarPosition, MagicWordsAvatarSpec, MagicWordsConfigSchema, MagicWordsDialogueLine } from './MagicWordsTypes';
import { MagicWordsTextboxComponent } from './MagicWordsTextboxComponent';
import { GameObject } from '../../core/GameObject';

export class MagicWordsComponent extends Component {
    private _avatarSpriteMap: Map<EMagicWordsAvatarPosition, PIXI.Sprite> = new Map<EMagicWordsAvatarPosition, PIXI.Sprite>();
    private _config: MagicWordsConfigSchema;
    private _leftPortraitSprite: PIXI.Sprite;
    private _rightPortraitSprite: PIXI.Sprite;
    private _textboxComp: MagicWordsTextboxComponent;
    private _avatarSpecMap: Map<string, MagicWordsAvatarSpec>;
    private _lineIndex: number = 0;

    private _time: number = 0;

    public constructor(config: MagicWordsConfigSchema) {
        super();
        this._config = config;
    }

    public override ready(): void {
        this._avatarSpecMap = new Map<string, MagicWordsAvatarSpec>();
        this._config.avatars.forEach((avatarSpec: MagicWordsAvatarSpec) => {
            this._avatarSpecMap.set(avatarSpec.name, avatarSpec);
        });
        this._leftPortraitSprite = new PIXI.Sprite();
        this._leftPortraitSprite.position.set(100, 600);
        this._rightPortraitSprite = new PIXI.Sprite();
        this._rightPortraitSprite.position.set(1200, 600);

        this.gameObject.addChild(this._leftPortraitSprite);
        this.gameObject.addChild(this._rightPortraitSprite);

        this._avatarSpriteMap.set('left', this._leftPortraitSprite);
        this._avatarSpriteMap.set('right', this._rightPortraitSprite);
        
        const textbox: GameObject = new GameObject({
            label: 'Textbox'
        });
        textbox.position.set(700, 600);
        this._textboxComp = new MagicWordsTextboxComponent();
        textbox.addComponent(this._textboxComp);
        this.gameObject.addChild(textbox);

        this._lineIndex = 0;
        this.playNextLine();
    }

    public override update(delta: number): void {
        this._time += delta;
        if (this._time >= 2000) {
            this._time = 0;
            this.playNextLine();
        }
    }

    public playNextLine(): void {
        if (this._lineIndex >= this._config.dialogue.length) {
            return;
        }
        this.playLine(this._config.dialogue[this._lineIndex]!);
        this._lineIndex++;
    }

    public playLine(line: MagicWordsDialogueLine): void {
        this._leftPortraitSprite.visible = false;
        this._rightPortraitSprite.visible = false;

        const avatarData: MagicWordsAvatarSpec | undefined = this._avatarSpecMap.get(line.name);
        const avatarSprite: PIXI.Sprite | undefined = avatarData ? this._avatarSpriteMap.get(avatarData.position) : undefined;
        if (avatarData && avatarSprite) {
            avatarSprite.texture = PIXI.Texture.from(`avatar-${avatarData.name}`);
            avatarSprite.visible = true;
        }
        this._textboxComp.text.setText(line.text);
    }
}