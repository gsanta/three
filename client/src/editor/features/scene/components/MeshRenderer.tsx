import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import MeshInfo from '@/editor/types/MeshInfo';
import { addVector } from '@/editor/utils/vectorUtils';
import { Cone } from '@react-three/drei';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type MeshRendererProps = {
  meshInfo: MeshInfo;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
};

const MeshRenderer = ({ meshInfo, meshProps = {}, materialProps = {} }: MeshRendererProps) => {
  const { tool } = useEditorContext();
  const { meshes } = useAppSelector((selector) => selector.scene.present);

  if (meshInfo.name === 'group') {
    return (
      <group position={meshProps.position}>
        {meshInfo.children.map((child) => (
          <MeshRenderer meshInfo={meshes[child]} materialProps={materialProps} />
        ))}
      </group>
    );
  }

  if (meshInfo.name === 'roof') {
    return (
      <Cone
        onPointerDown={(e) => {
          tool.onPointerDown(e);
          e.stopPropagation();
        }}
        position={meshInfo.position}
        rotation={meshInfo.rotation}
        {...meshProps}
        args={[meshInfo.radius, meshInfo.height, meshInfo.radialSegments]}
        key={meshInfo.id}
        name={meshInfo.id}
      >
        <meshStandardMaterial color="lightblue" {...materialProps} />
      </Cone>
    );
  }

  const parent = meshInfo.parent ? meshes[meshInfo.parent] : undefined;

  return (
    <mesh
      onPointerDown={(e) => {
        tool.onPointerDown(e);
        e.stopPropagation();
      }}
      castShadow
      position={addVector(meshInfo.position, parent?.position || [0, 0, 0])}
      rotation={meshInfo.rotation}
      scale={meshInfo.scale}
      {...meshProps}
      key={meshInfo.id}
      name={meshInfo.id}
    >
      <boxGeometry />
      <meshStandardMaterial color="lightblue" {...materialProps} />
    </mesh>
  );
};

export default MeshRenderer;
