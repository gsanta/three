import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import RadioSwitchButton from '../../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../../common/components/RadioSwitchGroup';
import { TransformType, setSelectedTransformType } from '../../builder/builderSlice';
import useEditorContext from '@/app/editor/EditorContext';
import useSelectedMesh from '@/editor/features/builder/useSelectedMesh';
import NumberInput from '@/common/components/NumberInput';

const SelectOptions = () => {
  const { selectedTransformType } = useAppSelector((state) => state.builder);
  const selectedMesh = useSelectedMesh();
  const { tool } = useEditorContext();

  const dispatch = useAppDispatch();

  const handleTransformChange = (val: string) => {
    dispatch(setSelectedTransformType(val as TransformType));
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>, axis: 'x' | 'y' | 'z') => {
    const value = e.target.value;
    if (isNaN(parseFloat(value)) || !selectedMesh) {
      return;
    }

    const scale = [...selectedMesh.scale] as [number, number, number];
    const valueNum = parseFloat(value);

    if (axis === 'x') {
      scale[0] = valueNum;
    } else if (axis === 'y') {
      scale[1] = valueNum;
    } else {
      scale[2] = valueNum;
    }

    tool.getSelectTool().scaleMesh(scale, selectedMesh);
  };

  return (
    <Box padding="4" display="flex" flexDir="column" gap="4">
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Geometry type
        </FormLabel>
        <RadioSwitchGroup
          defaultValue={selectedTransformType}
          name="geometry-selector"
          onChange={handleTransformChange}
        >
          <RadioSwitchButton key="move" value="move">
            Move
          </RadioSwitchButton>
          <RadioSwitchButton key="sacle" value="scale">
            Scale
          </RadioSwitchButton>
        </RadioSwitchGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Scale</FormLabel>
        <Box display="flex" gap="0.5rem">
          {['x', 'y', 'z'].map((axis, index) => (
            <NumberInput
              width="5rem"
              value={selectedMesh?.scale[index]}
              onChange={(e) => handleScaleChange(e, axis as 'x' | 'y' | 'z')}
              type="number"
            />
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

export default SelectOptions;
