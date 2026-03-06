import * as PIXI from 'pixi.js';
import { Component } from '../../core/Component';
import type { AceOfShadowsStackConfig } from './AceOfShadowsTypes';
import { App } from '../../core/App';

export class AceStackComponent extends Component {
    private _verticalOffset: number = 2;
    private _initialCards: number = 144;
    private _config: AceOfShadowsStackConfig;
    private _numCards: number = 0;
    private _spritesheet: PIXI.Spritesheet;
    private _floorY: number = 300;
    public set floorY(value: number) {
        this._floorY = value;
    }

    public get topCardY(): number {
        return this._floorY - ((this._numCards - 1) * this._verticalOffset);
    }

    public get nextTopCardY(): number {
        return this.topCardY - this._verticalOffset;
    }

    public get topCard(): PIXI.Sprite {
        return this.gameObject.children[this._numCards - 1] as PIXI.Sprite;
    }

    public constructor(config: AceOfShadowsStackConfig) {
        super();
        this._config = config;
    }

    public override ready(): void {
        this._initialCards = this._config.initialCards;
        this._spritesheet = App.instance.assets.get<PIXI.Spritesheet>(this._config.atlasKey);
        for (let i = 0; i < this._initialCards; ++i) {
            const card: PIXI.Sprite = PIXI.Sprite.from(this._spritesheet.textures[this._config.backingFrame]!);
            card.y = this._floorY - (i * this._verticalOffset);
            this.gameObject.addChild(card);
        }
        this._numCards = this._initialCards;
        this.gameObject.x = this._config.x;
        this.gameObject.y = this._config.y;
    }

    public removeTopCard(): PIXI.Sprite | null {
        if (this._numCards === 0) {
            return null;
        }
        const topCard: PIXI.Sprite = this.gameObject.removeChildAt<PIXI.Sprite>(this._numCards - 1);
        this._numCards--;
        return topCard;
    }

    public addCard(card: PIXI.Sprite | null): void {
        if (card === null) {
            return;
        }
        this._numCards++;
        this.gameObject.addChild(card);
        card.y = this.topCardY;
    }
}