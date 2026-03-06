import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Component } from '../../core/Component';
import { GameObject } from '../../core/GameObject';
import { AceStackComponent } from './AceStackComponent';
import { App } from '../../core/App';
import type { AceOfShadowsConfig, AceOfShadowsStackConfig } from './AceOfShadowsTypes';

/**
 * Component that handles AceOfShadows logic
 */
export class AceOfShadowsComponent extends Component {
    /**
     * The initial filled stack
     */
    private _initialStack: AceStackComponent;
    /**
     * The initially empty stacks
     */
    private _emptyStacks: AceStackComponent[] = [];
    /**
     * Points to the current stack to receive a card
     */
    private _stackIndex: number = 0;

    /**
     * Tracks time elapsed
     */
    private _time: number = 0;
    /**
     * Configuration Object
     */
    private _config: AceOfShadowsConfig;

    /**
     * Sets the configuration object
     * @param config - Configuration object
     */
    public constructor(config: AceOfShadowsConfig) {
        super();
        this._config = config;
    }

    /**
     * Create the stacks using the config object
     */
    public override ready(): void{
        this._initialStack = this.createStack("initialStack", this._config.startingStack.x, this._config.startingStack.y, this._config.startingStack.initialCards);
        this._config.emptyStacks.forEach((config: AceOfShadowsStackConfig) => {
            this._emptyStacks.push(this.createStack("emptyStack", config.x, config.y, config.initialCards))
        });
        this._stackIndex = 0;
    }

    /**
     * Updates the logic. If enough time has passedd, the filled stack drops a card
     * towards the next stack
     * @param delta - Time since last update in milliseconds
     */
    public override update(delta: number): void {
        this._time += delta;
        if (this._time >= 1000) {
            this._time -= 1000;
            this.moveCard(this._initialStack, this._emptyStacks[this._stackIndex]!);
            this._stackIndex = (this._stackIndex + 1) % this._emptyStacks.length;
        }
    }

    /**
     * Moves a card from one stack to another
     * @param from - Source stack
     * @param to - Destination stack
     */
    private moveCard(from: AceStackComponent, to: AceStackComponent): void {
        // Remove the top card from the source stack
        const card: PIXI.Sprite | null = from.removeTopCard();
        if (card === null) {
            return;
        }

        App.instance.audio.playSfx('deck-deal');

        // Add the removed card to this object to prepare for the animation
        card.x = from.gameObject.x;
        card.y = from.gameObject.y + from.topCardY;
        this.gameObject.addChild(card);

        // Tween the card's position towards the top of the target stacjk
        gsap.to(card, { 
            x: to.gameObject.x, y: to.nextTopCardY + to.gameObject.y,
            duration: 2, ease: "power4.out",
            onComplete: this.completeCardMovement.bind(this, card, to)
        });
        // Also tween the x scale and in the middle of it change the card's texture
        // To simulate the card flipping
        gsap.to(card.scale, {
            x: 0,
            duration: 0.5, ease: "power4.out",
            onComplete: () => {
                const sheet: PIXI.Spritesheet = App.instance.assets.get<PIXI.Spritesheet>(this._config.atlasKey);
                const randomIndex: number = Math.floor(Math.random() * this._config.cardFrames.length);
                card.texture = sheet.textures[this._config.cardFrames[randomIndex]!]!;
                gsap.to(card.scale, {
                    x: 1,
                    duration: 1.5, ease: "power4.out"
                });
            }
        });
    }

    /**
     * Called when a card finishes moving to the target stack. Adds the card to the top of the stack
     * @param card - Card that was moving
     * @param to - Target stack
     */
    private completeCardMovement(card: PIXI.Sprite, to: AceStackComponent): void {
        this.gameObject.removeChild(card);
        card.x = 0;
        card.y = to.topCardY;
        to.addCard(card);
    }

    /**
     * Creates a new stack
     * @param label - Stack gameobject's name
     * @param posX - Position x
     * @param posY - Position y
     * @param cards - Starting amount of cards
     * @returns 
     */
    private createStack(label: string, posX: number, posY: number, cards: number = 144): AceStackComponent {
        const stackObj: GameObject = new GameObject({
            label
        });
        const stackComp: AceStackComponent = new AceStackComponent({
            atlasKey: this._config.atlasKey,
            initialCards: cards,
            backingFrame: 'card_backing',
            x: posX,
            y: posY
        });

        stackObj.addComponent(stackComp);
        this.gameObject.addChild(stackObj);
        return stackComp;
    }
}