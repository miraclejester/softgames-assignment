import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Component } from '../../core/Component';
import type { MagicWordsAvatarSpec } from './MagicWordsTypes';

/**
 * Handles logic for the avatar portrait in Magic Words
 */
export class MagicWordsAvatarComponent extends Component {
    /**
     * Avatar's sprite
     */
    private _avatarSprite: PIXI.Sprite;

    /**
     * Initializes the sprite and its bobbing animation
     */
    public override ready(): void {
        this._avatarSprite = new PIXI.Sprite();
        this.gameObject.addChild(this._avatarSprite);
        this.bobDown();
    }

    /**
     * Move down and then back up to simulate talking
     */
    private bobDown(): void {
        const bottomY: number = this._avatarSprite.y + 5
        gsap.to(this._avatarSprite, {
            y: bottomY, duration: 0.1, ease: "none",
            onComplete: this.bobUp.bind(this)
        });
    }

    /**
     * Second part of the bobbing animation. Loops back to going down
     */
    private bobUp(): void {
        const topY: number = this._avatarSprite.y - 5
        gsap.to(this._avatarSprite, {
            y: topY, duration: 0.1, ease: "none",
            onComplete: this.bobDown.bind(this)
        });
    }

    /**
     * Update the sprite based on passed data
     * @param data - New Avatar data 
     */
    public setData(data: MagicWordsAvatarSpec): void {
        this._avatarSprite.texture = PIXI.Texture.from(`avatar-${data.name}`);
    }
}