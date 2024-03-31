import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import WrappedMeshProps from '../types/WrappedMeshProps';

type CableProps = WrappedMeshProps<'cable', 'tube'>;

const CableMesh = ({ meshProps, meshInfo }: CableProps) => {
  const curve = useMemo(() => {
    return new CatmullRomCurve3(
      meshInfo.points.map((point) => new Vector3(point[0], point[1], point[2])),
      false,
      'catmullrom',
      0,
    );
  }, [meshInfo.points]);

  if (meshInfo.points.length < 2) {
    return null;
  }

  return (
    <mesh {...meshProps} userData={{ modelId: meshInfo.id }} key={meshInfo.id} name={meshInfo.name}>
      <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
    </mesh>
  );
};

export default CableMesh;
