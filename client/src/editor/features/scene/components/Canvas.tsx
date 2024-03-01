import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PivotControls, Plane } from '@react-three/drei';
import { Environment } from './Environment';
import { useAppSelector } from '../../../../common/hooks/hooks';
import { Mesh, Quaternion, Vector3 } from 'three';
import useEditorContext from '@/app/editor/EditorContext';

const App = () => {
  const { meshes } = useAppSelector((selector) => selector.scene);
  const { selectedMeshId } = useAppSelector((selector) => selector.builder);
  const { tool } = useEditorContext();

  const selectedMeshRef = useRef<Mesh>(null!);

  return (
    <Canvas style={{ backgroundColor: 'goldenrod' }} shadows camera={{ position: [0, 10, 15], fov: 25 }}>
      {meshes.map((meshInfo) => {
        const isSelectedMesh = meshInfo.id === selectedMeshId;
        const mesh = (
          <mesh
            ref={isSelectedMesh ? selectedMeshRef : null}
            key={meshInfo.id}
            name={meshInfo.id}
            onPointerDown={(e) => {
              if (!isSelectedMesh) {
                tool.onPointerDown(e);
                e.stopPropagation();
              }
            }}
            castShadow
            position={meshInfo.position}
            rotation={meshInfo.rotation}
            scale={meshInfo.scale}
          >
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
          </mesh>
        );

        return isSelectedMesh ? (
          <PivotControls
            depthTest={false}
            key={meshInfo.id}
            activeAxes={[true, true, true]}
            rotation={[0, Math.PI / 2, 0]}
            scale={1}
            anchor={[0, 0, 0.4]}
            onDrag={(l) => {
              const position = new THREE.Vector3();
              l.decompose(position, new Quaternion(), new Vector3());
              tool.onDrag(position);
            }}
          >
            {mesh}
          </PivotControls>
        ) : (
          mesh
        );
      })}

      <mesh position={[5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.1, 0]}
        onPointerDown={(e) => tool.onPointerDown(e)}
        onPointerMove={(e) => tool.onPointerMove(e)}
      >
        <meshStandardMaterial color="goldenrod" />
      </Plane>

      <Environment />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default App;
