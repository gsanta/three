import PDocument from '@/core/models/PDocument';

interface CanvasRenderer {
  render(document: PDocument): void;
}

export default CanvasRenderer;
