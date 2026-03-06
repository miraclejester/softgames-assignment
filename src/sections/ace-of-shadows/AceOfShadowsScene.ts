import { GameObject } from '../../core/GameObject';
import { Scene } from '../../core/scenes/Scene';
import { AceOfShadowsComponent } from './AceOfShadowsComponent';

export class AceOfShadowsScene extends Scene {
    protected static override readonly ROOT_NAME: string = 'Ace Of Shadows Scene';

    public override async start(): Promise<void> {
        const aos: GameObject = new GameObject({
            label: "Ace of Shadows"
        });

        aos.addComponent(new AceOfShadowsComponent())

        this._root.addChild(aos);
    }
}