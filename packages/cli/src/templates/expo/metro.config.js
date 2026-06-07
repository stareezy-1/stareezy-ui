const { getDefaultConfig } = require("expo/metro-config");
const { quasifyMetroTransformer } = require("@quasify-ui/compiler/metro");

const config = getDefaultConfig(__dirname);

// Wire the Quasify UI Metro transformer so token-valued props
// are compiled at build time (Req 8.4 / 8.5).
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("@quasify-ui/compiler/metro"),
};

module.exports = config;
