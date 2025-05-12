import React from 'react';
import ExportDialog from './ExportDialog';
import ImportDialog from './import/ImportDialog';
import { useAppDispatch } from '@/client/common/hooks/hooks';
import { ActionCreators } from 'redux-undo';
import useSaveSnapshot from '../../hooks/useSaveSnapshot';
import useLoadSnapshot from '../../hooks/useLoadSnapshot';
import Icon from '@/client/common/components/lib/Icon';
import Toast from '@/client/common/components/lib/Toast';

const SettingsPanel = () => {
  const dispatch = useAppDispatch();

  const { mutate: saveSnapshot, toastRef } = useSaveSnapshot();
  const { refetchSnapshot } = useLoadSnapshot();

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

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
      </div>
      <div className="divider divider-horizontal" />
      <div className="flex gap-1">
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
      </div>
      <div className="divider divider-horizontal" />
      <div className="flex gap-1">
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
      </div>
      <ImportDialog />
      <ExportDialog />
      <Toast ref={toastRef} />
    </div>
  );
};

export default SettingsPanel;
