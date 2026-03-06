export type AceOfShadowsStackConfig = {
    atlasKey: string;
    initialCards: number;
    backingFrame: string;
    x: number;
    y: number;
};

export type AceOfShadowsConfig = {
    atlasKey: string;
    cardFrames: string[];
    backingFrame: string;
    startingStack: AceOfShadowsStackConfig;
    emptyStacks: AceOfShadowsStackConfig[];
}