import MouseInput from '@/core/input/MouseInput';
import CanvasRenderer from './CanvasRenderer';
import CanvasTransformer from './CanvasTransformer';

interface CanvasContext {
  canvas?: HTMLCanvasElement;
  width: number;
  height: number;
  gridSizeX: number;
  gridSizeY: number;

  transform: CanvasTransformer;
  render: CanvasRenderer;
  input: MouseInput;
}

export default CanvasContext;
