import Box from '@/ui/components/box/Box';
import Icon from '@/ui/components/icon/Icon';
import { IconButton, Menu, MenuButton, MenuItem, MenuList, useBoolean } from '@chakra-ui/react';
import React from 'react';
import ExportDialog from './ExportDialog';

const SettingsPanel = () => {
  const [isExportDialogOpen, { on: openExportDialog, off: closeExportDialog }] = useBoolean(false);

  return (
    <Box>
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<Icon name="CiSettings" />} size="sm" variant="solid" />
        <MenuList>
          <MenuItem onClick={openExportDialog}>Export</MenuItem>
          <MenuItem>Export 2</MenuItem>
        </MenuList>
      </Menu>

      <ExportDialog isOpen={isExportDialogOpen} onClose={closeExportDialog} />
    </Box>
  );
};

export default SettingsPanel;
