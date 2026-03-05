import { Component } from '../../core/Component';
import { TextComponent } from '../../core/components/TextComponent';

export class MagicWordsTextboxComponent extends Component {
    private _textComponent: TextComponent;
    public get text(): TextComponent {
        return this._textComponent;
    }
    
    public override ready(): void {
        this._textComponent = new TextComponent("");
        this.gameObject.addComponent(this._textComponent);
    }
}