import CanvasContext from './CanvasContext';

class CanvasContextProvider {
  private context: CanvasContext;

  constructor(context: CanvasContext) {
    this.context = context;
  }

  setCanvas(context: CanvasContext) {
    this.context = context;
  }

  getCanvas(): CanvasContext {
    return this.context;
  }
}

export default CanvasContextProvider;
