import React, { useState } from 'react';
import FileType, { getFileTypes } from '../../../models/FileType';
import { downloadString } from '../../../utils/fileUtils';
import useEditorContext from '@/app/editor/useEditorContext';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';

const ExportDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>(FileType.json);

  const { serializer: exporter } = useEditorContext();

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
    <Dialog {...props} id="export-dialog" onSubmit={handleExport} submitLabel="Export" title="Export">
      <table className="table table-fixed">
        <tbody>
          <tr>
            <th className="w-[30%]">
              <label className="label" htmlFor="file-type-selector">
                <span className="label-text">Type</span>
              </label>
            </th>
            <td>
              <select className="select select-bordered" id="file-type-selector" onChange={handleFileTypeChange}>
                {getFileTypes().map((fileType) => (
                  <option key={fileType} value={fileType} selected={fileType === selectedFileType}>
                    {fileType}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </Dialog>
  );
};

export default ExportDialog;
