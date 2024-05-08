import RadioSwitchButton from '@/client/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/client/common/components/RadioSwitchGroup';
import { FormControl, FormLabel } from '@chakra-ui/react';
import BlockSettings from '@/client/editor/types/BlockSettings';
import Axis from '@/client/editor/types/Axis';

type SizeControlProps = {
  axis: Axis;
  block: BlockSettings;
  onChange(size: number): void;
  value: number;
};

const SizeControl = ({ axis, block, onChange, value }: SizeControlProps) => {
  const sizes = block.scale[axis];

  return (
    <FormControl>
      <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
        Size ({axis})
      </FormLabel>
      <RadioSwitchGroup name="size-selector" onChange={(val: string) => onChange(Number(val))} value={String(value)}>
        {sizes.map((size) => (
          <RadioSwitchButton key={size} value={String(size)}>
            {String(size)}
          </RadioSwitchButton>
        ))}
      </RadioSwitchGroup>
    </FormControl>
  );
};

export default SizeControl;
