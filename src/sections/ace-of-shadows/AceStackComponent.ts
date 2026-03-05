import * as PIXI from 'pixi.js';
import { Component } from '../../core/Component';

export class AceStackComponent extends Component {
    private _verticalOffset: number = 2;
    private _initialCards: number = 144;
    public set initialCards(value: number) {
        this._initialCards = value;
    }
    private _numCards: number = 0;
    private _cardBackSpriteKey: string = 'card_back';
    private _floorY: number = 300;
    public set floorY(value: number) {
        this._floorY = value;
    }

    public get topCardY(): number {
        return this._floorY - ((this._numCards - 1) * this._verticalOffset);
    }

    public get nextTopCardY(): number {
        return this.topCardY - this._verticalOffset*2;
    }

    public get topCard(): PIXI.Sprite {
        return this.gameObject.children[this._numCards - 1] as PIXI.Sprite;
    }

    public override ready(): void {
        for (let i = 0; i < this._initialCards; ++i) {
            const card: PIXI.Sprite = PIXI.Sprite.from(this._cardBackSpriteKey);
            card.y = this._floorY - (i * this._verticalOffset);
            this.gameObject.addChild(card);
        }
        this._numCards = this._initialCards;
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