import Button from '@/client/common/components/lib/Button';
import Icon from '@/client/common/components/lib/Icon';
import useDialog from '../hooks/useDialog';
import SaveDialog from './io/server/SaveDialog';
import LoadDialog from './io/server/LoadDialog';
import ImportDialog from './io/import/ImportDialog';
import ExportDialog from './io/ExportDialog';

const EditorDrawer = () => {
  const {
    isDialogOpen: isImportDialogOpen,
    onDialogClose: onImportDialogClose,
    onDialogOpen: onImportDialogOpen,
  } = useDialog({ dialogId: 'import-dialog' });

  const {
    isDialogOpen: isExportDialogOpen,
    onDialogClose: onExportDialogClose,
    onDialogOpen: onExportDialogOpen,
  } = useDialog({ dialogId: 'export-dialog' });

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

  return (
    <div className="drawer">
      <input id="editor-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="editor-drawer" className="btn btn-square btn-neutral btn-ghost drawer-button">
          <Icon name="BiMenu" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="editor-drawer" aria-label="close sidebar" className="drawer-overlay" />

        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ">
          <ul className="flex flex-col gap-2">
            <li>
              <Button colorScheme="neutral" onClick={onImportDialogOpen}>
                Import
              </Button>
            </li>
            <li>
              <Button colorScheme="neutral" onClick={onExportDialogOpen}>
                Export
              </Button>
            </li>
            <li>
              <Button colorScheme="neutral" onClick={onSaveDialogOpen}>
                Save
              </Button>
            </li>
            <li>
              <Button colorScheme="neutral" onClick={onLoadDialogOpen}>
                Load
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <SaveDialog isOpen={isSaveDialogOpen} onClose={onSaveDialogClose} />
      <LoadDialog isOpen={isLoadDialogOpen} onClose={onLoadDialogClose} />
      <ImportDialog isOpen={isImportDialogOpen} onClose={onImportDialogClose} />
      <ExportDialog isOpen={isExportDialogOpen} onClose={onExportDialogClose} />
    </div>
  );
};

export default EditorDrawer;
