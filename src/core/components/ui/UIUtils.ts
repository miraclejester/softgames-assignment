import { App } from '../../App';
import { GameObject } from '../../GameObject';
import { ButtonComponent } from './ButtonComponent';
import type { ButtonCreationConfig } from './ButtonTypes';

/**
 * Utility UI methods
 */
export class UIUtils {
    /**
     * Creates a button with ui assets and callback
     * @param config - Configuration object
     * @returns GameObject with the button component added
     */
    public static createButtonObj(config: ButtonCreationConfig): GameObject {
        const buttonObj: GameObject = new GameObject({
            label: config.buttonName ?? 'Button'
        });
        buttonObj.position.set(config.x, config.y);
        const buttonComp: ButtonComponent = new ButtonComponent({
            atlasKey: 'ui',
            defaultKey: 'button_default',
            hoverKey: 'button_hover',
            pressedKey: 'button_pressed',
            text: config.buttonText
        });
        if (config.callback) {
            buttonComp.addOnPressListener(config.callback);
        }
        buttonObj.addComponent(buttonComp);
        return buttonObj;
    }

    /**
     * Creates a button that opens the main menu scene
     * @returns 
     */
    public static createBackToMenuButton(): GameObject {
        return this.createButtonObj({
            buttonText: "Back to Menu",
            x: 1150,
            y: 60,
            callback: () => App.instance.scenes.switchTo('main-menu')
        });
    }
}