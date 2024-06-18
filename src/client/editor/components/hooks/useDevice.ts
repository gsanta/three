import { useAppSelector } from '@/client/common/hooks/hooks';
import { useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
import { AnimationMixer } from 'three';
import Block from '../../types/Block';

type UseDeviceProps = {
  block: Block;
  actions: ReturnType<typeof useAnimations>['actions'];
  mixer: AnimationMixer;
};

const useDevice = ({ block, actions, mixer }: UseDeviceProps) => {
  const device = useAppSelector((state) => state.block.present.decorations.devices[block.id]);

  useEffect(() => {
    console.log('block', block.animations);
    if (device.isOn) {
      block.animations?.['device-on'].forEach((animationName) => actions[animationName]?.play());
    } else {
      block.animations?.['device-on'].forEach((animationName) => actions[animationName]?.stop());
    }

    return () => {
      block.animations?.['device-on'].forEach((animationName) => actions[animationName]?.play());
    };
  }, [actions, block.animations, device.isOn, mixer]);

  return;
};

export default useDevice;
