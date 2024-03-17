import ReactThreeTestRenderer from '@react-three/test-renderer';
// import App from './Canvas';
import React from 'react';
import CanvasContent from './CanvasContent';
import { Provider } from 'react-redux';
import { store } from '@/common/utils/store';
import { useAppSelector } from '@/common/hooks/hooks';
import useSelectedMeshes from '../../builder/useSelectedMeshes';
import SelectedMesh from './SelectedMesh';
import TestPage from '@/common/components/TestPage';

const Content = () => {
  const { meshes, roots } = useAppSelector((selector) => selector.scene.present);
  const selectedMeshes = useSelectedMeshes();

  return selectedMeshes.length ? <SelectedMesh selectedMeshes={selectedMeshes} /> : undefined;
};

test('mesh to have two children', async () => {
  const renderer = await ReactThreeTestRenderer.create(
    <TestPage>
      <CanvasContent />
    </TestPage>,
  );
});
