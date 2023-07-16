import Box from '@/components/box/Box';
import Icon from '@/components/icon/Icon';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useState } from 'react';
import ExportDialog from './io/ExportDialog';
import ImportDialog from './io/import/ImportDialog';
import { useAppDispatch } from '@/hooks';
import { flipHorizontal } from '@/features/settings/state/settingsSlice';
import { useBoolean } from 'usehooks-ts';
import ResizeCanvasDialog from './edit/ResizeCanvasDialog';

const SettingsPanel = () => {
  const [isExportDialogOpen, setExportDialogOpen] = useState(false);
  const [isImportDialogOpen, setImportDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleFlipHorizontal = () => dispatch(flipHorizontal());

  const {
    value: isResizeCanvasDialogOpen,
    setFalse: closeResizeCanvasDialog,
    setTrue: openResizeCanvasDialog,
  } = useBoolean();

  return (
    <Box display="flex" gap="4">
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<Icon name="CiSettings" />} size="sm" variant="solid" />
        <MenuList>
          <MenuItem onClick={() => setImportDialogOpen(true)}>Import</MenuItem>
          <MenuItem onClick={() => setExportDialogOpen(true)}>Export</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton>Edit</MenuButton>
        <MenuList>
          <MenuItem onClick={handleFlipHorizontal}>Flip horizontal</MenuItem>
          <MenuItem onClick={openResizeCanvasDialog}>Resize canvas</MenuItem>
        </MenuList>
      </Menu>
      <ImportDialog isOpen={isImportDialogOpen} onClose={() => setImportDialogOpen(false)} />
      <ExportDialog isOpen={isExportDialogOpen} onClose={() => setExportDialogOpen(false)} />
      <ResizeCanvasDialog isOpen={isResizeCanvasDialogOpen} onClose={closeResizeCanvasDialog} />
    </Box>
  );
};

export default SettingsPanel;
