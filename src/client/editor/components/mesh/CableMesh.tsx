import { useMemo } from 'react';
import { CatmullRomCurve3, Mesh, Vector3 } from 'three';
import WrappedMeshProps from '../../types/block/WrappedMeshProps';
import Cable from '../../types/block/Cable';
import useRegisterScene from '../hooks/useRegisterScene';
import Num3 from '../../types/Num3';

type CableProps = WrappedMeshProps<'tube'> & { cable: Cable };

const CableMesh = ({ cable, meshProps, block: meshInfo }: CableProps) => {
  const ref = useRegisterScene<Mesh>();

  const curve = useMemo(() => {
    return new CatmullRomCurve3(
      cable.points.filter((p) => p).map((point) => new Vector3(...(point as Num3))),
      false,
      'catmullrom',
      0,
    );
  }, [cable.points]);

  if (cable.points.length < 2) {
    return null;
  }

  return (
    <mesh {...meshProps} userData={{ modelId: meshInfo.id }} key={meshInfo.id} name={meshInfo.type} ref={ref}>
      <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
    </mesh>
  );
};

export default CableMesh;
