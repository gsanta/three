import MouseInput from '@/core/input/MouseInput';
import CanvasContext from '../CanvasContext';
import CanvasRenderer from '../CanvasRenderer';
import CanvasTransformer from '../CanvasTransformer';
import HtmlCanvasRenderer from './HtmlCanvasRenderer';
import HtmlCanvasTransform from './HtmlCanvasTransform';

class HtmlCanvasContext implements CanvasContext {
  width = 0;

  height = 0;

  gridSizeX = 0;

  gridSizeY = 0;

  transform: CanvasTransformer;

  render: CanvasRenderer;

  canvas: HTMLCanvasElement;

  input: MouseInput;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.transform = new HtmlCanvasTransform(context);
    this.render = new HtmlCanvasRenderer(this, context);
    this.input = new MouseInput(canvas);
  }
}

export default HtmlCanvasContext;
