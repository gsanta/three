import Box from '@/ui/components/box/Box';
import Icon from '@/ui/components/icon/Icon';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useState } from 'react';
import ExportDialog from './io/ExportDialog';
import ImportDialog from './io/import/ImportDialog';

const SettingsPanel = () => {
  const [isExportDialogOpen, setExportDialogOpen] = useState(false);
  const [isImportDialogOpen, setImportDialogOpen] = useState(false);

  return (
    <Box>
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<Icon name="CiSettings" />} size="sm" variant="solid" />
        <MenuList>
          <MenuItem onClick={() => setImportDialogOpen(true)}>Import</MenuItem>
          <MenuItem onClick={() => setExportDialogOpen(true)}>Export</MenuItem>
        </MenuList>
      </Menu>
      <ImportDialog isOpen={isImportDialogOpen} onClose={() => setImportDialogOpen(false)} />
      <ExportDialog isOpen={isExportDialogOpen} onClose={() => setExportDialogOpen(false)} />
    </Box>
  );
};

export default SettingsPanel;
