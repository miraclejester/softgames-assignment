import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Component } from '../../core/Component';
import type { MagicWordsAvatarSpec } from './MagicWordsTypes';

export class MagicWordsAvatarComponent extends Component {
    private _avatarSprite: PIXI.Sprite;

    public override ready(): void {
        this._avatarSprite = new PIXI.Sprite();
        this.gameObject.addChild(this._avatarSprite);
        this.bobDown();
    }


    private bobDown(): void {
        const bottomY: number = this._avatarSprite.y + 5
        gsap.to(this._avatarSprite, {
            y: bottomY, duration: 0.1, ease: "none",
            onComplete: this.bobUp.bind(this)
        });
    }

    private bobUp(): void {
        const topY: number = this._avatarSprite.y - 5
        gsap.to(this._avatarSprite, {
            y: topY, duration: 0.1, ease: "none",
            onComplete: this.bobDown.bind(this)
        });
    }


    public setData(data: MagicWordsAvatarSpec): void {
        this._avatarSprite.texture = PIXI.Texture.from(`avatar-${data.name}`);
    }
}