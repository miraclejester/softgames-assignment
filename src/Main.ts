import { App } from './core/App.ts';

async function main(): Promise<void> {
  App.instance.init();
}

main();