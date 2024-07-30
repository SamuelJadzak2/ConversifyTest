/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",
  /** Add module-resolver plugin */
  [
    "module-resolver",
    {
      root: ["./"],
      alias: {
        '~': './app',
      },
    },
  ],

  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  "react-native-reanimated/plugin",

  /** Add transform-inline-environment-variables plugin */
  "transform-inline-environment-variables"
];

/** @type {import('@babel/core').TransformOptions} */
module.exports = function(api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins,
  };
};
