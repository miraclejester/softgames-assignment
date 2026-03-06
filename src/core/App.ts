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
     * App screen bounds
     */
    public get screenBounds(): PIXI.Rectangle {
        return this._innerApp.screen.getBounds();
    }

    private _root: GameObject;
    public get root(): GameObject {
        return this._root;
    }

    /**
     * Internal PIXI app managed by this object
     */
    private _innerApp: PIXI.Application;

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

    /**
     * Initialize variables
     */
    private constructor() {
        this._innerApp = new PIXI.Application();
        this._root = new GameObject({
            label: "root"
        });
        this._innerApp.stage.addChild(this._root);
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
                }
            ]
        });
    }

    /**
     * Initialize the app and put the canvas in the window
     */
    public async init(): Promise<void> {
        await Promise.all([
            this.initializeScreen(),
            this._assets.initialize({
                manifestPath: '/manifest.json',
                initialBundles: ['cards', 'particles', 'ui']
            })
        ]);
        this.initializePlugins();

        this._innerApp.ticker.add((ticker: PIXI.Ticker) => {
            this._root.update(ticker.deltaMS);
        });

        await this._sceneManager.switchTo('main-menu');
    }

    /**
     * Initializes the window
     */
    private async initializeScreen(): Promise<void> {
        await this._innerApp.init({
            width: 1280,
            height: 720,
            backgroundColor: 0x000000,
            resizeTo: window
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
        this._innerApp.canvas.width = window.innerWidth;
        this._innerApp.canvas.height = window.innerHeight;
        const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);        this._innerApp.stage.scale.set(scale);
    }
}