import { useState } from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '../../../../../common/components/Dialog';
import { Button } from '@chakra-ui/react';
import DropZone from './DropZone';
import { useAppDispatch } from '@/common/hooks/hooks';
import { setMeshes } from '@/editor/features/scene/sceneSlice';

const ImportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const [fileName, setFileName] = useState<string>();
  const [fileContent, setFileContent] = useState<string>('[]');

  const dispatch = useAppDispatch();

  const handleSetFile = (name: string, content: string) => {
    setFileName(name);
    setFileContent(content);
  };

  // useEffect(() => {
  //     dispatch(importDocument(fileContent, editor));
  //     setImporting(false);
  //     onClose();
  //   }
  // }, [isImporting, setImporting, dispatch, fileContent, onClose]);

  const handleImport = () => {
    const meshes = JSON.parse(fileContent);
    dispatch(setMeshes(meshes));
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Import">
      <DialogBody>
        <DropZone fileName={fileName} setFile={handleSetFile} />
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          size="sm"
          colorScheme="orange"
          // disabled={fileName === undefined}
          onClick={handleImport}
        >
          Import
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImportDialog;
