import Num3 from '@/client/editor/types/Num3';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { RefObject, useEffect, useRef } from 'react';
import { Mesh, BufferGeometry, Group, Object3DEventMap } from 'three';
import { useWheels } from '../../hooks/useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from '../../hooks/useControls';

const Car = () => {
  const car = useGLTF('car.glb').scene;

  useEffect(() => {
    car.scale.set(0.0012, 0.0012, 0.0012);
    car.children[0].position.set(-365, -18, -67);
  }, [car]);

  const position = [-1.5, 0.5, 3] as Num3;
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2] as Num3;
  const [chassisBody, chassisApi] = useBox<Mesh<BufferGeometry>>(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null),
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null),
  );

  useControls(vehicleApi, chassisApi);

  return (
    <group ref={vehicle as RefObject<Group<Object3DEventMap>>} name="vehicle">
      <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh>

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
