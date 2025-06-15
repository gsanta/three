import { useEffect, useMemo } from 'react';
import { CatmullRomCurve3, Mesh, Vector3 } from 'three';
import WrappedMeshProps from '../../models/block/WrappedMeshProps';
import CableDecorator from '../../models/block/categories/CableDecorator';
import useRegisterScene from '../hooks/useRegisterScene';
import Num3 from '../../models/math/Num3';
import useEditorContext from '@/app/editor/useEditorContext';
import { Select } from '@react-three/postprocessing';

type CableProps = WrappedMeshProps & { cable: CableDecorator };

const CableMesh = ({ cable, meshProps, block }: CableProps) => {
  const ref = useRegisterScene<Mesh>();
  const { update } = useEditorContext();

  useEffect(() => {
    if (block.isDirty) {
      update.updateDirtyBlock(block.id);
    }
  });

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

  const onPointerEnter = meshProps?.onPointerEnter;

  return (
    <Select enabled={block.isHovered || block.isSelected}>
      <mesh
        {...meshProps}
        onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e) : undefined}
        userData={{ modelId: block.id }}
        key={block.id}
        name={block.type}
        ref={ref}
      >
        <tubeGeometry args={[curve, 70, 0.06, 50, false]} />
        <meshBasicMaterial
          color={block.isPreview ? '#ff00ff' : 'white'}
          transparent={block.isPreview}
          opacity={block.isPreview ? 0.1 : 1}
        />
      </mesh>
    </Select>
  );
};

export default CableMesh;
