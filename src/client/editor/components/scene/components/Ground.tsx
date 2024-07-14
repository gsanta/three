import useEditorContext from '@/app/editor/EditorContext';
import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { BufferAttribute, BufferGeometry, Mesh } from 'three';

const Ground = () => {
  const { tool } = useEditorContext();

  const gridMap = useTexture('grid.png');
  const alphaMap = useTexture('alpha-map.png');

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  usePlane(
    () => ({
      type: 'Static',
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null),
  );

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  const meshRef = useRef<Mesh<BufferGeometry>>(null);
  const groundMesh = useRef<Mesh<BufferGeometry>>(null);

  useEffect(() => {
    const uvs = meshRef.current?.geometry.attributes.uv.array;
    if (uvs) {
      meshRef.current?.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2));
    }

    const uvs2 = groundMesh.current?.geometry.attributes.uv.array;
    if (uvs) {
      groundMesh.current?.geometry.setAttribute('uv2', new BufferAttribute(uvs2, 2));
    }
  }, []);

  const handleDefaultPointerEnter = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerEnter(event);
    },
    [tool],
  );

  return (
    <>
      <mesh
        ref={groundMesh}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
        onPointerEnter={handleDefaultPointerEnter}
        onPointerDown={(e) => tool.onPointerDown(e)}
        onPointerUp={() => tool.onPointerUp()}
        onPointerMove={(e) => tool.onPointerMove(e)}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial opacity={0.325} alphaMap={gridMap} transparent={true} color={'white'} />
      </mesh>

      <mesh ref={meshRef} position={[-2.285, -0.015, -1.325]} rotation-x={-Math.PI * 0.5} rotation-z={-0.079}>
        <circleGeometry args={[70, 50]} />
        <MeshReflectorMaterial
          //   aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}
          dithering={true}
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        />
      </mesh>
    </>
  );
};

export default Ground;
