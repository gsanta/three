import CanvasTransformer from '../CanvasTransformer';

class WebglCanvasTransform implements CanvasTransformer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scale(_scale: number): void {
    throw new Error('Not implemented');
  }
}

export default WebglCanvasTransform;
