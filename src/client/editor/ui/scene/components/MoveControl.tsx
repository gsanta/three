import { PivotControls } from '@react-three/drei';
import { Quaternion, Vector3 } from 'three';
import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Num3 from '@/client/editor/models/math/Num3';
import { ReactNode } from 'react';

type MoveControlProps = {
  children(props: { drag: Num3 }): ReactNode;
};

const defaultSnap = 0.25;

export const snapTo = (num: number, snapVal = defaultSnap) => {
  const base = num < 0 ? Math.ceil(num / snapVal) : Math.floor(num / snapVal);
  return base * snapVal;
};

const MoveControl = ({ children }: MoveControlProps) => {
  const drag = useAppSelector((selector) => selector.tool.select.drag);
  const moveAxis = useAppSelector((selector) => selector.tool.select.moveAxis);

  const { tool } = useEditorContext();

  return (
    <PivotControls
      depthTest={false}
      activeAxes={moveAxis}
      disableRotations={true}
      rotation={[0, 0, 0]}
      scale={1}
      anchor={[0, 1.5, 0]}
      autoTransform={false}
      onDrag={(_l, d) => {
        const newTransform = new Vector3();
        d.decompose(newTransform, new Quaternion(), new Vector3());
        newTransform.x = snapTo(newTransform.x);
        newTransform.y = snapTo(newTransform.y);
        newTransform.z = snapTo(newTransform.z);
        tool.onDrag(newTransform);
      }}
      onDragEnd={() => {
        tool.onDragEnd();
      }}
    >
      <group name="selection-group">{children({ drag })}</group>
    </PivotControls>
  );
};

export default MoveControl;
