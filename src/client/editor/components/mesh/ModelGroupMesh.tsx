import ModelPartMesh, { ModelPartProps } from './ModelPartMesh';

const ModelGroupMesh = ({ part, block, ...rest }: ModelPartProps) => {
  if (block.partDetails[part.index]?.hide) {
    return null;
  }

  return (
    <group position={part.position} rotation={part.rotation} scale={part.scale} name={part.name || ''}>
      {part.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupMesh key={`${block.id}-${childPart.index}`} {...rest} block={block} part={childPart} />
        ) : (
          <ModelPartMesh key={`${block.id}-${childPart.index}`} {...rest} block={block} part={childPart} />
        ),
      )}
    </group>
  );
};

export default ModelGroupMesh;