import useEditorContext from '@/app/editor/EditorContext';
import { useCallback, useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';
import { v4 as uuidv4 } from 'uuid';

const useRegisterScene = () => {
  const { scene } = useEditorContext();

  const meshRef = useRef<Mesh | Group | null>(null);
  const instanceId = useRef('');

  const ref = useCallback(
    (mesh: Mesh | Group | null) => {
      if (mesh) {
        meshRef.current = mesh;

        instanceId.current = uuidv4();

        if ('isGroup' in mesh) {
          scene.addGroup(mesh, instanceId.current);
        } else {
          scene.addMesh(mesh, instanceId.current);
        }
      }
    },
    [scene],
  );

  useEffect(() => {
    return () => {
      scene.removeMeshOrGroup(meshRef.current?.userData.modelId, instanceId.current);
    };
  }, [scene]);

  return ref;
};

export default useRegisterScene;
