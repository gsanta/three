import EditorEvents from '../EditorEvents';
import EventHandler from '../EventHandler';
import PixelRenderer from '../../renderer/PixelRenderer';
import WebGLRenderer from '@/core/renderer/WebGLRenderer';

class PixelAdded implements EventHandler {
  private renderer: PixelRenderer;

  private webGLRenderer: WebGLRenderer;

  private events: EditorEvents;

  constructor(renderer: PixelRenderer, webGLRenderer: WebGLRenderer, events: EditorEvents) {
    this.renderer = renderer;
    this.webGLRenderer = webGLRenderer;
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
    this.webGLRenderer.render();
  }
}

export default PixelAdded;
