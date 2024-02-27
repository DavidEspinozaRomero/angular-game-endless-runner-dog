export class FloatingMessage {
  markedForDeletion = false;
  timer = 0;
  constructor(
    private value: string,
    private x: number,
    private y: number,
    private targetX: number,
    private targetY: number
  ) {}

  update() {
    this.x += (this.targetX - this.x) / 20;
    this.y += (this.targetY - this.y) / 20;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = '20px Helvetica';
    ctx.fillStyle = 'white';
    ctx.fillText(this.value, this.x, this.y);
    ctx.fillStyle = 'black';
    ctx.fillText(this.value, this.x + 2, this.y + 2);
    ctx.restore();
  }
}
