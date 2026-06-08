// @stareezy-ui/compiler
// Babel/Vite/Metro plugin for build-time token extraction and atomic CSS generation.

export type { CompilerConfig } from "./config";
export { DEFAULT_PROP_MAPPINGS, DEFAULT_CONFIG, resolveConfig } from "./config";

export type { CompilerOutput } from "./transform";
export { transform, TokenCompilerError } from "./transform";

export { stareezyBabelPlugin } from "./babel";
export { stareezyVitePlugin } from "./vite";
export { stareezyMetroTransformer } from "./metro";
export type { StareezyBuildConfig } from "./loadConfig";
export { loadStareezyConfig } from "./loadConfig";
