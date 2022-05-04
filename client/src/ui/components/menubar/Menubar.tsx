import useData from '@/ui/hooks/useData';
import React from 'react';
import ComponentBuilder from '../ComponentBuilder';

const Menubar = () => {
  const [selectedTool] = useData('tool', 'selectedTool');

  const components = selectedTool?.options?.map((handler) => ComponentBuilder.build(handler));

  return <div className="menubar">{components}</div>;
};

export default Menubar;
