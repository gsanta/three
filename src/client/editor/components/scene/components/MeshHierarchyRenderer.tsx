import Block from '@/client/editor/types/Block';
import MeshRenderer from './MeshRenderer';
import { ThreeEvent } from '@react-three/fiber';

type MeshHierarchyRendererProps = {
  blocks: Block[];
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onPointerEnter: (event: ThreeEvent<PointerEvent>) => void;
  parent?: string;
  selectedPartNames: Record<string, string[]>;
};

const MeshHierarchyRenderer = (props: MeshHierarchyRendererProps) => {
  const { blocks, onPointerDown, onPointerEnter, selectedPartNames } = props;

  return blocks
    .filter((block) => !block.parent)
    .map((block) => (
      <MeshRenderer
        key={block.id}
        block={block as Block<'model'>}
        meshProps={{
          onPointerDown: onPointerDown,
          onPointerEnter: onPointerEnter,
        }}
        selectedParts={selectedPartNames[block.id]}
      />
    ));
};

export default MeshHierarchyRenderer;
