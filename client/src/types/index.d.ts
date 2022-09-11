
declare global {
    function renderApp(): void;

    var Module: {
        setWindowSize(width: number, height: number);
        isRuntimeInitialize: boolean;
    }
}
  
export {};