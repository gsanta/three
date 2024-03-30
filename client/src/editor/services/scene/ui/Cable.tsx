import Num3 from '@/editor/types/Num3';
import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';

type CableProps = {
  points: Num3[];
};

const Cable = ({ points }: CableProps) => {
  const curve = useMemo(() => {
    return new CatmullRomCurve3(
      points.map((point) => new Vector3(point[0], point[1], point[2])),
      false,
      'catmullrom',
      0,
    );
  }, [points]);

  if (points.length < 2) {
    return null;
  }

  return (
    <mesh>
      <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
    </mesh>
  );
};

export default Cable;
