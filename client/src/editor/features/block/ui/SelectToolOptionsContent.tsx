import { Box, Button } from '@chakra-ui/react';
import useEditorContext from '@/app/editor/EditorContext';
import useBlock from './hooks/useBlock';
import RotationControl from './RotationControl';
import SizeControl from './SizeControl';
import { findNearestValue, toDegree } from '@/editor/utils/mathUtils';
import MeshData from '@/editor/types/MeshData';

type SelectToolOptionsContentProps = {
  selectedMesh: MeshData;
};

const SelectToolOptionsContent = ({ selectedMesh }: SelectToolOptionsContentProps) => {
  const { tool } = useEditorContext();

  const selectedBlock = useBlock(selectedMesh?.name);

  const handleRotationChange = (direction: 'x' | 'y' | 'z', val: number) => {
    if (selectedMesh) {
      tool.getSelectTool().rotateMesh(direction, val, tool.getToolInfo());
    }
  };

  const handleSizeChange = (scale: number) => {
    tool.getSelectTool().scaleMesh(scale, selectedMesh);
  };

  const scaleX = findNearestValue(
    selectedBlock.options.size.scales,
    selectedMesh.scale[0] / selectedBlock.data.scale[0],
  );

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <SizeControl block={selectedBlock} onChange={handleSizeChange} value={scaleX} />
      {selectedBlock && (
        <RotationControl
          axis="y"
          block={selectedBlock}
          onChange={(val) => handleRotationChange('y', val)}
          value={toDegree(selectedMesh.rotation[1])}
        />
      )}
      <Button onClick={() => tool.getJoinTool().execute()}>join</Button>
    </Box>
  );
};

export default SelectToolOptionsContent;
