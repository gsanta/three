import { Box } from '@chakra-ui/react';
import useEditorContext from '@/app/editor/EditorContext';
import useBlock from '../hooks/useBlock';
import RotationControl from './RotationControl';
import { MeshInfo } from '../../scene/sceneSlice';
import SizeControl from './SizeControl';

type SelectToolOptionsContentProps = {
  selectedMesh: MeshInfo;
};

const SelectToolOptionsContent = ({ selectedMesh }: SelectToolOptionsContentProps) => {
  const { tool } = useEditorContext();

  const selectedBlock = useBlock(selectedMesh?.type);

  const handleRotationChange = (direction: 'x' | 'y' | 'z', val: number) => {
    if (selectedMesh) {
      tool.getSelectTool().rotateMesh(direction, val, selectedMesh);
    }
  };

  const handleSizeChange = (scale: number) => {
    tool.getSelectTool().scaleMesh(scale, selectedMesh);
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <SizeControl block={selectedBlock} onChange={handleSizeChange} />
      {selectedBlock && <RotationControl block={selectedBlock} onChange={handleRotationChange} />}
    </Box>
  );
};

export default SelectToolOptionsContent;
