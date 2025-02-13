export default {
  globals: {
    __IS_DEV__: true,
    __API__: '',
  },
  clearMocks: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.svg$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
  },
};
