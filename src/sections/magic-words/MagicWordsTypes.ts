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
};

export type MagicWordsConfigSchema = {
    dialogue: MagicWordsDialogueLine[];
    emojies: MagicWordsEmojiSpec[];
    avatars: MagicWordsAvatarSpec[];
    dialogueRate?: number;
    avatarBobSpeed?: number;
};

export type MagicWordsParsedText = {
    type: 'text' | 'emoji';
    content: string;
    alias?: string;
};