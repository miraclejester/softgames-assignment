// Shorthand type for the avatar's possible positions
export type EMagicWordsAvatarPosition = 'left' | 'right';

/**
 * Single line of dialogue
 */
export type MagicWordsDialogueLine = {
    /**
     * Avatar name
     */
    name: string;
    /**
     * Text dialogue
     */
    text: string;
};

/**
 * Data of a single emoji
 */
export type MagicWordsEmojiSpec = {
    /**
     * Emoji name
     */
    name: string;
    /**
     * Emoji asset url
     */
    url: string;
};

/**
 * Data of a single avatar
 */
export type MagicWordsAvatarSpec = {
    /**
     * Avatar name
     */
    name: string;
    /**
     * Avatar asset url
     */
    url: string;
    /**
     * Position where this avatar goes
     */
    position: EMagicWordsAvatarPosition;
};

/**
 * Config object for the Magic Words section
 */
export type MagicWordsConfigSchema = {
    /**
     * All dialogue lines
     */
    dialogue: MagicWordsDialogueLine[];
    /**
     * All possible emojies
     */
    emojies: MagicWordsEmojiSpec[];
    /**
     * All available avatars
     */
    avatars: MagicWordsAvatarSpec[];
    /**
     * Speed of the avatar bob animation in milliseconds
     */
    avatarBobSpeed?: number;
    /**
     * Time between dialogues
     */
    timeBetweenLines?: number;
};

/**
 * Single unit of text parsed from a line
 * Can be a piece of text or an emoji
 */
export type MagicWordsParsedText = {
    /**
     * Type of content
     */
    type: 'text' | 'emoji';
    /**
     * Content of the unit
     * For both types it is the entire text that was parsed,
     * So for emojis it is the text in brackeds ex. ({emojiname})
     */
    content: string;
    /**
     * Alias for sprite. Emoji only
     */
    alias?: string;
};

/**
 * Single piece of text and the width it would occupy
 * in a line
 */
export type MagicWordsWrappedWord = {
    /**
     * Parsed unit of text
     */
    part: MagicWordsParsedText;
    /**
     * Width it occupies
     */
    width: number;
};

/**
 * Entire line that covers the width of the textbox,
 * expressed as an array of parsed units
 */
export type MagicWordsWrappedLine = {
    words: MagicWordsWrappedWord[]
}

/**
 * Entire dialogue parsed and ready to render
 */
export type MagicWordsWrappedText = {
    lines: MagicWordsWrappedLine[];
};