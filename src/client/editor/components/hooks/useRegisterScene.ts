import useEditorContext from '@/app/editor/EditorContext';
import { useCallback, useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';

const useRegisterScene = () => {
  const { scene } = useEditorContext();

  const meshRef = useRef<Mesh | Group | null>(null);

  const ref = useCallback(
    (mesh: Mesh | Group | null) => {
      if (mesh) {
        meshRef.current = mesh;

        if ('isGroup' in mesh) {
          scene.addGroup(mesh, mesh.uuid);
        } else {
          scene.addMesh(mesh, mesh.uuid);
        }
      }
    },
    [scene],
  );

  useEffect(() => {
    return () => {
      scene.removeMeshOrGroup(meshRef.current?.userData.modelId, meshRef.current?.uuid || '');
    };
  }, [scene]);

  return ref;
};

export default useRegisterScene;
