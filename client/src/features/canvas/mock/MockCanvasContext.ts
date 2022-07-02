import MouseInput from '@/core/input/MouseInput';
import CanvasContext from '../CanvasContext';
import CanvasRenderer from '../CanvasRenderer';
import CanvasTransformer from '../CanvasTransformer';
import MockCanvasRenderer from './MockCanvasRenderer';
import MockCanvasTransform from './MockCanvasTransform';

class MockCanvasContext implements CanvasContext {
  width = 0;

  height = 0;

  gridSizeX = 0;

  gridSizeY = 0;

  transform: CanvasTransformer;

  render: CanvasRenderer;

  input: MouseInput;

  constructor() {
    this.transform = new MockCanvasTransform();
    this.render = new MockCanvasRenderer();
    this.input = new MouseInput();
  }
}

export default MockCanvasContext;
