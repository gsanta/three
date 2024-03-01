import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import RadioSwitchButton from '../../../../common/components/RadioSwitchButton';
import RadioSwitchGroup from '../../../../common/components/RadioSwitchGroup';
import { TransformType, setSelectedTransformType } from '../../builder/builderSlice';
import useEditorContext from '@/app/editor/EditorContext';
import useSelectedMesh from '@/editor/features/builder/useSelectedMesh';
import NumberInput from '@/common/components/NumberInput';
import useBlock from '../../builder/hooks/useSelectedBlock';

const SelectOptions = () => {
  const { selectedTransformType } = useAppSelector((state) => state.builder);
  const selectedMesh = useSelectedMesh();
  const { tool } = useEditorContext();

  const selectedBlock = useBlock(selectedMesh?.type);

  const handleRotationChange = (direction: 'x' | 'y' | 'z', val: string) => {
    if (selectedMesh) {
      tool.getSelectTool().rotateMesh(direction, Number(val), selectedMesh);
    }
  };

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
      {selectedBlock?.options?.rotation?.y && (
        <FormControl>
          <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
            Rotation (y)
          </FormLabel>
          <RadioSwitchGroup
            defaultValue={String(selectedBlock.options.rotation.y[0])}
            name="rotation-y-selector"
            onChange={(val) => handleRotationChange('y', val)}
          >
            {selectedBlock.options.rotation.y.map((rotation) => (
              <RadioSwitchButton key={rotation} value={String(rotation)}>
                {String(rotation)}
              </RadioSwitchButton>
            ))}
          </RadioSwitchGroup>
        </FormControl>
      )}
    </Box>
  );
};

export default SelectOptions;
