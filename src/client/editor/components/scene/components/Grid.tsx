import { useState } from 'react';

type RowProps = {
  count: number;
  rowIndex: number;
  x: number;
  z: number;
  width: number;
  height: number;
};

const Row = ({ count, rowIndex, x, z, height, width }: RowProps) => {
  const [currentGridItem, setCurrentGridItem] = useState<number>();
  const zPos = z * height;

  const getX = (index: number) => x * width + index * width;

  const offsetX = 4;
  const offsetZ = 5;

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
          <planeGeometry args={[7.5, 7.5]} />
          <meshBasicMaterial
            opacity={0.3}
            color="blue"
            transparent
            visible={currentGridItem === rowIndex * count + i}
          />
        </mesh>
      ))}
    </>
  );
};

const Grid = () => {
  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => (
        <Row count={10} rowIndex={i} x={-5} z={-9 + i} width={7.5} height={7.5} />
      ))}
    </>
  );
};

export default Grid;
