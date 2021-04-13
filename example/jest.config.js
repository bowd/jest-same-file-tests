module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', 
    '<rootDir>/src/**/(*.)[tj]s?(x)',
  ],
  setupFiles: ['<rootDir>/setupFile.js']
};