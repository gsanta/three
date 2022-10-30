const setWindowSize = (isModuleSet: boolean, canvasNode?: HTMLElement) => {
  if (canvasNode && isModuleSet) {
    canvasNode.removeAttribute('width');
    canvasNode.removeAttribute('height');
    const rect = canvasNode.getBoundingClientRect();
    window.Module.setWindowSize(rect.width, rect.height);
  }
};

export default setWindowSize;
