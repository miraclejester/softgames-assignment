export type ButtonConfig = {
    atlasKey?: string;
    defaultKey: string;
    hoverKey: string;
    pressedKey: string;
    text: string;
}

export type ButtonCreationConfig = {
    buttonName?: string;
    buttonText: string;
    x: number;
    y: number;
    callback?: () => void;
}