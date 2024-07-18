import { useAppSelector } from '@/client/common/hooks/hooks';
import { useState } from 'react';

type RowProps = {
  count: number;
  rowIndex: number;
  offsetX: number;
  offsetZ: number;
  x: number;
  z: number;
  gridSize: number;
  highlightRows: number[];
  highlightCols: number[];
};

const Row = ({ count, highlightRows, highlightCols, rowIndex, x, z, offsetX, offsetZ, gridSize }: RowProps) => {
  const [currentGridItem, setCurrentGridItem] = useState<number>();
  const zPos = z * gridSize;

  const getX = (index: number) => x * gridSize + index * gridSize;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          name="selection"
          onPointerEnter={() => setCurrentGridItem(rowIndex * count + i)}
          onPointerLeave={() => setCurrentGridItem(undefined)}
          position={[getX(i) + offsetX, 0.1, zPos + offsetZ]}
          rotation-x={-Math.PI * 0.5}
        >
          <planeGeometry args={[gridSize - 0.1, gridSize - 0.1]} />
          <meshBasicMaterial
            opacity={0.2}
            color="blue"
            transparent
            visible={
              currentGridItem === rowIndex * count + i ||
              (highlightRows.includes(rowIndex) && highlightCols.includes(i))
            }
          />
        </mesh>
      ))}
    </>
  );
};

const Grid = () => {
  const gridOffset = useAppSelector((state) => state.editor.gridOffset);
  const gridSize = useAppSelector((state) => state.editor.gridSize);
  const carGridPos = useAppSelector((state) => state.editor.carGridPos);

  const hightlightRows = [carGridPos[1], carGridPos[1] + 1];
  const hightlightCols = [carGridPos[0], carGridPos[0] + 1];

  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => (
        <Row
          count={20}
          highlightRows={hightlightRows}
          highlightCols={hightlightCols}
          rowIndex={i}
          x={0}
          z={i}
          offsetX={gridOffset[0]}
          offsetZ={gridOffset[1]}
          gridSize={gridSize}
        />
      ))}
    </>
  );
};

export default Grid;
