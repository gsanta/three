import useEditorContext from '@/app/editor/EditorContext';
import MeshInfo from '@/editor/types/MeshInfo';
import { Cone } from '@react-three/drei';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';

type MeshRendererProps = {
  meshInfo: MeshInfo;
  meshProps?: MeshProps;
  materialProps?: MeshStandardMaterialProps;
};

const MeshRenderer = ({ meshInfo, meshProps = {}, materialProps = {} }: MeshRendererProps) => {
  const { tool } = useEditorContext();

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

  return (
    <mesh
      onPointerDown={(e) => {
        tool.onPointerDown(e);
        e.stopPropagation();
      }}
      castShadow
      position={meshInfo.position}
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