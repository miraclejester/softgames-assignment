import * as PIXI from 'pixi.js';
import type { AssetLoaderConfig } from './AssetLoaderConfig';

/**
 * Class for loading assets using PIXI's asset loader
 */
export class AssetLoader {

    /**
     * Initialize the aset loader with the manifest files and local bundles
     * @param config 
     */
    public async initialize(config: AssetLoaderConfig): Promise<void> {
        await PIXI.Assets.init({
            manifest: config.manifestPath
        });
        await Promise.all(config.initialBundles.map((bundlePath: string) => this.loadBundle(bundlePath)));
    }

    /**
     * Load all internal assets (images, sounds, urls we have locally) from the manifest
     * @param bundleKeys - Keys for the bundles containing data
     * @param progressCallback - Callback for showing loading progress
     */
    public async loadInternal(bundleKeys: string[], progressCallback: (progress: number) => void): Promise<void> {
        await PIXI.Assets.loadBundle(bundleKeys, progressCallback);
    }

    /**
     * Load external assets not present in the manifest
     * @param data - Data to load
     * @param progressCallback - Callback for showing loading progress
     */
    public async loadExternal(data: PIXI.UnresolvedAsset[], progressCallback: (progress: number) => void): Promise<void> {
        await PIXI.Assets.load(data, progressCallback);
    }

    /**
     * Get an asset from the cache
     * @param key - Alias of the asset
     * @returns An object of type T if it exists in the cache with the given alias
     */
    public get<T>(key: string): T {
        return PIXI.Assets.get<T>(key);
    }

    /**
     * Load one local bundle
     * @param bundleKey - Key for the bundle to load
     */
    private async loadBundle(bundleKey: string): Promise<void> {
        await PIXI.Assets.loadBundle(bundleKey);
    }
}