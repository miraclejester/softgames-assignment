import { sound, type IMediaInstance } from '@pixi/sound';

/**
 * Handles audio playing by managing the PIXISound instance
 */
export class AudioManager {
    /**
     * Alias of the bgm currently playingg
     */
    private _currentBgmAlias: string = '';
    /**
     * Sfx that were set to play during this scene.
     * Cleaned on the next scene transition
     */
    private _playingSfx: IMediaInstance[] = [];

    /**
     * Initialize audio
     */
    public initialize(): void {
        sound.volumeAll = 0.5;

        window.addEventListener('pointerdown', async () => {
            const context: AudioContext = sound.context.audioContext;
            if (context.state !== 'running') {
                await context.resume();
            }
        }, { once: true });
    }

    /**
     * Play sounds to warm up their contexts
     * Mobile optimization
     * @param aliases - Aliases to play
     */
    public warmUpSounds(aliases: string[]): void {
        aliases.forEach((alias: string) => {
            sound.play(alias, { volume: 0 });
        });
    }

    /**
     * Play an sfx. Adds the IMediaInstance to a list for later cleanup
     * @param alias - Alias of a loaded sound asset
     * @param addToList - if true, adds to the list of sfx to clean up on scene transition
     */
    public playSfx(alias: string, addToList: boolean = true): void {
        if (!sound.exists(alias)) {
            return;
        }
        const media: IMediaInstance | Promise<IMediaInstance> = sound.play(alias);

        if (addToList) {
            if (media instanceof Promise) {
                media.then((m: IMediaInstance) => this._playingSfx.push(m))
            } else {
                this._playingSfx.push(media);
            }
        }
    }

    /**
     * Plays a bgm. Does not restart the audio if the alias is unchanged
     * @param alias - Alias of a loaded audio asset
     * @returns 
     */
    public playBgm(alias: string): void {
        if (!sound.exists(alias)) {
            return;
        }
        if (alias === this._currentBgmAlias) {
            return;
        }
        if (this._currentBgmAlias !== '') {
            sound.stop(this._currentBgmAlias);
        }
        this._currentBgmAlias = alias;
        sound.play(alias, {
            loop: true
        });
    }

    /**
     * Cleans up the sfx list and stops any that are currently playing
     */
    public stopAllSfx(): void {
        this._playingSfx.forEach((media: IMediaInstance) => {
            media.stop();
        });
        this._playingSfx = [];
    }
}