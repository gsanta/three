import React from 'react';
import PaletteData from '../features/palette/PaletteData';
import MouseInput from '../core/input/MouseInput';
import CanvasData from '../features/canvas/CanvasData';

export interface DataContextType {
  canvas: CanvasData;
  mouseInput: MouseInput;
  paletteData: PaletteData;
}

const DataContext = React.createContext<Partial<DataContextType>>({});

export default DataContext;
