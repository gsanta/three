import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';

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

const Row = ({ activeGridIndexes, count, rowIndex, x, z, offsetX, offsetZ, gridSize }: RowProps) => {
  const { tool } = useEditorContext();

  const zPos = z * gridSize;

  const getX = (index: number) => x * gridSize + index * gridSize;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          name="selection"
          onPointerDown={(e) =>
            tool.onPointerDown({ ...e, gridX: i, gridY: rowIndex, gridIndex: rowIndex * count + i })
          }
          onPointerUp={() => tool.onPointerUp()}
          position={[getX(i) + offsetX, 0.1, zPos + offsetZ]}
          rotation-x={-Math.PI * 0.5}
        >
          <planeGeometry args={[gridSize - 0.1, gridSize - 0.1]} />
          <meshBasicMaterial
            opacity={0.2}
            color="red"
            transparent
            visible={activeGridIndexes.includes(rowIndex * count + i)}
          />
        </mesh>
      ))}
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
