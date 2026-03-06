/**
 * Configuration object for an Ace Of Shadows stack
 */
export type AceOfShadowsStackConfig = {
    /**
     * Key for the stack item spritesheet
     */
    atlasKey: string;
    /**
     * Starting number of cards
     */
    initialCards: number;
    /**
     * Frame for the back side of the item
     */
    backingFrame: string;
    /**
     * Position of the stack
     */
    x: number;
    y: number;
};

/**
 * Config for the Ace of Shadows section
 */
export type AceOfShadowsConfig = {
    /**
     * Atlas for the stacks
     */
    atlasKey: string;
    /**
     * Possible frames for the flipped items
     */
    cardFrames: string[];
    /**
     * Frame for the back side of the items
     */
    backingFrame: string;
    /**
     * Configs for starting and empty stacks
     */
    startingStack: AceOfShadowsStackConfig;
    emptyStacks: AceOfShadowsStackConfig[];
}