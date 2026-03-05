import { Component } from '../core/Component';
import { GameObject } from '../core/GameObject';
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
            this._stack2.addCard(this._stack1.removeTopCard());
        }
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