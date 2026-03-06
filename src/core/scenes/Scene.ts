import { GameObject } from "../GameObject";

export abstract class Scene {
    protected static readonly ROOT_NAME: string = "Scene"

    protected _root: GameObject;
    public get root(): GameObject {
        return this._root;
    }

    public constructor() {
        this._root = new GameObject({
            label: Scene.ROOT_NAME
        })
    }

    public async start(): Promise<void> { /* override me */ }

    public destroy(): void {
        this._root.destroy();
    }
}