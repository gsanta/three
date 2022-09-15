import ToolStore from '@/services/tool/ToolStore';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Box from '../components/box/Box';
import Button from '../components/button/Button';

type ToolbarProps = {
  toolStore?: ToolStore;
};

const Toolbar = observer(({ toolStore }: ToolbarProps) => {
  return (
    <Box display="flex" flexDirection="column">
      {toolStore?.tools.map(({ iconName }) => (
        <Button iconName={iconName} />
      ))}
    </Box>
  );
});

export default Toolbar;
