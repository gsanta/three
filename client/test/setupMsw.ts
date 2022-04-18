/* eslint-disable import/no-extraneous-dependencies */

import { mswServer } from '../msw_mock_api/mocks/msw-server';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jest-fetch-mock').enableMocks();

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
