// Metro configuration for Expo SDK 54 integration project.
// Wires stareezyMetroTransformer so token-valued props are transformed
// at build time (validates Req 8.4/8.5).

const { getDefaultConfig } = require("expo/metro-config");
const { stareezyMetroTransformer } = require("@stareezy-ui/compiler/metro");

const config = getDefaultConfig(__dirname);

// Point Metro to the stareezy transformer, which wraps the default
// Babel transformer after applying token-prop transforms.
config.transformer.babelTransformerPath = require.resolve(
  "@stareezy-ui/compiler/metro",
);

module.exports = config;
