import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';

const CableDrawingPanel = () => {
  const { cableDrawingService } = useEditorContext();

  return (
    <div className="card w-[37rem] rounded-none bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Add</h2>
        <div className="flex flex-wrap gap-2">
          <Avatar placeholder="Finish" onClick={() => cableDrawingService.finish()} />
          <Avatar placeholder="Cancel" onClick={() => cableDrawingService.cancel()} />
        </div>
      </div>
    </div>
  );
};

export default CableDrawingPanel;
