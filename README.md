# Softgames Assignment - Jose Montenegro

Hello Softgames! This is my entry for the technical assignment. I hope you like it! Below are descriptions for important parts of the application

## Entry Point and Application Class

The Application class is the start point of the assignment. It initializes the screen itself to make it responsive at a base resolution (currently 1280x720) and a few managers (scenes, assets, audio), then starts the loader scene

## Loader Scene

Loads all required assets for the project. Loading is divided in 2 steps:

### Internal Assets

These are all assets that come with the project, plus those we know the address of right away (the only case in this assignment would be the magic words data)

### External Assets

Assets that need to be loaded as a result of data from the internal load (Avatars and emojies from Magic Words)

### After Loading

After loading is done, the scene jumps to the main menu

## Main Menu Scene 

Contains 3 buttons and a title and some fun hands. Each button leads to one of the required sections

## Ace of Shadows

This scene features a 144 standard deck made of sprites that is slowly emptied into 4 stacks on top of card-hungry hands. As each card is moving, it reveals a random content underneath

## Magic Words

Renders the dialogue from the loaded configuration. For the neighbour character, I decided to go with a cool hat guy. Same idea with the affirmative emoji, since he is the only character to use it. For the win emoji, a generally triumphant one was chosen.

After the dialogue ends, a helpful hand guides you to the main menu

## Phoenix Flame

This scene shows a pair of dignified hands holding the sacred phoenix flame. The fire effect is meant to evoke phoenix feathers burning into the sky as they are born from the hands