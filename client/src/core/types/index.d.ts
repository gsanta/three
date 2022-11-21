/* eslint-disable no-var */

declare global {
  function renderApp(): void;

  var Module:
    | {
        setWindowSize(width: number, height: number);
        isRuntimeInitialized: boolean;

        addActiveTool(name: string);
        removeActiveTool(name: string);

        getEngineData();
        setEngineData(data: string);

        setColor(color: number);

        getLayers(): any;

        createLayer(name: string, id: string): void;

        canvasNode?: HTMLElement;
      }
    | undefined;

  var CanvasEventHandler: {
    emitDataChange(): void;
  };
}

export {};
