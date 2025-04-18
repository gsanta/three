import Icon from '../../../../common/components/icon/Icon';
import { Box, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useState } from 'react';
import ExportDialog from './ExportDialog';
import ImportDialog from './import/ImportDialog';
import { useBoolean } from 'usehooks-ts';
import { useAppDispatch } from '@/client/common/hooks/hooks';
import { ActionCreators } from 'redux-undo';
import useSaveSnapshot from '../../hooks/useSaveSnapshot';
import useLoadSnapshot from '../../hooks/useLoadSnapshot';

const SettingsPanel = () => {
  const [isExportDialogOpen, setExportDialogOpen] = useState(false);
  const { value: isImportDialogOpen, setTrue: openImportDialog, setFalse: closeImportDialog } = useBoolean(false);

  const dispatch = useAppDispatch();

  const { mutate: saveSnapshot } = useSaveSnapshot();
  const { refetchSnapshot } = useLoadSnapshot();

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <Box alignItems="center" display="flex" gap="4">
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
      <div className="divider divider-horizontal" />
      <ButtonGroup>
        <div className="tooltip tooltip-bottom" data-tip="Save to server">
          <button className="btn btn-square btn-secondary" onClick={() => saveSnapshot({})}>
            <Icon name="BiCloudUpload" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Download from server">
          <button className="btn btn-square btn-secondary" onClick={() => refetchSnapshot({})}>
            <Icon name="BiCloudDownload" />
          </button>
        </div>
      </ButtonGroup>
      <div className="divider divider-horizontal" />
      <ButtonGroup>
        <div className="tooltip tooltip-bottom" data-tip="Undo">
          <button className="btn btn-square btn-secondary" onClick={handleUndo}>
            <Icon name="BiUndo" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Redo">
          <button className="btn btn-square btn-secondary" onClick={handleRedo}>
            <Icon name="BiRedo" />
          </button>
        </div>
      </ButtonGroup>
      <div className="divider divider-horizontal" />
      <ButtonGroup>
        <div className="tooltip tooltip-bottom" data-tip="Zoom in">
          <button className="btn btn-square btn-secondary">
            <Icon name="BiZoomIn" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Reset zoom to 1">
          <button className="btn btn-secondary">Reset</button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Fit drawing to viewport">
          <button className="btn btn-secondary">Fit</button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Zoom out">
          <button className="btn btn-square btn-secondary">
            <Icon name="BiZoomOut" />
          </button>
        </div>
      </ButtonGroup>
      <ImportDialog isOpen={isImportDialogOpen} onClose={closeImportDialog} />
      <ExportDialog isOpen={isExportDialogOpen} onClose={() => setExportDialogOpen(false)} />
    </Box>
  );
};

export default SettingsPanel;
