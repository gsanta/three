import ToolType from '@/core/tool/ToolType';
import DataContext from '@/ui/DataContext';
import useData from '@/ui/hooks/useData';
import RectangleToolOptions from '@/ui/tools/rectangle/RectangleToolOptions';
import React, { useContext } from 'react';

const Menubar = () => {
  const { tools } = useContext(DataContext);
  const selectedTool = useData('selectedTool', tools);
  console.log(selectedTool);

  const renderToolOptions = () => {
    switch (selectedTool?.type) {
      case ToolType.Rectangle:
        return <RectangleToolOptions />;
    }
  };

  return <div className="menubar">{renderToolOptions()}</div>;
};

export default Menubar;
