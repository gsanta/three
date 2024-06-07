import ModelPartMesh, { ModelPartProps } from './ModelPartMesh';

const ModelGroupMesh = ({ part, block, ...rest }: ModelPartProps) => {
  if (block.partDetails[part.index]?.isHidden) {
    return null;
  }

  return (
    <group position={part.position} rotation={part.rotation} scale={part.scale} name={part.name || ''}>
      {part.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupMesh {...rest} block={block} part={childPart} />
        ) : (
          <ModelPartMesh {...rest} block={block} part={childPart} />
        ),
      )}
    </group>
  );
};

export default ModelGroupMesh;
