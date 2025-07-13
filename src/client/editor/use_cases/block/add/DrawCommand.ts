interface DrawCommand {
  finish(): void;

  executeAfterRender?(): void;
}

export default DrawCommand;
