import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { GameObject } from './GameObject';
import { AssetLoader } from './assets/AssetLoader';
import { AceOfShadowsComponent } from '../sections/ace-of-shadows/AceOfShadowsComponent';
import type { MagicWordsAvatarSpec, MagicWordsConfigSchema } from '../sections/magic-words/MagicWordsTypes';
import { MagicWordsComponent } from '../sections/magic-words/MagicWordsComponent';


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
     * Initialize variables
     */
    private constructor() {
        this._innerApp = new PIXI.Application();
        this._root = new GameObject({
            label: "root"
        });
        this._innerApp.stage.addChild(this._root);
        this._assets = new AssetLoader();
    }

    /**
     * Initialize the app and put the canvas in the window
     */
    public async init(): Promise<void> {
        await Promise.all([
            this.initializeScreen(),
            this._assets.initialize({
                manifestPath: '/manifest.json',
                initialBundles: ['cards']
            })
        ]);
        this.initializePlugins();

        // Temp Ace of Shadows
        /*
        const aos: GameObject = new GameObject({
            label: "Ace of Shadows"
        });

        aos.addComponent(new AceOfShadowsComponent())

        this._root.addChild(aos);
        */

        const data: MagicWordsConfigSchema = await this._assets.loadCustomJSON('https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords');

        await Promise.all(data.avatars.map((avatar: MagicWordsAvatarSpec) => this._assets.loadImageFromUrl(avatar.url, `avatar-${avatar.name}`)));
        
        const mw: GameObject = new GameObject({
            label: "Magic Words"
        });
        mw.addComponent(new MagicWordsComponent(data));
        this._root.addChild(mw);

        this._innerApp.ticker.add((ticker: PIXI.Ticker) => {
            this._root.update(ticker.deltaMS);
        });
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