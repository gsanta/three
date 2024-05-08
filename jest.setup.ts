import "@testing-library/jest-dom";
import "jest-canvas-mock";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));

global.IS_REACT_ACT_ENVIRONMENT = true;
