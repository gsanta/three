import CanvasRenderer from '../CanvasRenderer';

class CompoundCanvasRenderer implements CanvasRenderer {
  private children: CanvasRenderer[];

  constructor(children: CanvasRenderer[]) {
    this.children = children;
  }

  render(): void {
    this.children.forEach((child) => child.render());
  }
}

export default CompoundCanvasRenderer;
