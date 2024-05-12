import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});


const jestConfig = {
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts", "<rootDir>/test/client/support/matchers/matchers.ts"],
  testEnvironment: "jsdom"
}

export default createJestConfig(jestConfig);
