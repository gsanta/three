import PixelStore from "../stores/PixelStore";

class PixelRenderer {
  private context: CanvasRenderingContext2D;
  private pixelStore: PixelStore;

  constructor(pixelStore: PixelStore) {
    this.pixelStore = pixelStore;
  }

  setContext(context: CanvasRenderingContext2D): void {
    this.context = context;
    // const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    // const ctx = canvas?.getContext('2d');
  }

  render(): void {
    this.context.clearRect()
  }
}

export default PixelRenderer;
