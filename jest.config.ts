import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/ui/(.*)$': '<rootDir>/src/components/ui/$1',
  }
};

module.exports = createJestConfig(customJestConfig);
