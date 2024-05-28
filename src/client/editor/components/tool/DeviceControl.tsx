import RadioSwitchButton from '@/client/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/client/common/components/RadioSwitchGroup';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Device from '../../types/block/Device';
import useEditorContext from '@/app/editor/EditorContext';

type SizeControlProps = {
  device: Device;
};

const DeviceControl = ({ device }: SizeControlProps) => {
  const { transaction } = useEditorContext();

  const handleChange = (change: 'on' | 'off') => {
    transaction
      .getUpdate()
      .updateDecoration(device.category, device.id, { isOn: change === 'on' })
      .commit();
  };

  return (
    <FormControl>
      <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
        Device
      </FormLabel>
      <RadioSwitchGroup name="device-on-selector" onChange={handleChange} value={device.isOn ? 'on' : 'off'}>
        <RadioSwitchButton key="on" value="on">
          On
        </RadioSwitchButton>
        <RadioSwitchButton key="off" value="off">
          Off
        </RadioSwitchButton>
      </RadioSwitchGroup>
    </FormControl>
  );
};

export default DeviceControl;
