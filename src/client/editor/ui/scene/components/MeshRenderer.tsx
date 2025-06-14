import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../mesh/CableMesh';
import WrappedMeshProps from '../../../models/block/WrappedMeshProps';
import { ModelMesh } from '../../mesh/ModelMesh';
import BlockData from '@/client/editor/models/block/BlockData';
import CableDecorator from '@/client/editor/models/block/categories/CableDecorator';
import MoveControl from './MoveControl';
import { useEffect, useRef } from 'react';
import useEditorContext from '@/app/editor/useEditorContext';
import { resetNotifyOnRendered } from '@/client/editor/stores/block/blockActions';

const isModelMesh = (block: BlockData) => block.category !== 'cables';

const isTubeMesh = (block: BlockData) => block.category === 'cables';

const MeshRenderer = (props: WrappedMeshProps) => {
  const { block, meshProps, materialProps = {} } = props;
  const decorations = useAppSelector((selector) => selector.block.present.decorations);
  const dispatch = useAppDispatch();

  const { sceneService, tool } = useEditorContext();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (block.notifyOnRender || isFirstRender.current) {
      tool.onRendered();
      sceneService.onMeshRendered(block.id);

      isFirstRender.current = false;

      dispatch(resetNotifyOnRendered({ block: block.id }));
    }
  });

  const { additions } = props;

  if (isModelMesh(block)) {
    return block.isSelected ? (
      <MoveControl>
        {({ drag }) => (
          <ModelMesh
            key={block.id}
            additions={{
              position: drag,
            }}
            block={block}
            meshProps={meshProps}
            materialProps={materialProps}
          />
        )}
      </MoveControl>
    ) : (
      <ModelMesh
        key={block.id}
        additions={additions}
        block={block}
        meshProps={meshProps}
        materialProps={materialProps}
      />
    );
  }

  if (isTubeMesh(block)) {
    return (
      <CableMesh
        additions={additions}
        cable={decorations.cables[block.id] as CableDecorator}
        block={block}
        meshProps={{ ...meshProps }}
        materialProps={materialProps}
      />
    );
  }

  return undefined;
};

export default MeshRenderer;
