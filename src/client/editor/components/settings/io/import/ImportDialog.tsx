import { useState } from 'react';
import DropZone from './DropZone';
import useEditorContext from '@/app/editor/useEditorContext';

const ImportDialog = () => {
  const [fileName, setFileName] = useState<string>();
  const [fileContent, setFileContent] = useState<string>('[]');

  const { importer } = useEditorContext();

  const closeDialog = () => {
    const dialog = document.getElementById('import-dialog') as HTMLDialogElement;
    dialog.close();
  };

  const handleSetFile = (name: string, content: string) => {
    setFileName(name);
    setFileContent(content);
  };

  const handleImport = () => {
    importer.import(fileContent);
    closeDialog();
  };

  return (
    <dialog id="import-dialog" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Import</h3>

        <div className="mt-4">
          <DropZone fileName={fileName} setFile={handleSetFile} />
        </div>

        <div className="modal-action">
          <button className="btn btn-sm" onClick={closeDialog}>
            Close
          </button>
          <button
            className="btn btn-sm btn-warning"
            onClick={handleImport}
            // disabled={fileName === undefined}
          >
            Import
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ImportDialog;
