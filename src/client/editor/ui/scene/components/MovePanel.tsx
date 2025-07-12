import React from 'react';
import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';

const MovePanel = () => {
  const { tool } = useEditorContext();

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-1 flex-row justify-center gap-2">
        <Avatar onClick={() => tool.getMoveTool().execute()} placeholder="Move" />
        <Avatar onClick={() => {}} placeholder="Build" />
      </div>
    </div>
  );
};

export default MovePanel;
