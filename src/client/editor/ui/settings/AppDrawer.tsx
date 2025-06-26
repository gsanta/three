import Button from '@/client/common/components/lib/Button';
import Icon from '@/client/common/components/lib/Icon';
import useDialog from '../hooks/useDialog';
import SaveDialog from './io/server/SaveDialog';
import LoadDialog from './io/server/LoadDialog';

const AppDrawer = () => {
  const handleExport = () => {
    const dialog = document.getElementById('export-dialog') as HTMLDialogElement;
    dialog.showModal();
  };

  const handleImport = () => {
    const dialog = document.getElementById('import-dialog') as HTMLDialogElement;
    dialog.showModal();
  };

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
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-square btn-neutral btn-ghost drawer-button">
          <Icon name="BiMenu" />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
          {/* Sidebar content here */}
          <li>
            <Button colorScheme="neutral" onClick={handleImport}>
              Import
            </Button>
          </li>
          <li>
            <Button colorScheme="neutral" onClick={handleExport}>
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
      <SaveDialog isOpen={isSaveDialogOpen} onClose={onSaveDialogClose} />
      <LoadDialog isOpen={isLoadDialogOpen} onClose={onLoadDialogClose} />
    </div>
  );
};

export default AppDrawer;
