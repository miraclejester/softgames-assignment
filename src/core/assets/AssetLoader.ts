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

    public async loadImageFromUrl(url: string, alias: string): Promise<void> {
        await PIXI.Assets.load({
            alias,
            src: url,
            parser: 'texture'
        });
    }

    public async loadCustomJSON<T>(path: string): Promise<T> {
        try {
            const response: Response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load JSON at path: ${path}`);
            }
            return await (response.json()) as T
        } catch (error) {
            console.error(`Error loading JSON from ${path}:`, error);
            throw error;
        }
    }
}