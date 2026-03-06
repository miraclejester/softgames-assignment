import { Component } from '../../core/Component';
import { GameObject } from '../../core/GameObject';
import { TextComponent } from '../../core/components/ui/TextComponent';
import * as PIXI from 'pixi.js';
import type { MagicWordsParsedText, MagicWordsWrappedLine, MagicWordsWrappedText, MagicWordsWrappedWord } from './MagicWordsTypes';

export class MagicWordsTextboxComponent extends Component {
    private _childObjects: GameObject[] = [];
    private _textbox: PIXI.NineSliceSprite;
    private readonly _lineHeight: number = 32;
    private readonly _textPadding: number = 10;

    public override ready(): void {
        this._textbox = new PIXI.NineSliceSprite({
            texture: PIXI.Texture.from('textbox'),
            leftWidth: 4,
            topHeight: 4,
            rightWidth: 4,
            bottomHeight: 4,
            width: 780,
            height: 160,
        })
        this._textbox.x = -20;
        this._textbox.y = -40;
        this.gameObject.addChild(this._textbox);
    }

    public setText(text: string): void {
        // Clear previous child objects
        this.clearChildObjects();
        
        // Parse and create child objects
        this.createTextObjects(text);
    }

    private clearChildObjects(): void {
        for (const childObj of this._childObjects) {
            this.gameObject.removeChild(childObj);
        }
        this._childObjects = [];
    }

    private createTextObjects(text: string): void {
        const parts: MagicWordsParsedText[] = this.parseText(text);
        const words: MagicWordsWrappedWord[] = this.measureWords(parts);
        const wrappedText: MagicWordsWrappedText = this.wrapWordsToLines(words);
        
        let currentY: number = 0;
        wrappedText.lines.forEach((line: MagicWordsWrappedLine) => {
            let currentX: number = 0;
            line.words.forEach((word: MagicWordsWrappedWord) => {
                const part = word.part;
                if (part.type === 'text') {
                    const textObj: GameObject = new GameObject({
                        label: "MagicText"
                    });
                    const textComp: TextComponent = new TextComponent(part.content, { fontSize: 24, align: 'left' });
                    textObj.addComponent(textComp);
                    
                    const pixiText: PIXI.Text | null = textComp.getTextObject();
                    if (pixiText) {
                        pixiText.anchor.set(0, 0.5);
                        textObj.x = currentX;
                        textObj.y = currentY;
                    }
                    
                    this.gameObject.addChild(textObj);
                    this._childObjects.push(textObj);
                    currentX += word.width;
                } else if (part.type === 'emoji') {
                    const emojiObj: GameObject = new GameObject({
                        label: "Magic Emoji"
                    });
                    const sprite: PIXI.Sprite = PIXI.Sprite.from(part.alias!);
                    sprite.height = 24;
                    sprite.scale.x = sprite.scale.y;
                    sprite.anchor.set(0, 0.5);
                    emojiObj.addChild(sprite);
                    
                    emojiObj.x = currentX;
                    emojiObj.y = currentY;
                    
                    this.gameObject.addChild(emojiObj);
                    this._childObjects.push(emojiObj);
                    currentX += word.width;
                }
            });
            currentY += this._lineHeight;
        });
    }

    private measureWords(parts: MagicWordsParsedText[]): MagicWordsWrappedWord[] {
        const words: MagicWordsWrappedWord[] = [];
        
        parts.forEach((part: MagicWordsParsedText) => {
            if (part.type === 'text') {
                // Split text by spaces to create individual words
                const textWords: string[] = part.content.split(' ');
                textWords.forEach((word: string, i: number) => {
                    if (word.length > 0) {
                        // Create a temporary text to measure width
                        const tempText: PIXI.Text = new PIXI.Text({
                            text: word,
                            style: { fontSize: 24, fill: 0xffffff, fontFamily: 'Arial', align: 'left' }
                        });
                        const width: number = tempText.width;
                        words.push({
                            part: { type: 'text', content: word },
                            width: width
                        });
                    }
                    // Add space after each word except the last
                    if (i < textWords.length - 1) {
                        const spaceText: PIXI.Text = new PIXI.Text({
                            text: ' ',
                            style: { fontSize: 24, fill: 0xffffff, fontFamily: 'Arial', align: 'left' }
                        });
                        words.push({
                            part: { type: 'text', content: ' ' },
                            width: spaceText.width
                        });
                    }
                });
            } else if (part.type === 'emoji') {
                const sprite: PIXI.Sprite = PIXI.Sprite.from(part.alias!);
                sprite.height = 24;
                sprite.scale.x = sprite.scale.y;
                const width: number = sprite.width;
                words.push({
                    part: part,
                    width: width
                });
                // Add space after emoji
                const spaceText: PIXI.Text = new PIXI.Text({
                    text: ' ',
                    style: { fontSize: 24, fill: 0xffffff, fontFamily: 'Arial', align: 'left' }
                });
                words.push({
                    part: { type: 'text', content: ' ' },
                    width: spaceText.width
                });
            }
        });
        
        return words;
    }

    private wrapWordsToLines(words: MagicWordsWrappedWord[]): MagicWordsWrappedText {
        const finalText: MagicWordsWrappedText = {
            lines: []
        };
        let currentLine: MagicWordsWrappedLine = {
            words: []
        };
        let currentLineWidth: number = 0;
        
        words.forEach((word: MagicWordsWrappedWord) => {
            if (currentLineWidth + word.width <= this._textbox.width - this._textPadding * 2) {
                currentLine.words.push(word);
                currentLineWidth += word.width;
            } else {
                // Start a new line if current line is not empty
                if (currentLine.words.length > 0) {
                    this.removeTrailingSpace(currentLine);
                }
                finalText.lines.push(currentLine);
                currentLine = { words: [word] };
                currentLine.words = [word];
                currentLineWidth = word.width;
            }
        });
        
        // Add the last line
        if (currentLine.words.length > 0) {
            this.removeTrailingSpace(currentLine);
            finalText.lines.push(currentLine);
        }
        
        return finalText;
    }

    private removeTrailingSpace(currentLine: MagicWordsWrappedLine): void {
        if (currentLine.words[currentLine.words.length - 1]!.part.type === 'text' && 
            currentLine.words[currentLine.words.length - 1]!.part.content === ' ') {
            currentLine.words.pop();
        }
    }

    private parseText(text: string): MagicWordsParsedText[] {
        const parts: MagicWordsParsedText[] = [];
        const regex: RegExp = /\{(.*?)\}/g;
        let lastIndex: number = 0;
        let match: RegExpExecArray | null;
        
        while ((match = regex.exec(text)) !== null) {
            // Add text before the emoji
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index)
                });
            }
            
            // Add the emoji
            const emojiName: string = match[1]!;
            const alias: string = `emoji-${emojiName}`;
            parts.push({
                type: 'emoji',
                content: match[0],
                alias: alias
            });
            
            lastIndex = regex.lastIndex;
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex)
            });
        }
        
        return parts;
    }
}