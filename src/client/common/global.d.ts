import { PrismaClient } from '@prisma/client';
import TestEnv from 'test/client/support/TestEnv';

declare global {
  const prisma: PrismaClient | undefined;

  const testEnv: TestEnv;
}
