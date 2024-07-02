import { useMemo } from 'react';
import { CatmullRomCurve3, Mesh, Vector3 } from 'three';
import WrappedMeshProps from '../../types/block/WrappedMeshProps';
import Cable from '../../types/block/Cable';
import useRegisterScene from '../hooks/useRegisterScene';
import Num3 from '../../types/Num3';

type CableProps = WrappedMeshProps<'tube'> & { cable: Cable };

const CableMesh = ({ cable, meshProps, block }: CableProps) => {
  const ref = useRegisterScene<Mesh>();

  // const blockPosition = overwrites?.position ? overwrites.position : block.position;
  // const position = additions?.position ? addVector(additions.position, blockPosition) : blockPosition;
  // const blockRotation = overwrites?.rotation ? overwrites.rotation : block.rotation;

  const curve = useMemo(() => {
    if (cable.points.length < 2) {
      return undefined;
    }

    return new CatmullRomCurve3(
      cable.points.filter((p) => p).map((point) => new Vector3(...(point.position as Num3))),
      false,
      'catmullrom',
      0,
    );
  }, [cable.points]);

  return (
    <mesh {...meshProps} userData={{ modelId: block.id }} key={block.id} name={block.type} ref={ref}>
      <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
    </mesh>
  );
};

export default CableMesh;
