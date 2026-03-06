import { App } from './core/App.ts';

/**
 * Entry point of the application
 */
async function main(): Promise<void> {
  App.instance.init();
}

main();