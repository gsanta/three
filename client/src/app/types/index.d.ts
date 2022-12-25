/* eslint-disable no-var */

declare global {
  function renderApp(): void;

  var Module: Editor | undefined;

  var CanvasEventHandler: {
    emitDataChange(): void;
  };
}

export {};
