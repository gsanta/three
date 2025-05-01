import { useAppSelector } from '@/client/common/hooks/hooks';
import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';

const TemporaryCableRenderer = () => {
  const { cables } = useAppSelector((selector) => selector.temporary);

  const curve = useMemo(() => {
    return new CatmullRomCurve3(
      cables?.map((point) => new Vector3(point[0], point[1], point[2])),
      false,
      'catmullrom',
      0,
    );
  }, [cables]);

  if (cables) {
    return (
      <mesh key="temporary-cable">
        <tubeGeometry args={[curve, 70, 0.02, 50, false]} />
      </mesh>
    );
  }

  return undefined;
};

export default TemporaryCableRenderer;
