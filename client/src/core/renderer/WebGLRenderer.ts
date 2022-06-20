import Program from '@/../engine/models/Program';
import DocumentStore from '@/features/document/DocumentStore';
import PixelUtils from '../utils/PixelUtils';

class WebGLRenderer {
  private documentStore: DocumentStore;

  private program: Program;

  constructor(documentStore: DocumentStore, program: Program) {
    this.documentStore = documentStore;
    this.program = program;
  }

  render(): void {
    const { activeDocument } = this.documentStore;
    const { backgroundLayer } = activeDocument;

    this.program.setPositions(PixelUtils.getClipPositions(backgroundLayer));

    this.program.drawScene();
  }
}

export default WebGLRenderer;
