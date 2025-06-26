'use client';

import React from 'react';
import ExportDialog from './ExportDialog';
import ImportDialog from './import/ImportDialog';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import { redoAction, undoAction } from '@/client/editor/stores/block/blockActions';
import SaveDialog from './server/SaveDialog';
import useDialog from '../../hooks/useDialog';
import { useSession } from 'next-auth/react';
import LoadDialog from './server/LoadDialog';
import EditorDrawer from '../EditorDrawer';

const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const redoSize = useAppSelector((state) => state.blockCategory.redoSize);
  const undoSize = useAppSelector((state) => state.blockCategory.undoSize);

  const {
    isDialogOpen: isSaveDialogOpen,
    onDialogClose: onSaveDialogClose,
    onDialogOpen: onSaveDialogOpen,
  } = useDialog({ dialogId: 'save-dialog' });

  const {
    isDialogOpen: isLoadDialogOpen,
    onDialogClose: onLoadDialogClose,
    onDialogOpen: onLoadDialogOpen,
  } = useDialog({ dialogId: 'load-dialog' });

  const handleUndo = () => {
    dispatch(undoAction());
  };

  const handleRedo = () => {
    dispatch(redoAction());
  };

  const isLoggedIn = session?.user?.email;

  return (
    <div className="flex items-center gap-4">
      <EditorDrawer />

      {/* <div className="divider divider-horizontal" />
      <div className="flex gap-1">
        <div className="tooltip tooltip-bottom" data-tip={isLoggedIn ? 'Save' : 'Login to save'}>
          <button
            className={`btn btn-square btn-secondary  ${!isLoggedIn ? 'btn-disabled' : ''}`}
            onClick={onSaveDialogOpen}
          >
            <Icon name="BiCloudUpload" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip={isLoggedIn ? 'Load' : 'Login to load'}>
          <button
            className={`btn btn-square btn-secondary ${!isLoggedIn ? 'btn-disabled' : ''}`}
            onClick={onLoadDialogOpen}
          >
            <Icon name="BiCloudDownload" />
          </button>
        </div>
      </div> */}

      <ImportDialog />
      <ExportDialog />
      <SaveDialog isOpen={isSaveDialogOpen} onClose={onSaveDialogClose} />
      <LoadDialog isOpen={isLoadDialogOpen} onClose={onLoadDialogClose} />
    </div>
  );
};

export default SettingsPanel;
