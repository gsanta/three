import CanvasContext from '../CanvasContext';
import CanvasRenderer from '../CanvasRenderer';
import CanvasTransformer from '../CanvasTransformer';
import CompoundCanvasRenderer from './CompoundCanvasRenderer';
import CompoundCanvasTransform from './CompoundCanvasTransform';

class CompoundCanvasContext implements CanvasContext {
  transform: CanvasTransformer;

  render: CanvasRenderer;

  constructor(children: CanvasContext[]) {
    this.transform = new CompoundCanvasTransform(children.map((child) => child.transform));
    this.render = new CompoundCanvasRenderer(children.map((child) => child.render));
  }
}

export default CompoundCanvasContext;
