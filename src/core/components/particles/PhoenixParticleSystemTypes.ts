import * as PIXI from 'pixi.js';
import type { PhoenixParticleModifier } from './PhoenixParticleModifier';

/**
 * Config type for the particle container
 */
export type PhoenixPartileContainerOptions = {
    /**
     * Max number of particles
     */
    maxParticles: number;
    /**
     * If true, scale can be modified
     */
    scale?: boolean;
    /**
     * If true, position can be modified
     */
    position?: boolean;
    /**
     * If true, rotation can be modified
     */
    rotation?: boolean;
    /**
     * If true, alpha can be modified
     */
    alpha?: boolean;
    /**
     * If true, color can be modified
     */
    color?: boolean;
    /**
     * Spritesheet to use for the particles
     */
    spritesheet: PIXI.Spritesheet;
    /**
     * Frames inside the spritesheet that can be used for the particles
     */
    frames: string[];
    /**
     * List of modifiers to include during initialization
     */
    modifiers?: PhoenixParticleModifier[];
}