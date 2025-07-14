import { useEffect, useMemo } from 'react';
import { CatmullRomCurve3, DoubleSide, Group, RepeatWrapping, TextureLoader, Vector2, Vector3 } from 'three';
import WrappedMeshProps from '../../models/block/WrappedMeshProps';
import CableDecorator from '../../models/block/categories/CableDecorator';
import useRegisterScene from '../hooks/useRegisterScene';
import Num3 from '../../models/math/Num3';
import useEditorContext from '@/app/editor/useEditorContext';
import { Select } from '@react-three/postprocessing';
import { useLoader } from '@react-three/fiber';

type GroundCableProps = WrappedMeshProps & { cable: CableDecorator };

const GroundCableMesh = ({ cable, meshProps, block }: GroundCableProps) => {
  const ref = useRegisterScene<Group>();
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

  const texture = useLoader(TextureLoader, block.texturePath || '');
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.needsUpdate = true;

  const imageAspectRatio = 1920 / 250; // 7.68

  const planeWidth = 7.5;
  const planeHeight = 0.5;

  const repeatY = 1;
  const repeatX = planeWidth / (planeHeight * imageAspectRatio);

  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;

  const startPoint = cable.points[0].position;
  const endPoint = cable.points[cable.points.length - 1].position;

  const start = new Vector2(startPoint[0], startPoint[2]);
  const end = new Vector2(endPoint[0], endPoint[2]);

  const direction = new Vector2().subVectors(end, start);
  const length = direction.length();
  const angle = Math.atan2(direction.y, direction.x);
  const midpoint = new Vector2().addVectors(start, end).multiplyScalar(0.5);

  return (
    <Select enabled={block.isHovered || block.isSelected}>
      <group ref={ref} key={block.id} userData={{ modelId: block.id }}>
        <mesh
          {...meshProps}
          onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e) : undefined}
          userData={{ modelId: block.id }}
          key={`${block.id}-ribbon`}
          name={block.type}
          position={[midpoint.x, startPoint[1] + 0.3, midpoint.y]}
          rotation={[Math.PI / 2, 0, -angle]}
        >
          <planeGeometry args={[length, planeHeight]} />
          <meshStandardMaterial map={texture} side={DoubleSide} />
        </mesh>
        <mesh
          {...meshProps}
          onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e) : undefined}
          userData={{ modelId: block.id }}
          key={`${block.id}-cable`}
          name={block.type}
        >
          <tubeGeometry args={[curve, 70, 0.06, 50, false]} />
          <meshBasicMaterial
            color={block.isPreview ? '#ff00ff' : 'black'}
            transparent={block.isPreview}
            opacity={block.isPreview ? 0.1 : 1}
          />
        </mesh>
        <mesh
          {...meshProps}
          onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e) : undefined}
          userData={{ modelId: block.id }}
          key={`${block.id}-cable`}
          name="End1"
          position={cable.points[0].position}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial
            color={block.isPreview ? '#ff00ff' : 'black'}
            transparent={block.isPreview}
            opacity={block.isPreview ? 0.1 : 1}
          />
        </mesh>
        <mesh
          {...meshProps}
          onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e) : undefined}
          userData={{ modelId: block.id }}
          key={`${block.id}-cable`}
          name="End2"
          position={cable.points[1].position}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial
            color={block.isPreview ? '#ff00ff' : 'black'}
            transparent={block.isPreview}
            opacity={block.isPreview ? 0.1 : 1}
          />
        </mesh>
      </group>
    </Select>
  );
};

export default GroundCableMesh;
