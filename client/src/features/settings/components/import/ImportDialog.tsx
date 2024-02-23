import { useState } from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '../../../../common/components/Dialog';
import { Button } from '@chakra-ui/react';

const ImportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const [isImporting, setImporting] = useState(false);

  // const [fileName, setFileName] = useState<string>();

  // const handleSetFile = (name: string, content: string) => {
  //   setFileName(name);
  // };

  // useEffect(() => {
  //     dispatch(importDocument(fileContent, editor));
  //     setImporting(false);
  //     onClose();
  //   }
  // }, [isImporting, setImporting, dispatch, fileContent, onClose]);

  const handleImport = () => {
    setImporting(true);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Import">
      <DialogBody>{/* <DropZone fileName={fileName} setFile={handleSetFile} /> */}</DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          size="sm"
          colorScheme="orange"
          isLoading={isImporting}
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
