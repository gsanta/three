import { Vector3 } from 'three';
import { addTemplate } from '../steps/add';

export const SimpleRoad = () => {
  addTemplate({ templateName: 'road-1', where: new Vector3(5, 0, 0) }, testEnv);
  // store.dispatch(setSelectedTool(ToolName.Add));

  // testEnv.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
  // testEnv.toolHelper.pointerDown();
};

// export const SimpleRoad = () => {
//   addTemplate({ templateName: 'road-1', where: new Vector3(5, 0, 0) }, testEnv);
//   // store.dispatch(setSelectedTool(ToolName.Add));

//   // testEnv.toolHelper.pointerMove(new Vector3(0, 0.1, 5));
//   // testEnv.toolHelper.pointerDown();
// };
