const { getDefaultConfig } = require("expo/metro-config");
const { stareezyMetroTransformer } = require("@stareezy-ui/compiler/metro");

const config = getDefaultConfig(__dirname);

// Wire the Stareezy UI Metro transformer so token-valued props
// are compiled at build time (Req 8.4 / 8.5).
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("@stareezy-ui/compiler/metro"),
};

module.exports = config;
