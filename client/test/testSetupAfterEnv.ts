/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { mswServer } from '../msw_mock_api/src/mocks/msw-server';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jest-fetch-mock').enableMocks();

beforeAll(() => {console.log('msw is set up'); mswServer.listen()});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
