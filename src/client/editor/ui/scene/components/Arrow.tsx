import { useAppSelector } from '@/client/common/hooks/hooks';
import { gridToWorldPos } from '@/client/editor/models/Grid';
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

const Arrow = () => {
  const currentMovementPath = useAppSelector((state) => state.grid.currentMovementPath);
  const gridSize = useAppSelector((state) => state.grid.gridSize);
  const gridCols = useAppSelector((state) => state.grid.gridCols);
  const gridOffset = useAppSelector((state) => state.grid.gridOffset);

  if (!currentMovementPath) {
    return null;
  }
  const { path, lastGridIndex } = currentMovementPath;

  const lastPos = gridToWorldPos(lastGridIndex, gridCols, gridSize, gridOffset);

  const lineWidth = 0.1;

  return (
    <>
      <TriangleArrowHead
        color="cornflowerblue"
        direction={path[path.length - 1].direction}
        position={[lastPos[0], 0, lastPos[1]]}
      />
      {path.map((position) => {
        console.log('turn: ' + position.isTurn);

        const pos = gridToWorldPos(position.gridIndex, gridCols, gridSize, gridOffset);

        let finalPos = pos;
        let width = gridSize;

        if (position.direction === 'left') {
          finalPos = [pos[0] - gridSize / 2, pos[1]];

          if (position.isTurn) {
            finalPos[0] -= 0.5 / 2;
            width += 0.5;
          }
        } else if (position.direction === 'right') {
          finalPos = [pos[0] + gridSize / 2, pos[1]];
        } else if (position.direction === 'up') {
          finalPos = [pos[0], pos[1] - gridSize / 2];
        } else if (position.direction === 'down') {
          finalPos = [pos[0], pos[1] + gridSize / 2];
        }

        return (
          <mesh
            position={[finalPos[0], 0, finalPos[1]]}
            rotation={[0, ['left', 'right'].includes(position.direction) ? Math.PI / 2 : 0, 0]}
            key={pos.join(',')}
          >
            <boxGeometry args={[1, lineWidth, width]} />
            <meshStandardMaterial color="cornflowerblue" />
          </mesh>
        );
      })}
    </>
  );
};

export default Arrow;
