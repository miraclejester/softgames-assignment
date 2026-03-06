/**
 * Configuration data for the asset loader
 */
export type AssetLoaderConfig = {
    /**
     * Path where the manifest for local assets is
     */
    manifestPath: string;
    /**
     * Bundles to load on startup
     */
    initialBundles: string[];
};