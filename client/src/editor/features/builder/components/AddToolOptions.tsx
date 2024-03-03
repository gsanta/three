import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import RadioSwitchButton from '../../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../../common/components/RadioSwitchGroup';
import { setBlockRotation, setBlockSize, setSelectedGeometry } from '../builderSlice';
import { BlockType } from '../types/Block';
import useBlock from '../hooks/useBlock';
import RotationControl from './RotationControl';
import useEditorContext from '@/app/editor/EditorContext';
import SizeControl from './SizeControl';

const AddToolOptions = () => {
  const { blocks } = useAppSelector((state) => state.builder);
  const selectedBlockName = useAppSelector((state) => state.builder.selectedBlockName);
  const selectedBlock = useBlock(selectedBlockName);
  const { tool } = useEditorContext();

  const dispatch = useAppDispatch();

  const handleGeometryChange = (val: string) => {
    dispatch(setSelectedGeometry(val as BlockType));
  };

  const handleSizeChange = (size: number) => {
    dispatch(setBlockSize({ size, blockName: selectedBlock.name }));
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', rotation: number) => {
    dispatch(setBlockRotation({ axis, blockName: selectedBlock.name, rotation }));
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Geometry type
        </FormLabel>
        <RadioSwitchGroup defaultValue={selectedBlockName} name="geometry-selector" onChange={handleGeometryChange}>
          {blocks.map((block) => (
            <RadioSwitchButton key={block.name} value={block.name}>
              {block.name}
            </RadioSwitchButton>
          ))}
        </RadioSwitchGroup>
      </FormControl>
      <SizeControl block={selectedBlock} onChange={handleSizeChange} />
      {selectedBlock && <RotationControl block={selectedBlock} onChange={handleRotationChange} />}
    </Box>
  );
};

export default AddToolOptions;
