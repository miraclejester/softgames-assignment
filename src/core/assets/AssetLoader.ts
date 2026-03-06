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

    public async loadInternal(bundleKeys: string[], progressCallback: (progress: number) => void): Promise<void> {
        await PIXI.Assets.loadBundle(bundleKeys, progressCallback);
    }

    public async loadExternal(data: PIXI.UnresolvedAsset[], progressCallback: (progress: number) => void): Promise<void> {
        await PIXI.Assets.load(data, progressCallback);
    }

    public get<T>(key: string): T {
        return PIXI.Assets.get<T>(key);
    }

    public async loadImageFromUrl(url: string, alias: string): Promise<void> {
        await PIXI.Assets.load({
            alias,
            src: url,
            parser: 'texture'
        });
    }

    public getTextureSource(alias: string): string {
        let texture: PIXI.Texture = PIXI.Texture.from(alias);
        if (!texture) texture = PIXI.Texture.from('red_x');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const resource: ImageBitmap = texture.source.resource;
        if (!resource) return '';
        const canvas = document.createElement('canvas');
        canvas.width = resource.width;
        canvas.height = resource.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(resource, 0, 0);
            return canvas.toDataURL();
        }
        return '';
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