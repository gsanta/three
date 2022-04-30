import React from 'react';
import PaletteData from '../features/palette/PaletteData';
import MouseHandler from '../input_handlers/MouseHandler';
import CanvasData from '../pixel/CanvasData';

export interface DataContextType {
  canvas: CanvasData;
  mouseHandler: MouseHandler;
  paletteData: PaletteData;
}

const DataContext = React.createContext<Partial<DataContextType>>({});

export default DataContext;
