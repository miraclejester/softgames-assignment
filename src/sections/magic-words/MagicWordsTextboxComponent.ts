import { App } from '../../core/App';
import { Component } from '../../core/Component';
import { HTMLTextComponent } from '../../core/components/ui/HTMLTextComponent';

export class MagicWordsTextboxComponent extends Component {
    private _textComponent: HTMLTextComponent;
    public get text(): HTMLTextComponent {
        return this._textComponent;
    }
    
    public override ready(): void {
        this._textComponent = new HTMLTextComponent("");
        this.gameObject.addComponent(this._textComponent);
    }

    public setText(text: string): void {
        this._textComponent.setText(this.parseEmoji(text));
    }

    public parseEmoji(text: string): string {
        return text.replace(/\{(.*?)\}/g, (_, name) => {
            const alias: string = `emoji-${name}`;
            const src: string = App.instance.assets.getTextureSource(alias);
            return `<img src="${src}" height="24"/>`;
        });
    }
}