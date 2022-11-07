/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanvasService } from '../CanvasService';

abstract class CanvasEventListener {
  onDataChange(): void {}

  onCanvasReady(_canvasService: CanvasService) {}
}

export default CanvasEventListener;
