import useEditorContext from '@/app/editor/useEditorContext';
import { usePlane } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { BufferAttribute, BufferGeometry, Mesh } from 'three';
import CustomGrid from './Grid';

const Ground = () => {
  const { tool } = useEditorContext();

  const gridMap = useTexture('grid.png');

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
    if (uvs2) {
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
        name="plane"
        position={[0, -0.1, 0]}
        rotation-x={-Math.PI * 0.5}
        onPointerEnter={handleDefaultPointerEnter}
        // onPointerDown={(e) => tool.onPointerDown(e)}
        // onPointerUp={() => tool.onPointerUp()}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial opacity={0} transparent={true} />
      </mesh>
      {/* <mesh position={[0, -0.2, 0]} rotation-x={-Math.PI * 0.5}>
        <boxGeometry args={[150, 100, 0.2]} />
        <meshPhysicalMaterial
          clearcoat={1}
          color={[1, 1, 1]}
          ior={1.5}
          thickness={0.2}
          roughness={0.2}
          specularIntensity={1}
          transmission={1}
        />
      </mesh> */}

      <CustomGrid />
      {/* <Grid args={[100, 100]} cellSize={7.5} fadeDistance={5000} infiniteGrid sectionSize={7.5} /> */}

      {/* <mesh ref={meshRef} position={[0, -0.015, 0]} rotation-x={-Math.PI * 0.5}>
        <circleGeometry args={[groundRadius, 50]} />
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
      </mesh> */}
    </>
  );
};

export default Ground;
