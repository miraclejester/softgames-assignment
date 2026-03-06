import { App } from "../App";
import type { Constructor } from "../TypeUtils";
import type { Scene } from "./Scene";
import type { SceneEntry, SceneManagerConfig } from "./SceneManagerTypes";

/**
 * Manages a group of scenes and transitions between them
 */
export class SceneManager {
    /**
     * Currenly active scene
     */
    private _currentScene: Scene;
    /**
     * Configuration object. Includes the scenes to manage
     */
    private _config: SceneManagerConfig;
    /**
     * Map of scene name to scene constructor for quick access
     */
    private _sceneMap: Map<string, Constructor<Scene>>

    /**
     * Initialize the scene map
     * @param config - Configuration object
     */
    public constructor(config: SceneManagerConfig) {
        this._config = config;
        this._sceneMap = new Map<string, Constructor<Scene>>();
        this._config.entries.forEach((entry: SceneEntry) => {
            this._sceneMap.set(entry.key, entry.scene);
        });
    }

    /**
     * Switch to a different scene. This destroys the current scene and removes it from the App's root
     * @param key - Scene to change to. Should be in the scene map
     */
    public async switchTo(key: string): Promise<void> {
        if (!this._sceneMap.has(key)) {
            return;
        }
        if (this._currentScene) {
            this._currentScene.destroy();
            App.instance.root.removeChild(this._currentScene.root);
        }
        App.instance.audio.stopAllSfx();
        this._currentScene = new (this._sceneMap.get(key)!);
        App.instance.root.addChild(this._currentScene.root);
        await this._currentScene.start();
    }
}