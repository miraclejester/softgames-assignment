import { sound, type IMediaInstance } from '@pixi/sound';

export class AudioManager {
    private _currentBgmAlias: string = '';
    private _playingSfx: IMediaInstance[] = [];

    public initialize(): void {
        sound.volumeAll = 0.5;
    }

    public playSfx(alias: string, addToList: boolean = true): void {
        const media: IMediaInstance | Promise<IMediaInstance> = sound.play(alias);

        if (addToList) {
            if (media instanceof Promise) {
                media.then((m: IMediaInstance) => this._playingSfx.push(m))
            } else {
                this._playingSfx.push(media);
            }
        }
    }

    public playBgm(alias: string): void {
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

    public stopAllSfx(): void {
        this._playingSfx.forEach((media: IMediaInstance) => {
            media.stop();
        });
        this._playingSfx = [];
    }
}