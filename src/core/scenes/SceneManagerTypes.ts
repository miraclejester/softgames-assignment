import type { Constructor } from '../TypeUtils';
import type { Scene } from './Scene';

/**
 * Configuration Object for the Scene Manager
 */
export type SceneManagerConfig = {
    /**
     * List of scenes to be managed
     */
    entries: SceneEntry[];
};

/**
 * Configuration Object for a single scene
 */
export type SceneEntry = {
    /**
     * Scene constructor
     */
    scene: Constructor<Scene>,
    /**
     * Scene key
     */
    key: string
}