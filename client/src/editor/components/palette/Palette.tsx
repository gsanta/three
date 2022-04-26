import React, { useContext } from 'react';
import EditorContext from '../EditorContext';

const colors = ['#229954', '#E74C3C', '#FDFEFE', '#17202A', '#FDFEFE'];

const Palette = () => {
  const editor = useContext(EditorContext);

  const getColors = () => {
    return colors.map((color) => <div className="Palette__Color" style={{ backgroundColor: color }} />);
  };

  return <div className="Palette">{getColors()}</div>;
};

export default Palette;
