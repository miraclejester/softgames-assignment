import * as PIXI from 'pixi.js';
import { ProgressBar } from '@pixi/ui';
import { App } from '../../core/App';
import { Scene } from '../../core/scenes/Scene';
import type { MagicWordsAvatarSpec, MagicWordsConfigSchema, MagicWordsEmojiSpec } from '../magic-words/MagicWordsTypes';
import { TextComponent } from '../../core/components/ui/TextComponent';
import { GameObject } from '../../core/GameObject';

export class LoaderScene extends Scene {
    private _loadingBar: ProgressBar;

    public override async start(): Promise<void> {
        const progressText: TextComponent = new TextComponent("Loading Internal Assets...");
        const progressObj: GameObject = new GameObject({
            label: 'ProgressText'
        })
        progressObj.x = 600;
        progressObj.y = 500;
        progressObj.addComponent(progressText);
        this._root.addChild(progressObj);

        await App.instance.assets.initialize({
            manifestPath: '/manifest.json',
            initialBundles: ['ui']
        })
        
        const uiSheet: PIXI.Spritesheet = App.instance.assets.get<PIXI.Spritesheet>('ui');
        this._loadingBar = new ProgressBar({
            bg: uiSheet.textures['slide_horizontal_grey']!,
            fill: uiSheet.textures['slide_horizontal_color']!,
            progress: 0
        })
        this._loadingBar.x = 500;
        this._loadingBar.y = 600;
        this._root.addChild(this._loadingBar);

        await App.instance.assets.loadInternal([
            'cards', 'particles', 'localMagicWords', 'hands', 'magicWords', 'audio'
        ], this.onProgress.bind(this));

        this._loadingBar.progress = 0;
        progressText.setText('Loading External Assets...');

        const magicWordsData: MagicWordsConfigSchema = App.instance.assets.get<MagicWordsConfigSchema>('magic-words-json');
        const avatarLoadData: PIXI.UnresolvedAsset[] = magicWordsData.avatars.map((avatar: MagicWordsAvatarSpec) => {
            return {
                alias: `avatar-${avatar.name}`,
                src: avatar.url,
                parser: 'texture'
            }
        });
        const emojiLoadData: PIXI.UnresolvedAsset[] = magicWordsData.emojies.map((emoji: MagicWordsEmojiSpec) => {
            return {
                alias: `emoji-${emoji.name}`,
                src: emoji.url,
                parser: 'texture'
            }
        });

        await App.instance.assets.loadExternal([
            ...avatarLoadData, ...emojiLoadData
        ], this.onProgress.bind(this));

        App.instance.scenes.switchTo('main-menu');
    }

    private onProgress(progress: number): void {
        this._loadingBar.progress = progress * 100;
    }
}