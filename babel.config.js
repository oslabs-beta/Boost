/* global module */
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "babel/preset-typescript"],
};

/* 

However, there are some caveats to using TypeScript with Babel. Because TypeScript support in Babel is purely transpilation, Jest will not type-check your tests as they are run. If you want that, you can use ts-jest instead, or just run the TypeScript compiler tsc separately (or as part of your build process).
Using TypeScript via ts-jest
ts-jest is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
*/
