declare global {
  function renderApp(): void;

  // eslint-disable-next-line no-var
  var Module: {
    setWindowSize(width: number, height: number);
    isRuntimeInitialize: boolean;

    setActiveTool(name: string);

    getEngineData();
    setEngineData(data: string);

    setColor(color: number);
  };

  // eslint-disable-next-line no-var
  var ExternalEventHandler: {
    emitDataChange(): void;
  };
}

export {};
