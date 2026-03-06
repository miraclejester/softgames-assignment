import { Component } from '../../core/Component';
import { GameObject } from '../../core/GameObject';
import { TextComponent } from '../../core/components/ui/TextComponent';
import * as PIXI from 'pixi.js';
import type { MagicWordsParsedText, MagicWordsWrappedLine, MagicWordsWrappedText, MagicWordsWrappedWord } from './MagicWordsTypes';

/**
 * Textbox for the Magic Words section
 */
export class MagicWordsTextboxComponent extends Component {
    /**
     * Objects that are currently in the textbox. Can be text or emojis
     */
    private _childObjects: GameObject[] = [];
    /**
     * Textbox sprite
     */
    private _textbox: PIXI.NineSliceSprite;
    /**
     * Separation between lines
     */
    private readonly _lineHeight: number = 32;
    /**
     * Horizontal padding for text
     */
    private readonly _textPadding: number = 10;

    /**
     * Create the textbox and add it to the gameObject
     */
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

    /**
     * Set the text for this textbox
     * Triggers the creation of the chained texts and emojies
     * @param text - Text to use
     */
    public setText(text: string): void {
        this.clearChildObjects();
        this.createTextObjects(text);
    }

    /**
     * Remove all content from the textbox
     */
    private clearChildObjects(): void {
        for (const childObj of this._childObjects) {
            this.gameObject.removeChild(childObj);
        }
        this._childObjects = [];
    }

    /**
     * Create the text for the textbox, taking into account emojies and word wrapping
     * @param text - Text to use
     */
    private createTextObjects(text: string): void {
        // With these 3 calls, transform the text into a MagicWordsWrappedText instance
        const parts: MagicWordsParsedText[] = this.parseText(text);
        const words: MagicWordsWrappedWord[] = this.measureWords(parts);
        const wrappedText: MagicWordsWrappedText = this.wrapWordsToLines(words);
        
        let currentY: number = 0;
        wrappedText.lines.forEach((line: MagicWordsWrappedLine) => {
            let currentX: number = 0;
            line.words.forEach((word: MagicWordsWrappedWord) => {
                // Process each word and initialize their text or sprite components. Widths and positions have already been calculated
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

    /**
     * Measure the width of individual words in this text and get a list of words with their widths
     * @param parts - List of text elements, processed to determine their type
     * @returns List of the words with their final width added
     */
    private measureWords(parts: MagicWordsParsedText[]): MagicWordsWrappedWord[] {
        const words: MagicWordsWrappedWord[] = [];
        
        parts.forEach((part: MagicWordsParsedText) => {
            if (part.type === 'text') {
                // Split by space. Process space and non-spaces differently
                const textWords: string[] = part.content.split(' ');
                textWords.forEach((word: string, i: number) => {
                    if (word.length > 0) {
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
                    // Add a space after the last word
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
                // For emojies, get the width from the asset
                const sprite: PIXI.Sprite = PIXI.Sprite.from(part.alias!);
                sprite.height = 24;
                sprite.scale.x = sprite.scale.y;
                const width: number = sprite.width;
                words.push({
                    part: part,
                    width: width
                });

                // Add a space after the emoji
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

    /**
     * Combine processed words into lines that don't exceed the width limit
     * @param words - Words to process
     * @returns List of processed lines
     */
    private wrapWordsToLines(words: MagicWordsWrappedWord[]): MagicWordsWrappedText {
        const finalText: MagicWordsWrappedText = {
            lines: []
        };
        let currentLine: MagicWordsWrappedLine = {
            words: []
        };
        let currentLineWidth: number = 0;
        
        words.forEach((word: MagicWordsWrappedWord) => {
            // If adding the word does not exceed the width limit, add it
            if (currentLineWidth + word.width <= this._textbox.width - this._textPadding * 2) {
                currentLine.words.push(word);
                currentLineWidth += word.width;
            } else {
            // If the current word exceeds the width limit, remove trailing space and finalize the current line
            // Start a new line with the current word
                if (currentLine.words.length > 0) {
                    this.removeTrailingSpace(currentLine);
                }
                finalText.lines.push(currentLine);
                currentLine = { words: [word] };
                currentLine.words = [word];
                currentLineWidth = word.width;
            }
        });

        // Remove trailing space from the last word
        if (currentLine.words.length > 0) {
            this.removeTrailingSpace(currentLine);
            finalText.lines.push(currentLine);
        }
        
        return finalText;
    }

    /**
     * Remove the last word from a line if it is whitespace
     * @param currentLine - Line to processs
     */
    private removeTrailingSpace(currentLine: MagicWordsWrappedLine): void {
        if (currentLine.words[currentLine.words.length - 1]!.part.type === 'text' && 
            currentLine.words[currentLine.words.length - 1]!.part.content === ' ') {
            currentLine.words.pop();
        }
    }

    /**
     * Use regex to determine the type of each word in a text, and also add processing data
     * @param text - Text to process
     * @returns Parsed text with width and content for texts and sprites and names for emojies
     */
    private parseText(text: string): MagicWordsParsedText[] {
        const parts: MagicWordsParsedText[] = [];
        const regex: RegExp = /\{(.*?)\}/g;
        let lastIndex: number = 0;
        let match: RegExpExecArray | null;
        
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                // Grab all the text from before the emoji was seen
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index)
                });
            }
            
            // Get the emoji data. Match[1] is emoji name
            // Match[2] is the entire word with brackets ex. ({emojiname})
            const emojiName: string = match[1]!;
            const alias: string = `emoji-${emojiName}`;
            parts.push({
                type: 'emoji',
                content: match[0],
                alias: alias
            });
            
            lastIndex = regex.lastIndex;
        }

        // Grab all the text after the last emoji
        if (lastIndex < text.length) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex)
            });
        }
        
        return parts;
    }
}