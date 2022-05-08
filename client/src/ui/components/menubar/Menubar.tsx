import DataContext from '@/ui/DataContext';
import useData from '@/ui/hooks/useData';
import React, { useContext } from 'react';

const Menubar = () => {
  const { tools } = useContext(DataContext);
  const selectedTool = useData('selectedTool', tools);
  console.log(selectedTool);

  return <div className="menubar"></div>;
};

export default Menubar;
