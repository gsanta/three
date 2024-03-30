import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import MeshData from '@/editor/types/MeshData';
import { addVector } from '@/editor/utils/vectorUtils';
import { Cone } from '@react-three/drei';
import { MeshProps, MeshStandardMaterialProps } from '@react-three/fiber';
import Cable from './Cable';
import BoxMesh from './BoxMesh';

const MeshRenderer = ({ meshInfo, meshProps = {}, materialProps = {} }: MeshRendererProps) => {
  const { tool } = useEditorContext();
  const { meshes } = useAppSelector((selector) => selector.scene.present);

  if (meshInfo.name === 'group') {
    return (
      <group key={meshInfo.id} position={meshProps.position} name={meshInfo.name} userData={{ modelId: meshInfo.id }}>
        {meshInfo.children.map((child) => (
          <MeshRenderer key={meshes[child].id} meshInfo={meshes[child]} materialProps={materialProps} />
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
        name={meshInfo.name}
        userData={{ modelId: meshInfo.id }}
      >
        <meshStandardMaterial color="lightblue" {...materialProps} />
      </Cone>
    );
  }

  if (meshInfo.name === 'cable') {
    return <Cable points={meshInfo.points} />;
  }

  return <BoxMesh meshInfo={meshInfo} meshProps={meshProps} materialProps={materialProps} />;
};

export default MeshRenderer;
