const nxPreset = require('@nrwl/jest/preset');
module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  passWithNoTests: false,
  setupFile: './test-setup.ts',
  moduleNameMapper: {
    '@enttribe/core': 'libs/core/src',
  },
};
