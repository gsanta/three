import ExternalTool from '@/services/tool/ExternalTool';
import ToolName from '@/services/tool/ToolName';
import useAppContext from '@/ui/context/useAppContext';
import { useEffect, useState } from 'react';

const useInitExternalModule = (onInitialized: () => void) => {
  const [isModuleInitialized, setIsModuleInitialized] = useState(false);

  const { toolStore } = useAppContext();

  useEffect(() => {
    if (window?.Module?.isRuntimeInitialize && !isModuleInitialized) {
      setIsModuleInitialized(true);
      onInitialized();

      toolStore.addTool(new ExternalTool(ToolName.Brush, 'BiPencil', Module));
      toolStore.addTool(new ExternalTool(ToolName.Rectangle, 'BiRectangle', Module));
      toolStore.addTool(new ExternalTool(ToolName.SelectionRectangle, 'BiBorderRadius', Module));
      toolStore.addTool(new ExternalTool(ToolName.Erase, 'BiEraser', Module));
    }
  }, [isModuleInitialized, onInitialized, toolStore]);

  return {
    isModuleInitialized,
  };
};

export default useInitExternalModule;
