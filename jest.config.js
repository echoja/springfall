const path = require('path');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: __dirname,
  modulePaths: ["<rootDir>/src"],
  testEnvironment: "jest-environment-node",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc-node/jest",
      {
        dynamicImport: "true",
      }
    ],
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};
