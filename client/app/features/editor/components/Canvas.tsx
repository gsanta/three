import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, PivotControls, Plane, TransformControls } from '@react-three/drei';
import { Geometry, Base, Subtraction, Addition, CSGGeometryRef } from '@react-three/csg';
import { Environment } from './Environment';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { onClick, onMouseMove } from '../../tool/state/toolSlice';
import { Camera, Vector3 } from 'three';
import { setCamera } from '@/features/scene/sceneSlice';

const box = new THREE.BoxGeometry();
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20);
const tri = new THREE.CylinderGeometry(1, 1, 2, 3);

const App = () => {
  const [points, setPoints] = useState<THREE.Vector3[]>([]);

  const { meshes } = useAppSelector((selector) => selector.scene);

  const dispatch = useAppDispatch();

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <Canvas
      style={{ backgroundColor: 'goldenrod' }}
      shadows
      camera={{ position: [0, 10, 15], fov: 25 }}
      onCreated={(state) => dispatch(setCamera(state.camera))}
    >
      {/* <color attach="background" args={['skyblue']} /> */}
      {/* <House /> */}

      {meshes.map((m) => (
        <mesh
          onClick={(a) => {
            setPoints((value) => [...value, a.point]);
          }}
          castShadow
          position={m.position}
        >
          <boxGeometry />
          <meshStandardMaterial color="lightblue" />
        </mesh>
      ))}

      {/* <TransformControls mode="translate" position={[0, 0, 0]}>
        <group>
          <mesh
            onClick={(a) => {
              setPoints((value) => [...value, a.point]);
            }}
            castShadow
            position={[0, 0.5, 0]}
          >
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
          </mesh>
          <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <cylinderGeometry args={[0, 0.9, 1, 4]} />
            <meshStandardMaterial color="indianred" />
          </mesh>
        </group>
      </TransformControls> */}

      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.1, 0]}
        onPointerDown={() => dispatch(onClick())}
        onPointerMove={(e) => dispatch(onMouseMove(e))}
      >
        <meshStandardMaterial color="goldenrod" />
      </Plane>

      {points.length > 0 && <Line points={points} color="red" lineWidth={3} />}

      {/* <line ref={ref} geometry={lineGeometry}>
          <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line> */}
      <Environment />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

const House = () => {
  const csg = useRef<CSGGeometryRef | null>(null);
  return (
    <mesh receiveShadow castShadow>
      <Geometry ref={csg} computeVertexNormals>
        <Base name="base" geometry={box} scale={[3, 3, 3]} />
        <Subtraction name="cavity" geometry={box} scale={[2.7, 2.7, 2.7]} />
        <Addition
          name="roof"
          geometry={tri}
          scale={[2.5, 1.5, 1.425]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.2, 0]}
        />
        <Chimney scale={0.5} position={[-0.75, 3, 0.8]} />
        <Window position={[1.1, 2.5, 0]} scale={0.6} rotation={[0, Math.PI / 2, 0]} />
        <Window position={[0, 2.5, 1.5]} scale={0.6} rotation={[0, 0, 0]} />
        <PivotControls
          activeAxes={[false, true, true]}
          rotation={[0, Math.PI / 2, 0]}
          scale={1}
          anchor={[0, 0, 0.4]}
          onDrag={() => csg.current?.update()}
        >
          <Window position={[0, 0.25, 1.5]} scale={1.25} />
        </PivotControls>
        <PivotControls
          activeAxes={[false, true, true]}
          rotation={[0, Math.PI, 0]}
          scale={1}
          anchor={[0.4, 0, 0]}
          onDrag={() => csg.current?.update()}
        >
          <Hole rotation={[0, Math.PI / 2, 0]} position={[1.425, 0.25, 0]} scale={1.25} />
        </PivotControls>
        <PivotControls
          activeAxes={[false, true, true]}
          scale={1}
          anchor={[-0.5, 0, 0]}
          onDrag={() => csg.current?.update()}
        >
          <Door rotation={[0, Math.PI / 2, 0]} position={[-1.425, -0.45, 0]} scale={[1, 0.9, 1]} />
        </PivotControls>
      </Geometry>
      <meshStandardMaterial envMapIntensity={0.25} />
    </mesh>
  );
};

type PositionProps = {
  rotation?: [number, number, number];
  position: [number, number, number];
  scale: [number, number, number] | number;
};

const Door = (props: PositionProps) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} scale={[1, 2, 1]} />
      <Addition geometry={cyl} scale={0.5} rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]} />
    </Geometry>
  </Subtraction>
);

const Window = (props: PositionProps) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} />
      <Subtraction geometry={box} scale={[0.05, 1, 1]} />
      <Subtraction geometry={box} scale={[1, 0.05, 1]} />
    </Geometry>
  </Subtraction>
);

const Hole = (props: PositionProps) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} />
    </Geometry>
  </Subtraction>
);

const Chimney = (props: PositionProps) => (
  <Addition name="chimney" {...props}>
    <Geometry>
      <Base name="base" geometry={box} scale={[1, 2, 1]} />
      <Subtraction name="hole" geometry={box} scale={[0.7, 2, 0.7]} position={[0, 0.5, 0]} />
    </Geometry>
  </Addition>
);

export default App;
