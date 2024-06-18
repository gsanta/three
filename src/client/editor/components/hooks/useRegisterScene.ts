import useEditorContext from '@/app/editor/EditorContext';
import { useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';

const useRegisterScene = () => {
  const { scene } = useEditorContext();

  const meshRef = useRef<Mesh | Group | undefined>(undefined);

  // const ref = useCallback(
  //   (mesh: Mesh | Group | null) => {
  //     if (mesh) {
  //       meshRef.current = mesh;

  //       if ('isGroup' in mesh) {
  //         scene.addGroup(mesh, mesh.uuid);
  //       } else {
  //         scene.addMesh(mesh, mesh.uuid);
  //       }
  //     }
  //   },
  //   [scene],
  // );

  useEffect(() => {
    const mesh = meshRef.current;
    if (meshRef.current) {
      if ('isGroup' in meshRef.current) {
        scene.addGroup(meshRef.current, meshRef.current.uuid);
      } else {
        scene.addMesh(meshRef.current, meshRef.current.uuid);
      }
    }

    return () => {
      scene.removeMeshOrGroup(mesh?.userData.modelId, mesh?.uuid || '');
    };
  }, [scene]);

  return meshRef;
};

export default useRegisterScene;
