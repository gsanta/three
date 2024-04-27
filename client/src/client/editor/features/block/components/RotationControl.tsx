import RadioSwitchButton from '@/client/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/client/common/components/RadioSwitchGroup';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Axis from '@/client/editor/types/Axis';
import BlockSettings from '@/client/editor/types/BlockSettings';

type RotationControlProps = {
  axis: Axis;
  block: BlockSettings;
  onChange(val: number): void;
  value: number;
};

const RotationControl = ({ axis, block, onChange, value }: RotationControlProps) => {
  return (
    block.rotation[axis] && (
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Rotation (y)
        </FormLabel>
        <RadioSwitchGroup
          name={`rotation-${axis}-selector`}
          onChange={(val) => onChange(Number(val))}
          value={String(value)}
        >
          {block.rotation[axis].map((rotation) => (
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
