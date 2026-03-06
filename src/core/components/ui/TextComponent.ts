import * as PIXI from 'pixi.js';
import { Component } from '../../Component';

export interface TextStyle {
    fontSize?: number;
    fill?: number | string;
    fontFamily?: string;
    align?: 'left' | 'center' | 'right';
}

/**
 * Displays text on screen using PIXI.Text.
 * The component manages a text object that is added as a child of the GameObject.
 */
export class TextComponent extends Component {
    private _text: PIXI.Text | null = null;
    private _defaultStyle: TextStyle = {
        fontSize: 24,
        fill: 0xffffff,
        fontFamily: 'Arial',
        align: 'center'
    };

    /**
     * Creates a new TextComponent with the specified text
     * 
     * @param initialText - The text to display
     * @param style - Optional text style configuration
     */
    public constructor(initialText: string = '', style?: TextStyle) {
        super();
        const mergedStyle: TextStyle = { ...this._defaultStyle, ...style };
        
        this._text = new PIXI.Text({
            text: initialText,
            style: mergedStyle
        });
        this._text.anchor.set(0.5);
    }

    public override ready(): void {
        if (this._text && !this.gameObject.children.includes(this._text)) {
            this.gameObject.addChild(this._text);
        }
    }

    /**
     * Sets the text content to display
     */
    public setText(text: string): void {
        if (this._text) {
            this._text.text = text;
        }
    }

    /**
     * Gets the current text content
     */
    public getText(): string {
        return this._text?.text ?? '';
    }

    /**
     * Updates the text style properties
     */
    public setStyle(style: Partial<TextStyle>): void {
        if (!this._text) return;

        if (style.fontSize !== undefined) {
            this._text.style.fontSize = style.fontSize;
        }
        if (style.fill !== undefined) {
            this._text.style.fill = style.fill;
        }
        if (style.fontFamily !== undefined) {
            this._text.style.fontFamily = style.fontFamily;
        }
        if (style.align !== undefined) {
            this._text.style.align = style.align;
        }
    }

    /**
     * Gets the underlying PIXI.Text object
     */
    public getTextObject(): PIXI.Text | null {
        return this._text;
    }
}
