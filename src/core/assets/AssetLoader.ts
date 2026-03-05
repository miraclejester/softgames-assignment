import * as PIXI from 'pixi.js';
import type { AssetLoaderConfig } from './AssetLoaderConfig';

/**
 * Class for loading assets using PIXI's asset loader
 */
export class AssetLoader {

    public async initialize(config: AssetLoaderConfig): Promise<void> {
        await PIXI.Assets.init({
            manifest: config.manifestPath
        });
        await Promise.all(config.initialBundles.map((bundlePath: string) => this.loadBundle(bundlePath)));
    }

    private async loadBundle(bundleKey: string): Promise<void> {
        await PIXI.Assets.loadBundle(bundleKey);
    }
}