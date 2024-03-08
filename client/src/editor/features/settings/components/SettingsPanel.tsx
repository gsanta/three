import Icon from '../../../../common/components/icon/Icon';
import { Box, Button, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import ExportDialog from './ExportDialog';
import ImportDialog from './import/ImportDialog';
import { useBoolean } from 'usehooks-ts';
import { useAppDispatch } from '@/common/hooks/hooks';
import { ActionCreators } from 'redux-undo';

const SettingsPanel = () => {
  const [isExportDialogOpen, setExportDialogOpen] = useState(false);
  const { value: isImportDialogOpen, setTrue: openImportDialog, setFalse: closeImportDialog } = useBoolean(false);

  const dispatch = useAppDispatch();

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <Box display="flex" gap="4">
      <Menu>
        <MenuButton
          paddingInline="4"
          as={IconButton}
          aria-label="Options"
          icon={<Icon name="CiSettings" />}
          size="sm"
          variant="ghost"
        />
        <MenuList>
          <MenuItem onClick={openImportDialog}>Import</MenuItem>
          <MenuItem onClick={() => setExportDialogOpen(true)}>Export</MenuItem>
        </MenuList>
      </Menu>
      <ButtonGroup>
        <Tooltip label="Save to server">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Icon name="BiCloudUpload" />
          </Button>
        </Tooltip>
        <Tooltip label="Download from server">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Icon name="BiCloudDownload" />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip label="Undo">
          <Button variant="outline" size="sm" onClick={handleUndo}>
            <Icon name="BiUndo" />
          </Button>
        </Tooltip>
        <Tooltip label="Redo">
          <Button variant="outline" size="sm" onClick={handleRedo}>
            <Icon name="BiRedo" />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip label="Zoom in">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Icon name="BiZoomIn" />
          </Button>
        </Tooltip>
        <Tooltip label="Reset zoom to 1">
          <Button variant="outline" size="sm" onClick={() => {}}>
            Reset
          </Button>
        </Tooltip>
        <Tooltip label="Fit drawing to viewport">
          <Button variant="outline" size="sm" onClick={() => {}}>
            Fit
          </Button>
        </Tooltip>
        <Tooltip label="Zoom out">
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Icon name="BiZoomOut" />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ImportDialog isOpen={isImportDialogOpen} onClose={closeImportDialog} />
      <ExportDialog isOpen={isExportDialogOpen} onClose={() => setExportDialogOpen(false)} />
    </Box>
  );
};

export default SettingsPanel;
