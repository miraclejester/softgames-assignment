import { GameObject } from '../GameObject';

/**
 * Class containing a root object and lifecycle methods for an isolated part of the game
 */
export abstract class Scene {
    /**
     * Name of the root object
     */
    protected static readonly ROOT_NAME: string = "Scene"

    /**
     * Root gameObject. All objects appearing on this scene have this as an ancestor
     */
    protected _root: GameObject;
    public get root(): GameObject {
        return this._root;
    }

    /**
     * Create the root object
     */
    public constructor() {
        this._root = new GameObject({
            label: Scene.ROOT_NAME
        })
    }

    /**
     * Initialize the scene based on its individual needs
     */
    public async start(): Promise<void> { /* override me */ }

    /**
     * Destroy the root object
     */
    public destroy(): void {
        this._root.destroy();
    }
}