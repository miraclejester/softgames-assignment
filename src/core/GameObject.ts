import * as PIXI from 'pixi.js';
import type { Component } from './Component';
import type { Constructor } from './TypeUtils';



/**
 * Base game object class that can have components attached to it and manages their lifecycle.
 */
export class GameObject extends PIXI.Container {
    /**
     * Internal dictionary of components attached to this game object
     */
    private _compDict: Map<Constructor<Component>, Component> = new Map<Constructor<Component>, Component>();
    /**
     * List of child game objects. Since this extends PIXI.Container, it can also have non-GameObject children,
     * so we need to keep track of which ones are GameObjects for lifecycle management.
     */
    private _objChildren: GameObject[] = [];

    /**
     * Is true if the game object has been initialized (ready has been called)
     */
    private _isReady: boolean = false;
    public get isReady(): boolean {
        return this._isReady;
    }

    /**
     * Called when the game object is added to the stage or as a child of another game object.
     * Initializes the list of child game objects and attached components
     */
    public ready(): void {
        this.refreshObjChildren();
        this._objChildren.forEach((child: GameObject) => child.ready());
        this._compDict.forEach((component: Component) => component.ready());
        this._isReady = true;
    }

    /**
     * Called every frame. Updates attached children and components
     * @param delta - Time since last update
     */
    public update(delta: number): void {
        if (this.destroyed) {
            return;
        }
        this._objChildren.forEach((child: GameObject) => child.update(delta));
        this._compDict.forEach((component: Component) => component.update(delta));
    }

    /**
     * Destrys children and atatched components before destroying itself
     */
    public override destroy(): void {
        this._objChildren.forEach((child: GameObject) => child.destroy());
        this._compDict.forEach((component: Component) => component.destroy());
        super.destroy();
    }

    /**
     * Adds a child object and does extra processing if it is a game object
     * @param children - Children to add
     * @returns The first child added
     */
    public override addChild<U extends PIXI.ContainerChild[]>(...children: U): U[0] {
        children.filter((child: PIXI.ContainerChild) => child instanceof GameObject)
        .forEach((obj: GameObject) => obj.ready());
        const res: U[0] = super.addChild(...children);
        this.refreshObjChildren();
        return res;
    }

    /**
     * Attaches a component to this game object
     * @param component Component to attach
     */
    public addComponent<T extends Component>(component: T): void {
        this._compDict.set(component.constructor as Constructor<T>, component);
        component.registerGameObject(this);
        if (this._isReady) {
            component.ready();
        }
    }

    /**
     * Gets an attached component from this game object if it exists
     * @param ctor - Constructor of the component to get
     * @returns A component if it exists, otherwise undefined
     */
    public getComponent<T extends Component>(ctor: Constructor<T>): T | undefined {
        return this._compDict.get(ctor) as T | undefined;
    }

    /**
     * Refreshes the list of child game objects
     */
    private refreshObjChildren(): void {
        this._objChildren = this.children.filter((child: PIXI.ContainerChild) => child instanceof GameObject);
    }
}