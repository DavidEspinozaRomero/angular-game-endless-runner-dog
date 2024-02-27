import { Asset, Game } from './';

class Layer {
  x = 0;
  y = 0;
  speed = 0;
  constructor(
    private readonly game: Game,
    private readonly img: HTMLImageElement,
    private readonly width: number,
    private readonly height: number,
    private readonly speedModifier: number
  ) {}

  update() {
    this.speed = this.game.speed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0;
    }
    this.x = Math.floor(this.x - this.speed);
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  layer1 = new Layer(
    this.game,
    this.game.assets[Asset.LAYER1],
    this.game.width,
    this.game.height,
    0
  );
  layer2 = new Layer(
    this.game,
    this.game.assets[Asset.LAYER2],
    this.game.width,
    this.game.height,
    0.2
  );
  layer3 = new Layer(
    this.game,
    this.game.assets[Asset.LAYER3],
    this.game.width,
    this.game.height,
    0.4
  );
  layer4 = new Layer(
    this.game,
    this.game.assets[Asset.LAYER4],
    this.game.width,
    this.game.height,
    0.6
  );
  layer5 = new Layer(
    this.game,
    this.game.assets[Asset.LAYER5],
    this.game.width,
    this.game.height,
    1
  );

  backgroundLayers = [
    this.layer1,
    this.layer2,
    this.layer3,
    this.layer4,
    this.layer5,
  ];
  constructor(private readonly game: Game) {}

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(ctx);
    });
  }
}
