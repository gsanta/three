class EditorRuntime {
  isRuntimeInitialized = false;

  onRuntimeInitialized() {
    this.isRuntimeInitialized = true;
    renderApp();
  }

  setStatus() {}

  HEAPU8: any;

  canvas?: HTMLCanvasElement;
}

export default EditorRuntime;
