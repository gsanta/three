class EditorRuntime {
  isRuntimeInitialized = false;

  private _canvasNode: HTMLElement | undefined;

  onRuntimeInitialized() {
    this.isRuntimeInitialized = true;
    renderApp();
  }

  set canvasNode(canvas: HTMLElement | undefined) {
    this._canvasNode = canvas;
  }

  get canvasNode(): HTMLElement | undefined {
    return this._canvasNode;
  }

  setStatus() {}

  canvas?: HTMLCanvasElement;

  // canvas: (function () {
  //   var canvas = document.getElementById('canvas');

  //   // As a default initial behavior, pop up an alert when webgl context is lost. To make your
  //   // application robust, you may want to override this behavior before shipping!
  //   // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
  //   canvas.addEventListener("webglcontextlost", function (e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);

  //   return canvas;
  // })(),
}

export default EditorRuntime;