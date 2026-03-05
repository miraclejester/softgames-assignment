import * as PIXI from 'pixi.js';
import type { PhoenixParticleModifier } from './PhoenixParticleModifier';

export type PhoenixPartileContainerOptions = {
    maxParticles: number;
    scale?: boolean;
    position?: boolean;
    rotation?: boolean;
    alpha?: boolean;
    color?: boolean;
    spritesheet: PIXI.Spritesheet;
    frames: string[];
    modifiers?: PhoenixParticleModifier[];
}