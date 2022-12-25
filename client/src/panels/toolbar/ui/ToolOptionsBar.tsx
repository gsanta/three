import ToolName from '@/panels/toolbar/model/ToolName';
import useAppContext from '@/ui/hooks/useAppContext';
import { Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import BrushToolOptions from './BrushToolOptions';

const ToolOptionsBar = observer(() => {
  const { toolStore } = useAppContext();

  const getOptions = () => {
    switch (toolStore.getSelectedTool()?.name) {
      case ToolName.Brush:
        return <BrushToolOptions />;
      default:
        return null;
    }
  };

  return (
    <Flex alignItems="center" height="100%">
      {getOptions()}
    </Flex>
  );
});

export default ToolOptionsBar;
