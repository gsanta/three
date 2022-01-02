import { Engine, Scene, SceneLoader, ArcRotateCamera, Vector3, HemisphericLight } from 'babylonjs';
import { Dispatch, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersState } from '../../ui/store';
import ActionTypes from '../actionTypes';
import engineStore from '../EngineStore';

const selectEngine = (state: ReducersState) => state.engine;

const createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
  const scene = new Scene(engine);

  SceneLoader.ImportMeshAsync('', 'https://assets.babylonjs.com/meshes/', 'box.babylon');

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(1, 1, 0), scene);

  return scene;
};

function initEngine(node: HTMLCanvasElement, dispatch: Dispatch<any>) {
  const engine = new Engine(node, true);
  const scene = createScene(engine, node);

  dispatch({ type: ActionTypes.engineLoaded });
  engineStore.engine = engine;
  engineStore.scene = scene;

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });
}

const useLoadEngine = (): [(node: any) => void] => {
  const { isLoaded } = useSelector(selectEngine);
  const dispatch = useDispatch();

  const elRef = useCallback(
    (node) => {
      if (node !== null && !isLoaded) {
        initEngine(node, dispatch);
      }
    },
    [dispatch, isLoaded],
  );

  return [elRef];
};

export default useLoadEngine;
