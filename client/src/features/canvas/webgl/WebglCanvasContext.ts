import Program from '@/../engine/models/Program';
import simpleFragmentShader from '@/../engine/shaders/simpleFragmentShader';
import simpleVertexShader from '@/../engine/shaders/simpleVertexShader';
import MouseInput from '@/core/input/MouseInput';
import WebGLRenderer from '@/core/renderer/WebGLRenderer';
import CanvasContext from '../CanvasContext';
import CanvasRenderer from '../CanvasRenderer';
import CanvasTransformer from '../CanvasTransformer';
import WebglCanvasTransform from './WebglCanvasTransform';

class WebglCanvasContext implements CanvasContext {
  transform: CanvasTransformer;

  render: CanvasRenderer;

  input: MouseInput;

  private program: Program;

  canvas: HTMLCanvasElement;

  width = 0;

  height = 0;

  gridSizeX = 0;

  gridSizeY = 0;

  constructor(canvas: HTMLCanvasElement, context: WebGL2RenderingContext) {
    this.program = new Program(context, simpleVertexShader, simpleFragmentShader);
    this.transform = new WebglCanvasTransform();
    this.render = new WebGLRenderer(this.program);
    this.input = new MouseInput(canvas);
    this.canvas = canvas;
  }
}

export default WebglCanvasContext;
