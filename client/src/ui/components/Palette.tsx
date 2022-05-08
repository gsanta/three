import React, { useContext } from 'react';
import DataContext from '../DataContext';
import useData from '../hooks/useData';

const colors = ['#229954', '#E74C3C', '#FDFEFE', '#17202A', '#FDFEFE'];

const Palette = () => {
  const { palette } = useContext(DataContext);
  const selectedColor = useData('selectedColor', palette);

  const setColor = (color: string) => {
    palette!.selectedColor = color;
  };

  const renderColor = (color: string) => {
    return (
      <div className="Palette__Color" style={{ backgroundColor: color }} onClick={() => setColor(color)}>
        {selectedColor === color ? <div className="Palette__Color__Selection" /> : null}
      </div>
    );
  };

  return <div className="Palette">{colors.map((color) => renderColor(color))}</div>;
};

export default Palette;
