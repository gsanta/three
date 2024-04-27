import useEditorContext from '@/app/editor/EditorContext';
import { Button } from '@chakra-ui/react';

const CableToolOptions = () => {
  const { tool } = useEditorContext();

  return <Button onClick={() => tool.getCableTool().joinPoles()}>Join poles</Button>;
};

export default CableToolOptions;
