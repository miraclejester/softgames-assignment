import { Component } from '../../core/Component';
import { GameObject } from '../../core/GameObject';
import { TextComponent } from '../../core/components/ui/TextComponent';
import * as PIXI from 'pixi.js';
import type { MagicWordsParsedText } from './MagicWordsTypes';

export class MagicWordsTextboxComponent extends Component {
    private _childObjects: GameObject[] = [];

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
        let currentX = 0;
        
        parts.forEach((part: MagicWordsParsedText) => {
            if (part.type === 'text') {
                const textObj: GameObject = new GameObject({
                    label: "MagicText"
                });
                const textComp: TextComponent = new TextComponent(part.content, { fontSize: 24, align: 'left' });
                textObj.addComponent(textComp);
                
                // Position the text object
                const pixiText: PIXI.Text | null = textComp.getTextObject();
                if (pixiText) {
                    pixiText.anchor.set(0, 0.5); // Left align, center vertically
                    textObj.x = currentX;
                    textObj.y = 0;
                    currentX += pixiText.width;
                }
                
                this.gameObject.addChild(textObj);
                this._childObjects.push(textObj);
            } else if (part.type === 'emoji') {
                const emojiObj: GameObject = new GameObject({
                    label: "Magic Emoji"
                });
                const sprite: PIXI.Sprite = PIXI.Sprite.from(part.alias!);
                sprite.height = 24;
                sprite.scale.x = sprite.scale.y; // Maintain aspect ratio
                sprite.anchor.set(0, 0.5); // Left align, center vertically
                emojiObj.addChild(sprite);
                
                emojiObj.x = currentX;
                emojiObj.y = 0;
                currentX += sprite.width;
                
                this.gameObject.addChild(emojiObj);
                this._childObjects.push(emojiObj);
            }
        });
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