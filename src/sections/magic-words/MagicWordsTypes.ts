import * as PIXI from 'pixi.js';

export type EMagicWordsAvatarPosition = 'left' | 'right';

export type MagicWordsDialogueLine = {
    name: string;
    text: string;
};

export type MagicWordsEmojiSpec = {
    name: string;
    url: string;
};

export type MagicWordsAvatarSpec = {
    name: string;
    url: string;
    position: EMagicWordsAvatarPosition;
}

export type MagicWordsConfigSchema = {
    dialogue: MagicWordsDialogueLine[];
    emojies: MagicWordsEmojiSpec[];
    avatars: MagicWordsAvatarSpec[];
}