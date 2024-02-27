export const enum Asset {
  // Character
  PLAYER = 'player',
  // LAYERS
  LAYER1 = 'layer1',
  LAYER2 = 'layer2',
  LAYER3 = 'layer3',
  LAYER4 = 'layer4',
  LAYER5 = 'layer5',
  // ENEMIES
  ENEMY_FLY = 'fly',
  ENEMY_PLANT = 'plant',
  ENEMY_SPIDER_BIG = 'spiderBig',

  //PARTICLES
  FIRE = 'fire',
  BOOM = 'boom',

  // UI
  LIVES = 'lives',
}

export const assetsCharacter = {
  player: 'assets/shadow_dog.png',
};

// export const enum Layer {
//   LAYER1 = 'layer1',
//   LAYER2 = 'layer2',
//   LAYER3 = 'layer3',
//   LAYER4 = 'layer4',
//   LAYER5 = 'layer5',
// }

export const assetsLayers = {
  layer1: 'assets/layer-1.png',
  layer2: 'assets/layer-2.png',
  layer3: 'assets/layer-3.png',
  layer4: 'assets/layer-4.png',
  layer5: 'assets/layer-5.png',
};

// export const enum Enemies {
//   worm = 'worm',
//   ghost = 'ghost',
//   spider = 'spider',
//   plant = 'plant',
//   fly = 'fly',
//   spiderBig = 'spiderBig',
// }

export const assetsEnemies = {
  fly: 'assets/enemy_fly.png',
  plant: 'assets/enemy_plant.png',
  spiderBig: 'assets/enemy_spider_big.png',
  // worm: 'assets/enemy_worm.png',
  // ghost: 'assets/enemy_ghost.png',
  // spider: 'assets/enemy_spider.png',
};

export const assetsParticles = {
  fire: 'assets/fire.png',
  boom: 'assets/boom.png',
};

export const assetsUI = {
  lives: 'assets/lives.png',
};
