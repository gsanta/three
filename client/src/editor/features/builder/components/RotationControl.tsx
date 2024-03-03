import RadioSwitchButton from '@/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/common/components/RadioSwitchGroup';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Block from '../types/Block';

type RotationControlProps = {
  block: Block;
  onChange(direction: 'x' | 'y' | 'z', val: number): void;
};

const RotationControl = ({ block, onChange }: RotationControlProps) => {
  return (
    block.options?.rotation?.y && (
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
          Rotation (y)
        </FormLabel>
        <RadioSwitchGroup
          defaultValue={String(block.options.rotation.y[0])}
          name="rotation-y-selector"
          onChange={(val) => onChange('y', Number(val))}
        >
          {block.options.rotation.y.map((rotation) => (
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
