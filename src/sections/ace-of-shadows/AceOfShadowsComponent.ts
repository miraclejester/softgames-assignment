import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { Component } from '../../core/Component';
import { GameObject } from '../../core/GameObject';
import { AceStackComponent } from './AceStackComponent';

export class AceOfShadowsComponent extends Component {
    private _stack1: AceStackComponent;
    private _stack2: AceStackComponent;

    private _time: number = 0;

    public override ready(): void{
        this._stack1 = this.createStack("stack1", 0, 100);
        this._stack2 = this.createStack("stack2", 200, 100, 0);
    }

    public override update(delta: number): void {
        this._time += delta;
        if (this._time > 1000) {
            this._time = 0;
            this.moveCard(this._stack1, this._stack2);
        }
    }

    private moveCard(from: AceStackComponent, to: AceStackComponent): void {
        const card: PIXI.Sprite | null = from.removeTopCard();
        if (card === null) {
            return;
        }
        card.x = from.gameObject.x;
        card.y = from.gameObject.y + from.topCardY;
        this.gameObject.addChild(card);
        gsap.to(card, { 
            x: to.gameObject.x, y: to.nextTopCardY + to.gameObject.y, 
            duration: 2, ease: "power4.out",
            onComplete: () => {
            this.gameObject.removeChild(card);
            card.x = 0;
            card.y = to.topCardY;
            to.addCard(card);
        } });
    }

    private createStack(label: string, posX: number, posY: number, cards: number = 144): AceStackComponent {
        const stackObj: GameObject = new GameObject({
            label
        });
        const stackComp: AceStackComponent = new AceStackComponent();
        stackComp.initialCards = cards;

        stackObj.addComponent(stackComp);
        this.gameObject.addChild(stackObj);
        stackObj.x = posX;
        stackObj.y = posY;
        return stackComp;
    }
}