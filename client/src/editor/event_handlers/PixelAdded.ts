import EditorEvents from '../core/event/EditorEvents';
import EventHandler from '../core/event/EventHandler';
import PixelRenderer from '../pixel/PixelRenderer';

class PixelAdded implements EventHandler {
  private renderer: PixelRenderer;

  private events: EditorEvents;

  constructor(renderer: PixelRenderer, events: EditorEvents) {
    this.renderer = renderer;
    this.events = events;
    this.handler = this.handler.bind(this);
  }

  register(): void {
    this.events.on('pixelAdded', this.handler);
  }

  unregister(): void {
    this.events.off('pixelAdded', this.handler);
  }

  private handler() {
    this.renderer.render();
  }
}

export default PixelAdded;
