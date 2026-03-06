import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { GameObject } from './GameObject';
import { AssetLoader } from './assets/AssetLoader';
import { SceneManager } from './scenes/SceneManager';
import { MainMenuScene } from '../sections/main-menu/MainMenuScene';
import { AceOfShadowsScene } from '../sections/ace-of-shadows/AceOfShadowsScene';
import { MagicWordsScene } from '../sections/magic-words/MagicWordsScene';
import { PhoenixFlameScene } from '../sections/phoenix-flame/PhoenixFlameScene';
import { TextComponent } from './components/ui/TextComponent';
import { LoaderScene } from '../sections/loader/LoaderScene';
import { AudioManager } from './audio/AudioManager';


/**
 * Manager class for the PIXI application
 */
export class App {
    /**
     * Static instance of the App
     */
    private static _instance: App;
    public static get instance(): App {
        if (!App._instance) {
            App._instance = new App();
        }
        return App._instance;
    }

    /**
     * Internal PIXI app managed by this object
     */
    private _innerApp: PIXI.Application;

    /**
     * App screen bounds
     */
    public get screenBounds(): PIXI.Rectangle {
        return this._innerApp.screen.getBounds();
    }

    private _root: GameObject;
    public get root(): GameObject {
        return this._root;
    }

    private _overlay: GameObject;
    public get overlay(): GameObject {
        return this._overlay;
    }

    /**
     * Asset loader
     */
    private _assets: AssetLoader;
    public get assets(): AssetLoader {
        return this._assets;
    }

    /**
     * Scene manager
     */
    private _sceneManager: SceneManager;
    public get scenes(): SceneManager {
        return this._sceneManager;
    }

    private _audioManager: AudioManager;
    public get audio(): AudioManager {
        return this._audioManager;
    }

    /**
     * Initialize variables
     */
    private constructor() {
        this._innerApp = new PIXI.Application();
        this._root = new GameObject({
            label: "root"
        });
        this._overlay = new GameObject({
            label: "overlay"
        });
        this._innerApp.stage.addChild(this._root);
        this._innerApp.stage.addChild(this._overlay);
        this._assets = new AssetLoader();
        this._sceneManager = new SceneManager({
            entries: [
                {
                    key: 'main-menu',
                    scene: MainMenuScene
                },
                {
                    key: 'ace-of-shadows',
                    scene: AceOfShadowsScene
                },
                {
                    key: 'magic-words',
                    scene: MagicWordsScene
                },
                {
                    key: 'phoenix-flame',
                    scene: PhoenixFlameScene
                },
                {
                    key: 'loader',
                    scene: LoaderScene
                }
            ]
        });
        this._audioManager = new AudioManager();
    }

    /**
     * Initialize the app and put the canvas in the window
     */
    public async init(): Promise<void> {
        await this.initializeScreen();
        this.initializePlugins();

        const fpsObj: GameObject = new GameObject({
            label: 'FPS'
        });
        const fpsTextComp: TextComponent = new TextComponent('FPS: ');
        fpsObj.addComponent(fpsTextComp);
        fpsObj.x = 100;
        fpsObj.y = 60;

        this._overlay.addChild(fpsObj);

        this._innerApp.ticker.add((ticker: PIXI.Ticker) => {
            this._root.update(ticker.deltaMS);
            fpsTextComp.setText(`FPS: ${ticker.FPS.toFixed(2)}`);
        });

        this._audioManager.initialize();
        await this._sceneManager.switchTo('loader');
    }

    /**
     * Initializes the window
     */
    private async initializeScreen(): Promise<void> {
        await this._innerApp.init({
            width: 1280,
            height: 720,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio,
            autoDensity: true
        });
        this._innerApp.canvas.style.display = 'block';
        this._innerApp.canvas.style.position = 'absolute';
        this._innerApp.canvas.style.top = '0';
        this._innerApp.canvas.style.left = '0';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.appendChild(this._innerApp.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('pointerdown', () => {
            if (!document.fullscreenElement) {
                this._innerApp.canvas.requestFullscreen();
            }
        });
    }

    /**
     * Initialize pixi plugins
     */
    private initializePlugins(): void {
        // Gsap
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);
    }

    /**
     * Resize the canvas and scale the root to fit the screen
     */
    private resize(): void {
        const scale: number = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
        const width: number = 1280 * scale;
        const height: number = 720 * scale;

        this._innerApp.canvas.style.width = `${width}px`;
        this._innerApp.canvas.style.height = `${height}px`;
        this._innerApp.canvas.style.left = `${(window.innerWidth - width) / 2}px`;
        this._innerApp.canvas.style.right = `${(window.innerHeight - height) / 2}px`;
    }
}