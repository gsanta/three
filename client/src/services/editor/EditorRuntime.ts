class EditorRuntime {
  isRuntimeInitialized = false;

  onRuntimeInitialized() {
    this.isRuntimeInitialized = true;
    renderApp();
  }

  setStatus() {}

  canvas?: HTMLCanvasElement;
}

export default EditorRuntime;
