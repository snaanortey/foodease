/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|js)$': ['ts-jest', {
      // tsconfig: '<rootDir>/tsconfig.json'
      useESM: true
    }],
  }
};