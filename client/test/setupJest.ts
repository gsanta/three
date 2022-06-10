/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { setGlobalConfig } from '@storybook/testing-react';
import * as globalStorybookConfig from '../.storybook/preview';

setGlobalConfig(globalStorybookConfig);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
