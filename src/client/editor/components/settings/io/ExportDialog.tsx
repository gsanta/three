import React, { useState } from 'react';
import FileType, { getFileTypes } from '../../../models/FileType';
import { downloadString } from '../../../utils/fileUtils';
import useEditorContext from '@/app/editor/EditorContext';

const ExportDialog = () => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>(FileType.json);

  const { exporter } = useEditorContext();

  const closeDialog = () => {
    const dialog = document.getElementById('export-dialog') as HTMLDialogElement;
    dialog.close();
  };

  const exportDocument = () => {
    downloadString(JSON.stringify(exporter.export()), 'data.json');

    closeDialog();
  };

  const handleExport = () => {
    switch (selectedFileType) {
      case FileType.json:
      default:
        exportDocument();
        break;
    }
  };

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFileType(e.target.value as FileType);
  };

  return (
    <dialog id="export-dialog" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Export</h3>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select className="select select-bordered" onChange={handleFileTypeChange}>
            {getFileTypes().map((fileType) => (
              <option key={fileType} value={fileType} selected={fileType === selectedFileType}>
                {fileType}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button className="btn btn-sm" onClick={closeDialog}>
            Close
          </button>
          <button className="btn btn-sm btn-warning" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ExportDialog;
