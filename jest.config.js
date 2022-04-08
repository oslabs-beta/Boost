/* global module */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      useESM: true,
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
      "^.+\\.(css|less)$": "<rootDir>/config/CSSStub.js",
    },
  },
};
