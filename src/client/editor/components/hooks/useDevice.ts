import { useAppSelector } from '@/client/common/hooks/hooks';
import { useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
import { AnimationMixer } from 'three';
import Block from '../../models/Block';

type UseDeviceProps = {
  block: Block;
  actions: ReturnType<typeof useAnimations>['actions'];
  mixer: AnimationMixer;
};

const useDevice = ({ block, actions, mixer }: UseDeviceProps) => {
  const device = useAppSelector((state) => state.block.present.decorations.devices[block.id]);
  const currentFlows = useAppSelector((state) => state.electricSystem.nodes[block.id]?.currentFlows);

  useEffect(() => {
    if (device?.isOn && currentFlows) {
      block.animations?.['device-on']?.forEach((animationName) => actions[animationName]?.play());
    } else {
      block.animations?.['device-on']?.forEach((animationName) => actions[animationName]?.stop());
    }

    return () => {
      block.animations?.['device-on']?.forEach((animationName) => actions[animationName]?.play());
    };
  }, [actions, block.animations, currentFlows, device?.isOn, mixer]);

  return;
};

export default useDevice;
