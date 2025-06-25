'use client';

import React from 'react';
import ExportDialog from './ExportDialog';
import ImportDialog from './import/ImportDialog';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import useLoadSnapshot from '../../hooks/useLoadSnapshot';
import Icon from '@/client/common/components/lib/Icon';
import { redoAction, undoAction } from '@/client/editor/stores/block/blockActions';
import SaveDialog from './server/SaveDialog';
import useDialog from '../../hooks/useDialog';
import { useSession } from 'next-auth/react';

const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const { refetchSnapshot } = useLoadSnapshot();

  const redoSize = useAppSelector((state) => state.blockCategory.redoSize);
  const undoSize = useAppSelector((state) => state.blockCategory.undoSize);

  const {
    isDialogOpen: isSaveDialogOpen,
    onDialogClose: onSaveDialogClose,
    onDialogOpen: onSaveDialogOpen,
  } = useDialog({ dialogId: 'save-dialog' });

  const handleUndo = () => {
    dispatch(undoAction());
  };

  const handleRedo = () => {
    dispatch(redoAction());
  };

  const isLoggedIn = session?.user?.email;

  return (
    <div className="flex items-center gap-4">
      <button
        className="btn btn-primary btn-square"
        popoverTarget="popover-settings"
        style={{ anchorName: '--anchor-settings' } as React.CSSProperties}
      >
        <Icon name="CiSettings" />
      </button>

      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id="popover-settings"
        style={{ positionAnchor: '--anchor-settings' } as React.CSSProperties}
      >
        <li>
          <button
            onClick={() => {
              const dialog = document.getElementById('import-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Import
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              const dialog = document.getElementById('export-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Export
          </button>
        </li>
      </ul>

      <div className="divider divider-horizontal" />
      <div className="flex gap-1">
        <div className="tooltip tooltip-bottom" data-tip={isLoggedIn ? 'Save' : 'Login to save'}>
          <button
            className={`btn btn-square btn-secondary  ${!isLoggedIn ? 'btn-disabled' : ''}`}
            onClick={onSaveDialogOpen}
          >
            <Icon name="BiCloudUpload" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Download from server">
          <button className="btn btn-square btn-secondary" onClick={() => refetchSnapshot({})}>
            <Icon name="BiCloudDownload" />
          </button>
        </div>
      </div>
      <div className="divider divider-horizontal" />
      <div className="flex gap-1">
        <div className="tooltip tooltip-bottom" data-tip="Undo">
          <button
            className={`btn btn-square btn-secondary ${undoSize === 0 ? 'btn-disabled' : ''}`}
            onClick={handleUndo}
          >
            <Icon name="BiUndo" />
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Redo">
          <button
            className={`btn btn-square btn-secondary ${redoSize === 0 ? 'btn-disabled' : ''}`}
            onClick={handleRedo}
          >
            <Icon name="BiRedo" />
          </button>
        </div>
      </div>

      <ImportDialog />
      <ExportDialog />
      <SaveDialog isOpen={isSaveDialogOpen} onClose={onSaveDialogClose} />
    </div>
  );
};

export default SettingsPanel;
