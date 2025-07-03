import { PrismaClient } from '@prisma/client';
import TestEnv from 'test/client/support/TestEnv';

declare global {
  const prisma: PrismaClient | undefined;

  const testEnv: TestEnv;
}

declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export default value;
}
