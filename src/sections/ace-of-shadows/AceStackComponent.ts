import * as PIXI from 'pixi.js';
import { Component } from '../../core/Component';
import type { AceOfShadowsStackConfig } from './AceOfShadowsTypes';
import { App } from '../../core/App';

/**
 * Component that handles the logic for a single Ace of Shadows stack
 */
export class AceStackComponent extends Component {
    /**
     * Vertical offset between items
     */
    private _verticalOffset: number = 2;
    /**
     * Initial number of cards
     */
    private _initialCards: number = 144;
    /**
     * Configuration object
     */
    private _config: AceOfShadowsStackConfig;
    /**
     * Current number of cards
     */
    private _numCards: number = 0;
    /**
     * Spritesheet used for items
     */
    private _spritesheet: PIXI.Spritesheet;

    /**
     * Y position of the bottom card relative to the stack's position
     */
    private _floorY: number = 300;
    public set floorY(value: number) {
        this._floorY = value;
    }

    /**
     * Y coordinate of the top card of the stack
     */
    public get topCardY(): number {
        return this._floorY - ((this._numCards - 1) * this._verticalOffset);
    }

    /**
     * Y coordinate where the next card for the stack would be
     */
    public get nextTopCardY(): number {
        return this.topCardY - this._verticalOffset;
    }

    /**
     * Get the sprite of the stack's top card
     */
    public get topCard(): PIXI.Sprite {
        return this.gameObject.children[this._numCards - 1] as PIXI.Sprite;
    }

    /**
     * Set the config object
     * @param config - Configuration object
     */
    public constructor(config: AceOfShadowsStackConfig) {
        super();
        this._config = config;
    }

    /**
     * Spawn the initial cards and use the config object for other initializations
     */
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

    /**
     * Remove and return the current top card
     * @returns Current top card
     */
    public removeTopCard(): PIXI.Sprite | null {
        if (this._numCards === 0) {
            return null;
        }
        const topCard: PIXI.Sprite = this.gameObject.removeChildAt<PIXI.Sprite>(this._numCards - 1);
        this._numCards--;
        return topCard;
    }

    /**
     * Add a card to this stack
     * @param card - Card to add
     */
    public addCard(card: PIXI.Sprite | null): void {
        if (card === null) {
            return;
        }
        this._numCards++;
        this.gameObject.addChild(card);
        card.y = this.topCardY;
    }
}