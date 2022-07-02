import EditorEvents from '../EditorEvents';
import EventHandler from '../EventHandler';
import CanvasContext from '@/features/canvas/CanvasContext';
import DocumentStore from '@/features/document/DocumentStore';

class PixelAdded implements EventHandler {
  private events: EditorEvents;

  private context: CanvasContext;

  private documentStore: DocumentStore;

  constructor(context: CanvasContext, events: EditorEvents, documentStore: DocumentStore) {
    this.context = context;
    this.events = events;
    this.documentStore = documentStore;
    this.handler = this.handler.bind(this);
  }

  register(): void {
    this.events.on('pixelAdded', this.handler);
  }

  unregister(): void {
    this.events.off('pixelAdded', this.handler);
  }

  private handler() {
    this.context.render.render(this.documentStore.activeDocument);
  }
}

export default PixelAdded;
