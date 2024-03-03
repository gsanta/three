import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, Matrix4 } from '@react-three/fiber';
import { Grid, OrbitControls, PivotControls, Plane } from '@react-three/drei';
import { Environment } from './Environment';
import { useAppSelector } from '../../../../common/hooks/hooks';
import { Mesh, Quaternion, Vector3 } from 'three';
import useEditorContext from '@/app/editor/EditorContext';
import { Matrix } from '@babylonjs/core';
import { addVector, snapTo } from '@/editor/utils/vectorUtils';

const App = () => {
  const { meshes } = useAppSelector((selector) => selector.scene);
  const { selectedMeshId } = useAppSelector((selector) => selector.builder);
  const { tool } = useEditorContext();

  const selectedMeshRef = useRef<Mesh>(null!);

  const [transform, setTransform] = useState<Vector3>(new Vector3(0));

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
            autoTransform={false}
            // onDrag={(l) => matrix.copy(matrix_)}
            onDrag={(l, d, w) => {
              const position = new THREE.Vector3();
              d.decompose(position, new Quaternion(), new Vector3());
              position.x = snapTo(position.x);
              position.z = snapTo(position.z);
              console.log(position.x);
              // transformRef.current = position;
              setTransform(position);

              // tool.onDrag(position);
            }}
            onDragEnd={() => {
              tool.onDragEnd(transform);
              setTransform(new Vector3(0));
            }}
          >
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
              position={addVector(meshInfo.position, transform ? transform.toArray() : [0, 0, 0])}
              rotation={meshInfo.rotation}
              scale={meshInfo.scale}
            >
              <boxGeometry />
              <meshStandardMaterial color="lightblue" />
            </mesh>
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
      <Grid infiniteGrid />

      <Environment />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default App;
