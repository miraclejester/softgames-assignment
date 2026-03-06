import * as PIXI from 'pixi.js';
import { Component } from '../../core/Component';
import type { EMagicWordsAvatarPosition, MagicWordsAvatarSpec, MagicWordsConfigSchema, MagicWordsDialogueLine } from './MagicWordsTypes';
import { MagicWordsTextboxComponent } from './MagicWordsTextboxComponent';
import { GameObject } from '../../core/GameObject';
import { MagicWordsAvatarComponent } from './MagicWordsAvatarComponent';

export class MagicWordsComponent extends Component {
    private _avatarSpriteMap: Map<EMagicWordsAvatarPosition, MagicWordsAvatarComponent> = new Map<EMagicWordsAvatarPosition, MagicWordsAvatarComponent>();
    private _config: MagicWordsConfigSchema;
    private _leftPortraitSprite: MagicWordsAvatarComponent;
    private _rightPortraitSprite: MagicWordsAvatarComponent;
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
        this._leftPortraitSprite = this.createAvatarPortrait(100, 600);
        this._rightPortraitSprite = this.createAvatarPortrait(1000, 600);

        this._avatarSpriteMap.set('left', this._leftPortraitSprite);
        this._avatarSpriteMap.set('right', this._rightPortraitSprite);
        
        const textbox: GameObject = new GameObject({
            label: 'Textbox'
        });
        textbox.position.set(250, 600);
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