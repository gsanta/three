/* eslint-disable no-var */

declare global {
  function renderApp(): void;

  var Module: {
    setWindowSize(width: number, height: number);
    isRuntimeInitialize: boolean;

    setActiveTool(name: string);

    getEngineData();
    setEngineData(data: string);

    setColor(color: number);

    canvasNode?: HTMLElement;
  };

  var CanvasEventHandler: {
    emitDataChange(): void;
  };
}

export {};
