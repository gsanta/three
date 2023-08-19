import Icon from '@/components/icon/Icon';
import { Box, Button, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import ExportDialog from './ExportDialog';
import ImportDialog from './import/ImportDialog';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { flipHorizontal } from '@/features/settings/state/settingsSlice';
import { useBoolean } from 'usehooks-ts';
import ResizeCanvasDialog from './ResizeCanvasDialog';
import useSaveDrawing from '../hooks/useSaveDrawing';
import LoadDrawingDialog from './LoadDrawingDialog';

const SettingsPanel = () => {
  const [isExportDialogOpen, setExportDialogOpen] = useState(false);
  const { value: isImportDialogOpen, setTrue: openImportDialog, setFalse: closeImportDialog } = useBoolean(false);
  const {
    value: isLoadDrawingDialogOpen,
    setTrue: openLoadDrawingDialog,
    setFalse: cloaseLoadDrawingDialog,
  } = useBoolean(false);

  const dispatch = useAppDispatch();

  const handleFlipHorizontal = () => dispatch(flipHorizontal());

  const { save, isLoading: isSaveLoading } = useSaveDrawing();

  const { editor } = useAppSelector((state) => state.editor);

  const {
    value: isResizeCanvasDialogOpen,
    setFalse: closeResizeCanvasDialog,
    setTrue: openResizeCanvasDialog,
  } = useBoolean();

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
      <Menu>
        <MenuButton as={Button} size="sm" variant="ghost">
          Edit
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleFlipHorizontal}>Flip horizontal</MenuItem>
          <MenuItem onClick={openResizeCanvasDialog}>Resize canvas</MenuItem>
        </MenuList>
      </Menu>
      <ButtonGroup>
        <Tooltip label="Save to server">
          <Button variant="outline" size="sm" isLoading={isSaveLoading} onClick={save}>
            <Icon name="BiCloudUpload" />
          </Button>
        </Tooltip>
        <Tooltip label="Download from server">
          <Button variant="outline" size="sm" isLoading={isSaveLoading} onClick={openLoadDrawingDialog}>
            <Icon name="BiCloudDownload" />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip label="Undo">
          <Button variant="outline" size="sm" onClick={() => editor.undo()}>
            <Icon name="BiUndo" />
          </Button>
        </Tooltip>
        <Tooltip label="Redo">
          <Button variant="outline" size="sm" onClick={() => editor.redo()}>
            <Icon name="BiRedo" />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Tooltip label="Zoom in">
          <Button variant="outline" size="sm" onClick={() => editor.zoomIn()}>
            <Icon name="BiZoomIn" />
          </Button>
        </Tooltip>
        <Tooltip label="Reset zoom">
          <Button variant="outline" size="sm" onClick={() => editor.resetZoom()}>
            Reset
          </Button>
        </Tooltip>
        <Tooltip label="Zoom out">
          <Button variant="outline" size="sm" onClick={() => editor.zoomOut()}>
            <Icon name="BiZoomOut" />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <ImportDialog isOpen={isImportDialogOpen} onClose={closeImportDialog} />
      <ExportDialog isOpen={isExportDialogOpen} onClose={() => setExportDialogOpen(false)} />
      <LoadDrawingDialog isOpen={isLoadDrawingDialogOpen} onClose={cloaseLoadDrawingDialog} />
      <ResizeCanvasDialog isOpen={isResizeCanvasDialogOpen} onClose={closeResizeCanvasDialog} />
    </Box>
  );
};

export default SettingsPanel;
