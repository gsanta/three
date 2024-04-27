import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import WrappedMeshProps from '../../types/WrappedMeshProps';
import Cable from '../../types/Cable';
import useRegisterScene from '../hooks/useRegisterScene';

type CableProps = WrappedMeshProps<'tube'> & { cable: Cable };

const CableMesh = ({ cable, meshProps, meshInfo }: CableProps) => {
  const ref = useRegisterScene();

  const curve = useMemo(() => {
    return new CatmullRomCurve3(
      cable.points.map((point) => new Vector3(point[0], point[1], point[2])),
      false,
      'catmullrom',
      0,
    );
  }, [cable.points]);

  if (cable.points.length < 2) {
    return null;
  }

  return (
    <mesh {...meshProps} userData={{ modelId: meshInfo.id }} key={meshInfo.id} name={meshInfo.name} ref={ref}>
      <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
    </mesh>
  );
};

export default CableMesh;
