import { useAppSelector } from '@/client/common/hooks/hooks';
import Num3 from '@/client/editor/models/math/Num3';
import { useMemo } from 'react';
import { MeshStandardMaterial, DoubleSide, BufferAttribute, BufferGeometry, ColorRepresentation, Vector3 } from 'three';
import Direction from '../../types/Direction';

interface TriangleArrowHeadProps {
  color?: ColorRepresentation;
  direction?: Direction;
  size?: number; // Base length of the triangle
  height?: number; // Height of the triangle (in XZ plane)
  position?: Num3;
  thickness?: number; // Thickness in Y direction
}

export const TriangleArrowHead = ({
  color = 'red',
  direction,
  size = 1.5,
  height = 1,
  position = [0, 0, 0],
  thickness = 0.1,
}: TriangleArrowHeadProps) => {
  const geometry = useMemo(() => {
    const halfSize = size / 2;
    const halfThickness = thickness / 2;

    // Triangle in XZ plane pointing in +Z (forward)
    const top = new Vector3(0, halfThickness, height); // tip
    const left = new Vector3(-halfSize, halfThickness, 0); // bottom-left
    const right = new Vector3(halfSize, halfThickness, 0); // bottom-right

    const topB = top.clone().setY(-halfThickness);
    const leftB = left.clone().setY(-halfThickness);
    const rightB = right.clone().setY(-halfThickness);

    const vertices = [
      // Top face
      left,
      right,
      top,
      // Bottom face
      rightB,
      leftB,
      topB,
      // Side faces
      left,
      leftB,
      rightB,
      left,
      rightB,
      right,

      right,
      rightB,
      topB,
      right,
      topB,
      top,

      top,
      topB,
      leftB,
      top,
      leftB,
      left,
    ];

    const positionArray = new Float32Array(vertices.flatMap((v) => v.toArray()));

    const geom = new BufferGeometry();
    geom.setAttribute('position', new BufferAttribute(positionArray, 3));
    geom.computeVertexNormals();

    return geom;
  }, [size, height, thickness]);

  // Determine rotation in radians based on direction
  const rotationY = useMemo(() => {
    switch (direction) {
      case 'down':
        return 0;
      case 'up':
        return Math.PI;
      case 'left':
        return -Math.PI / 2;
      case 'right':
      default:
        return Math.PI / 2;
    }
  }, [direction]);

  const finalPosition = useMemo(() => {
    let dx = 0,
      dz = 0;
    switch (direction) {
      case 'down':
        dz = height / 2;
        break;
      case 'up':
        dz = -height / 2;
        break;
      case 'left':
        dx = -height / 2;
        break;
      case 'right':
        dx = height / 2;
        break;
    }
    return [position[0], 0, position[2]] as [number, number, number];
  }, [direction, position, height]);

  const material = useMemo(() => new MeshStandardMaterial({ color, side: DoubleSide }), [color]);

  return <mesh geometry={geometry} material={material} position={finalPosition} rotation={[0, rotationY, 0]} />;
};

type ArrowProps = {
  player: string;
};

const Arrow = ({ player }: ArrowProps) => {
  const currentMovementPath = useAppSelector((state) => state.block.decorations.players[player]?.currentMovementPath);

  if (!currentMovementPath) {
    return null;
  }
  const { path, lastNode } = currentMovementPath;

  return (
    <>
      <TriangleArrowHead
        color="cornflowerblue"
        direction={path[path.length - 1].direction}
        position={lastNode.position}
      />
      {path.map((position) => {
        return (
          <mesh
            position={position.position}
            rotation={[0, ['left', 'right'].includes(position.direction) ? Math.PI / 2 : 0, 0]}
            key={position.position.join(',')}
          >
            <boxGeometry args={[1, 0.1, position.size]} />
            <meshStandardMaterial color="cornflowerblue" />
          </mesh>
        );
      })}
    </>
  );
};

export default Arrow;
