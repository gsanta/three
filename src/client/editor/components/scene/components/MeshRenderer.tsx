import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../mesh/CableMesh';
import WrappedMeshProps from '../../../models/block/WrappedMeshProps';
import { ModelMesh } from '../../mesh/ModelMesh';
import Block from '@/client/editor/models/Block';
import Cable from '@/client/editor/models/block/Cable';
import MoveControl from './MoveControl';
import { useEffect, useRef } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { resetNotifyOnRendered } from '@/client/editor/stores/block/blockActions';

const isModelMesh = (block: Block): block is Block<'model'> => block.category !== 'cables';

const isTubeMesh = (block: Block): block is Block<'tube'> => block.category === 'cables';

const MeshRenderer = (props: WrappedMeshProps) => {
  const { block, meshProps, materialProps = {} } = props;
  const slice = useAppSelector((selector) => selector.editor.mode);
  const decorations = useAppSelector((selector) =>
    slice === 'city' ? selector.block.present.decorations : selector.building.present.decorations,
  );
  const dispatch = useAppDispatch();

  const { tool } = useEditorContext();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (block.notifyOnRender || isFirstRender.current) {
      tool.onRendered(block.id);

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
        cable={decorations.cables[block.id] as Cable}
        block={block}
        meshProps={{ ...meshProps }}
        materialProps={materialProps}
      />
    );
  }

  return undefined;
};

export default MeshRenderer;
