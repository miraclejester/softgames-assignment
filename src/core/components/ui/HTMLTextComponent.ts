import * as PIXI from 'pixi.js';
import { Component } from '../../Component';
import type { TextStyle } from './TextComponent';

export class HTMLTextComponent extends Component {
    private _text: PIXI.HTMLText | null = null;
    private _defaultStyle: TextStyle = {
        fontSize: 24,
        fill: 0xffffff,
        fontFamily: 'Arial',
        align: 'center'
    }

    public constructor(initialText: string = '', style?: TextStyle) {
        super();
        const mergedStyle: TextStyle = { ...this._defaultStyle, ...style };
        this._text = new PIXI.HTMLText({
            text: initialText,
            style: mergedStyle
        })
    }

    public override ready(): void {
        if (this._text && !this.gameObject.children.includes(this._text)) {
            this.gameObject.addChild(this._text);
        }
    }

    public setText(text: string): void {
        if (!this._text) {
            return;
        }
        this._text.text = text;
    }
}