import Num3 from '@/client/editor/models/math/Num3';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { RefObject, useEffect, useRef } from 'react';
import { Mesh, BufferGeometry, Group, Object3DEventMap, Vector3 } from 'three';
import { useWheels } from '../../hooks/useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from '../../hooks/useControls';
import { useFrame } from '@react-three/fiber';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import { setCarGridPos } from '@/client/editor/stores/grid/gridSlice';

const Car = () => {
  const car = useGLTF('car.glb').scene;
  const groundRadius = useAppSelector((state) => state.grid.groundRadius);
  const gridOffset = useAppSelector((state) => state.grid.gridOffset);
  const gridSize = useAppSelector((state) => state.grid.gridSize);
  const carGridPos = useAppSelector((state) => state.grid.carGridPos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    car.scale.set(0.012, 0.012, 0.012);
    car.children[0].position.set(-365, -18, -67);
  }, [car]);

  const position = [-1.5, 0.5, 3] as Num3;
  const width = 1.5;
  const height = 0.7;
  const front = 1.5;
  const wheelRadius = 0.5;

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

  useFrame(() => {
    const vec = new Vector3();
    chassisBody.current?.getWorldPosition(vec);

    const radiusLimit = groundRadius - 5;

    const distanceToOrigin = Math.sqrt(vec.x ** 2 + vec.z ** 2);

    const gridPosX = Math.floor((vec.x - gridOffset[0] + gridSize / 2) / gridSize);
    const gridPosZ = Math.floor((vec.z - gridOffset[1] + gridSize / 2) / gridSize);

    if (carGridPos[0] !== gridPosX || carGridPos[1] !== gridPosZ) {
      dispatch(setCarGridPos([gridPosX, gridPosZ]));
    }

    if (distanceToOrigin > radiusLimit) {
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);

      chassisApi.position.set(0, 5, 0);
    }
  });

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
