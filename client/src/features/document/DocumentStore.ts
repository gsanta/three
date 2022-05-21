import PDocument from '@/core/models/PDocument';

class DocumentStore {
  documents: PDocument[] = [];

  activeDocument: PDocument;

  private nameCounter = 1;

  constructor() {
    const frame = new PDocument(100, 100);
    this.addFrame(frame);
    this.activeDocument = frame;
  }

  addFrame(frame: PDocument) {
    if (!frame.name) {
      frame.name = `frame-${this.nameCounter}`;
      this.nameCounter += 1;
    }

    this.documents.push(frame);
  }
}

export default DocumentStore;
