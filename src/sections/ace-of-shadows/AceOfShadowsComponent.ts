import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Component } from '../../core/Component';
import { GameObject } from '../../core/GameObject';
import { AceStackComponent } from './AceStackComponent';
import { App } from '../../core/App';
import type { AceOfShadowsConfig, AceOfShadowsStackConfig } from './AceOfShadowsTypes';

export class AceOfShadowsComponent extends Component {
    private _initialStack: AceStackComponent;
    private _emptyStacks: AceStackComponent[] = [];
    private _stackIndex: number = 0;

    private _time: number = 0;
    private _config: AceOfShadowsConfig;

    public constructor(config: AceOfShadowsConfig) {
        super();
        this._config = config;
    }

    public override ready(): void{
        this._initialStack = this.createStack("initialStack", this._config.startingStack.x, this._config.startingStack.y, this._config.startingStack.initialCards);
        this._config.emptyStacks.forEach((config: AceOfShadowsStackConfig) => {
            this._emptyStacks.push(this.createStack("emptyStack", config.x, config.y, config.initialCards))
        });
        this._stackIndex = 0;
    }

    public override update(delta: number): void {
        this._time += delta;
        if (this._time >= 1000) {
            this._time -= 1000;
            this.moveCard(this._initialStack, this._emptyStacks[this._stackIndex]!);
            this._stackIndex = (this._stackIndex + 1) % this._emptyStacks.length;
        }
    }

    private moveCard(from: AceStackComponent, to: AceStackComponent): void {
        const card: PIXI.Sprite | null = from.removeTopCard();
        if (card === null) {
            return;
        }

        App.instance.audio.playSfx('deck-deal');
        card.x = from.gameObject.x;
        card.y = from.gameObject.y + from.topCardY;
        this.gameObject.addChild(card);
        gsap.to(card, { 
            x: to.gameObject.x, y: to.nextTopCardY + to.gameObject.y,
            duration: 2, ease: "power4.out",
            onComplete: this.completeCardMovement.bind(this, card, to)
        });
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

    private completeCardMovement(card: PIXI.Sprite, to: AceStackComponent): void {
        this.gameObject.removeChild(card);
        card.x = 0;
        card.y = to.topCardY;
        to.addCard(card);
    }

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