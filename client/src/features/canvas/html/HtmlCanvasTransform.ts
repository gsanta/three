import CanvasTransformer from '../CanvasTransformer';

class HtmlCanvasTransform implements CanvasTransformer {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  scale(scale: number): void {
    this.context.scale(scale, scale);
  }
}

export default HtmlCanvasTransform;
