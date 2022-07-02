import CanvasTransformer from '../CanvasTransformer';

class CompoundCanvasTransform implements CanvasTransformer {
  private children: CanvasTransformer[];

  constructor(children: CanvasTransformer[]) {
    this.children = children;
  }

  scale(scale: number): void {
    this.children.forEach((child) => child.scale(scale));
  }
}

export default CompoundCanvasTransform;
