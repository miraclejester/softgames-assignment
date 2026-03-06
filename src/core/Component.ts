import { GameObject } from './GameObject';

/**
 * Base component class. Attaches to game objects to provide functionality
 */
export class Component {
    /**
     * GameObject this component is attached to
     */
    private _gameObject: GameObject;
    public get gameObject(): GameObject {
        return this._gameObject;
    }

    /**
     * Called when the component is attached to the game object
     */
    public ready(): void { /* Override me */};

    /**
     * Called when the game object is updated.
     * @param _delta Time since last update in milliseconds
     */
    public update(_delta: number): void { /* Override me */};

    /**
     * Called when the game object is destroyed
     */
    public destroy(): void { /* Override me */};

    /**
     * Registers a game object as the parent of this component.
     * @param obj - The game object to attach to
     */
    public registerGameObject(obj: GameObject): void {
        this._gameObject = obj;
    }
}