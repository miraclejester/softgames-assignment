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
            .get<MagicWordsConfigSchema>('magic-words-json');
        
        const mw: GameObject = new GameObject({
            label: "Magic Words"
        });

        const localAvatars: MagicWordsAvatarSpec[] = [
            {
                name: 'Neighbour',
                url: 'avatar-Neighbour',
                position: 'left'
            }
        ]
        mw.addComponent(new MagicWordsComponent({
            ...data, 
            avatars: [
                ...data.avatars,
                ...localAvatars
            ]
        }));
        this._root.addChild(mw);

        this._root.addChild(UIUtils.createBackToMenuButton());
    }
}