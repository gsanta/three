import Tool, { ToolIconName } from '@/core/tool/Tool';
import React, { useContext } from 'react';
import useData from '../hooks/useData';
import classNames from 'classnames';
import DataContext from '../DataContext';
import { BiPencil, BiRectangle } from 'react-icons/bi';

const renderIcon = (iconName: ToolIconName, isSelected: boolean) => {
  const iconSize = 30;
  const color = 'black';
  const selectedColor = 'blue';

  switch (iconName) {
    case 'pencil':
      return <BiPencil size={iconSize} color={isSelected ? selectedColor : color} />;
    case 'rectangle':
      return <BiRectangle size={iconSize} color={isSelected ? selectedColor : color} />;
    default:
      return null;
  }
};

const Toolbar = () => {
  const { tool: toolStore } = useContext(DataContext);
  const [tools, selectedTool] = useData('tool', 'tools', 'selectedTool');

  const handleClick = (tool: Tool) => {
    toolStore!.selectedTool = tool;
  };

  const renderTool = (tool: Tool) => {
    // const className = classNames('Tool', {});
    return (
      <div className="Tool" onClick={() => handleClick(tool)}>
        {tool.icon ? renderIcon(tool.icon, selectedTool === tool) : null}
      </div>
    );
  };

  return <div className="Toolbar">{tools?.map((tool) => renderTool(tool))}</div>;
};

export default Toolbar;
