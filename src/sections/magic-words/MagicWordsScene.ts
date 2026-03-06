import { App } from '../../core/App';
import { UIUtils } from '../../core/components/ui/UIUtils';
import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';
import { MagicWordsComponent } from './MagicWordsComponent';
import type { MagicWordsAvatarSpec, MagicWordsConfigSchema } from './MagicWordsTypes';

export class MagicWordsScene extends Scene {
    protected static override readonly ROOT_NAME: string = "Magic Words Scene";

    public override async start(): Promise<void> {
        const data: MagicWordsConfigSchema = await App.instance.assets
            .loadCustomJSON('https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords');

        await Promise.all(data.avatars.map(
            (avatar: MagicWordsAvatarSpec) => App.instance.assets.loadImageFromUrl(avatar.url, `avatar-${avatar.name}`))
        );
        
        const mw: GameObject = new GameObject({
            label: "Magic Words"
        });
        mw.addComponent(new MagicWordsComponent(data));
        this._root.addChild(mw);

        this._root.addChild(UIUtils.createBackToMenuButton());
    }
}