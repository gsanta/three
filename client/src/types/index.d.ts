declare global {
  function renderApp(): void;

  // eslint-disable-next-line no-var
  var Module: {
    setWindowSize(width: number, height: number);
    isRuntimeInitialize: boolean;

    selectTool(name: string);
  };
}

export {};
