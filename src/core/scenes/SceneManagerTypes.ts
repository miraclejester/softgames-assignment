import type { Constructor } from "../TypeUtils";
import type { Scene } from "./Scene";

export type SceneManagerConfig = {
    entries: SceneEntry[];
};

export type SceneEntry = {
    scene: Constructor<Scene>,
    key: string
}