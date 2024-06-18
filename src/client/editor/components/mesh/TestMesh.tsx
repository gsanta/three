import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export const TestMesh = () => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/washing_mashine1.glb');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      actions['WashingMashine1.DoorOffAction']?.play();
      actions['WashingMashine1.DoorOnAction']?.play();
    }

    return () => {
      actions['WashingMashine1.DoorOffAction']?.stop();
      actions['WashingMashine1.DoorOnAction']?.stop();
      animations.forEach((clip) => mixer.uncacheClip(clip));
    };
  }, [actions, animations, mixer]);
  return (
    <group ref={group} dispose={null}>
      <group name="WashingMashine1Base" rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.248, 1]}>
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials.DarkGray}
        />
        <mesh
          name="Cylinder_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials.White}
        />
      </group>
      <mesh
        name="WashingMashine1DoorOff"
        castShadow
        receiveShadow
        geometry={nodes.WashingMashine1DoorOff.geometry}
        material={materials.Road}
        position={[-0.005, 0.63, -0.651]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 0.248, 1]}
      />
      <mesh
        name="WashingMashine1DoorOn"
        castShadow
        receiveShadow
        geometry={nodes.WashingMashine1DoorOn.geometry}
        material={materials.Wood1}
        position={[-0.004, 0.626, -0.379]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 0.248, 1]}
      />
      <mesh
        name="WashingMashine1Base001"
        castShadow
        receiveShadow
        geometry={nodes.WashingMashine1Base001.geometry}
        material={materials.White}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 0.248, 1]}
      />
    </group>
  );
};
