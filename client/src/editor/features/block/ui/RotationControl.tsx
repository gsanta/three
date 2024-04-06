import RadioSwitchButton from '@/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/common/components/RadioSwitchGroup';
import { FormControl, FormLabel } from '@chakra-ui/react';
import BlockData from '../../../types/BlockData';
import Axis from '@/editor/types/Axis';

type RotationControlProps = {
  axis: Axis;
  block: BlockData;
  onChange(val: number): void;
  value: number;
};

const RotationControl = ({ axis, block, onChange, value }: RotationControlProps) => {
  return (
    block.options.rotation[axis] && (
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Rotation (y)
        </FormLabel>
        <RadioSwitchGroup
          name={`rotation-${axis}-selector`}
          onChange={(val) => onChange(Number(val))}
          value={String(value)}
        >
          {block.options.rotation[axis].map((rotation) => (
            <RadioSwitchButton key={rotation} value={String(rotation)}>
              {String(rotation)}
            </RadioSwitchButton>
          ))}
        </RadioSwitchGroup>
      </FormControl>
    )
  );
};

export default RotationControl;
