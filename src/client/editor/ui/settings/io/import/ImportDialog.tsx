import { useState } from 'react';
import DropZone from './DropZone';
import useEditorContext from '@/app/editor/useEditorContext';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';

const ImportDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const [fileName, setFileName] = useState<string>();
  const [fileContent, setFileContent] = useState<string>('[]');

  const { serializer } = useEditorContext();

  const handleSetFile = (name: string, content: string) => {
    setFileName(name);
    setFileContent(content);
  };

  const handleImport = () => {
    serializer.import(JSON.parse(fileContent));
    props.onClose?.();
  };

  return (
    <Dialog {...props} id="import-dialog" onSubmit={handleImport} submitLabel="Import" title="Import">
      <div className="mt-4">
        <DropZone fileName={fileName} setFile={handleSetFile} />
      </div>
    </Dialog>
  );
};

export default ImportDialog;
