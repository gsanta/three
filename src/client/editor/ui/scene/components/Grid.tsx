import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { Line } from '@react-three/drei';
import { useState } from 'react';

type RowProps = {
  activeGridIndexes: number[];
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

const Row = ({ count, rowIndex, x, z, offsetX, offsetZ, gridSize }: RowProps) => {
  const { tool } = useEditorContext();
  const reachableGrids = useAppSelector((selector) => selector.game.reachableGrids);

  const zPos = z * gridSize;

  const getX = (index: number) => x * gridSize + index * gridSize;

  const [highlighted, setHighlighted] = useState<number>();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        let visible = false;
        if (!!reachableGrids[rowIndex * count + i]) {
          visible = true;
        }

        const gridIndex = rowIndex * count + i;

        return (
          <mesh
            key={i}
            name="selection"
            onPointerDown={(e) => tool.onPointerDown({ ...e, gridX: i, gridY: rowIndex, gridIndex })}
            onPointerMove={(e) => tool.onPointerMove({ ...e, gridX: i, gridY: rowIndex, gridIndex })}
            onPointerEnter={() => setHighlighted(gridIndex)}
            onPointerLeave={() => {
              if (highlighted === gridIndex) {
                setHighlighted(undefined);
              }
            }}
            onPointerUp={() => tool.onPointerUp()}
            position={[getX(i) + offsetX, -0.1, zPos + offsetZ]}
            rotation-x={-Math.PI * 0.5}
          >
            <planeGeometry args={[gridSize - 0.1, gridSize - 0.1]} />
            <meshBasicMaterial color={highlighted === gridIndex ? 'orange' : 'red'} visible={visible} />
          </mesh>
        );
      })}
    </>
  );
};

const Grid = () => {
  const gridOffset = useAppSelector((state) => state.grid.gridOffset);
  const gridSize = useAppSelector((state) => state.grid.gridSize);
  const carGridPos = useAppSelector((state) => state.grid.carGridPos);
  const gridRows = useAppSelector((state) => state.grid.gridRows);
  const gridCols = useAppSelector((state) => state.grid.gridCols);
  const activeGridIndexes = useAppSelector((state) => state.grid.activeGridIndexes);

  const hightlightRows = [carGridPos[1] - 1, carGridPos[1], carGridPos[1] + 1];
  const hightlightCols = [carGridPos[0] - 1, carGridPos[0], carGridPos[0] + 1];

  const px = carGridPos[0] * gridSize + gridOffset[0];
  const pz = carGridPos[1] * gridSize + gridOffset[1];

  return (
    <>
      <mesh position={[px, 5, pz]}>
        <boxGeometry />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
      {Array.from({ length: gridRows + 1 }).map((_, i) => (
        <Line
          opacity={0.2}
          points={[
            [gridOffset[0] - gridSize / 2, 0, gridOffset[1] + i * gridSize - gridSize / 2],
            [gridOffset[0] + gridCols * gridSize - gridSize / 2, 0, gridOffset[1] + i * gridSize - gridSize / 2],
          ]}
          transparent
        />
      ))}

      {Array.from({ length: gridCols + 1 }).map((_, i) => (
        <Line
          opacity={0.2}
          points={[
            [gridOffset[0] + i * gridSize - gridSize / 2, 0, gridOffset[1] - gridSize / 2],
            [gridOffset[0] + i * gridSize - gridSize / 2, 0, gridOffset[1] + gridRows * gridSize - gridSize / 2],
          ]}
          transparent
        />
      ))}

      {Array.from({ length: gridRows }).map((_, i) => (
        <Row
          activeGridIndexes={activeGridIndexes}
          count={gridCols}
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
