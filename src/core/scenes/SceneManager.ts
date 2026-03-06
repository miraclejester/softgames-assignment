import { App } from "../App";
import type { Scene } from "./Scene";
import type { SceneEntry, SceneManagerConfig } from "./SceneManagerTypes";

export class SceneManager {
    private _currentScene: Scene;
    private _config: SceneManagerConfig;
    private _sceneMap: Map<string, Scene>

    public constructor(config: SceneManagerConfig) {
        this._config = config;
        this._sceneMap = new Map<string, Scene>();
        this._config.entries.forEach((entry: SceneEntry) => {
            this._sceneMap.set(entry.key, new entry.scene());
        });
    }

    public async switchTo(key: string): Promise<void> {
        if (!this._sceneMap.has(key)) {
            return;
        }
        if (this._currentScene) {
            this._currentScene.destroy();
            App.instance.root.removeChild(this._currentScene.root);
        }
        this._currentScene = this._sceneMap.get(key)!;
        App.instance.root.addChild(this._currentScene.root);
        await this._currentScene.start();
    }
}