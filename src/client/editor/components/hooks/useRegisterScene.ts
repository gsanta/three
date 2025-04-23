import useEditorContext from '@/app/editor/EditorContext';
import { useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';

const useRegisterScene = <T extends Mesh | Group>() => {
  const { sceneStore: scene } = useEditorContext();

  const meshRef = useRef<T>(null);

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
