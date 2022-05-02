import Tool from '@/core/tool/Tool';
import React, { useContext } from 'react';
import useData from '../hooks/useData';
import classNames from 'classnames';
import DataContext from '../DataContext';

const Toolbar = () => {
  const { tool: toolStore } = useContext(DataContext);
  const [tools, selectedTool] = useData('tool', 'tools', 'selectedTool');

  const handleClick = (tool: Tool) => {
    toolStore!.selectedTool = tool;
  };

  const renderTool = (tool: Tool) => {
    const className = classNames('Tool', {
      'Tool--selected': selectedTool === tool,
    });
    return (
      <div className={className} onClick={() => handleClick(tool)}>
        {tool.name}
      </div>
    );
  };

  return <div>{tools?.map((tool) => renderTool(tool))}</div>;
};

export default Toolbar;
