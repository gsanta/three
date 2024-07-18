import useEditorContext from '@/app/editor/EditorContext';
import { Plane } from '@react-three/drei';
import { ThreeEvent, useLoader } from '@react-three/fiber';
import { useCallback } from 'react';
import { RepeatWrapping, TextureLoader } from 'three';

const Terrain = () => {
  const { tool } = useEditorContext();
  const height = useLoader(TextureLoader, 'height_map.png');
  const height2 = useLoader(TextureLoader, 'height_map2.png');
  const colors = useLoader(TextureLoader, 'height_map_color.png');
  const colors2 = useLoader(TextureLoader, 'height_map_color2.png');
  const colorsNe = useLoader(TextureLoader, 'height_map_ne_color.png');
  const heightNe = useLoader(TextureLoader, 'height_map_ne.png');
  const colorsN = useLoader(TextureLoader, 'height_map_n_color.png');
  const heightN = useLoader(TextureLoader, 'height_map_n.png');

  const handleDefaultPointerEnter = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerEnter(event);
    },
    [tool],
  );
  return (
    <>
      <Plane args={[200, 200, 1024, 1024]} name="plane" rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.1, 0]}>
        <meshStandardMaterial color="white" map={colors} displacementMap={height} displacementScale={25} />
      </Plane>
      <Plane args={[200, 200, 1024, 1024]} name="plane2" rotation={[-Math.PI / 2, 0, 0]} position={[197, -0.2, 0]}>
        <meshStandardMaterial color="white" map={colors2} displacementMap={height2} displacementScale={25} />
      </Plane>
      <Plane args={[200, 200, 1024, 1024]} name="plane3" rotation={[-Math.PI / 2, 0, 0]} position={[197, -0.2, -197]}>
        <meshStandardMaterial color="white" map={colorsNe} displacementMap={heightNe} displacementScale={25} />
      </Plane>
      <Plane args={[200, 200, 1024, 1024]} name="plane4" rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.2, -197]}>
        <meshStandardMaterial color="white" map={colorsN} displacementMap={heightN} displacementScale={25} />
      </Plane>
      <Plane
        args={[200, 200]}
        name="plane"
        onPointerEnter={handleDefaultPointerEnter}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[2, -0.2, 0]}
        onPointerDown={(e) => tool.onPointerDown(e)}
        onPointerUp={() => tool.onPointerUp()}
        onPointerMove={(e) => tool.onPointerMove(e)}
      >
        <meshStandardMaterial color="white" />
      </Plane>
    </>
  );
};

export default Terrain;
