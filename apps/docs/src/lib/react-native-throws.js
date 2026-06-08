/**
 * react-native-throws.js
 *
 * Aliased as "react-native" in the Next.js webpack config.
 *
 * Purpose: make require("react-native") throw at runtime so that
 * @stareezy-ui/components' platform detection correctly sees:
 *   hasReactNative = false  →  isWeb = true
 *
 * This enables the web render path (Box/div-based) for all components
 * instead of the React Native render path (RN View/Text).
 *
 * All require("react-native") calls inside the library are wrapped in
 * try/catch, so this throw is always caught — it never bubbles up to
 * crash the application.
 *
 * Sub-path imports (react-native/Libraries/...) are handled separately
 * by NormalModuleReplacementPlugin → react-native-stub.js which is a
 * safe, non-throwing stub.
 */

// Webpack evaluates this module once at bundle time to collect exports.
// The module itself must not throw at evaluation time — only the exports
// should indicate "not available". We achieve the throwing behaviour by
// exporting a Proxy that throws on any property access, which is what
// happens when the library code does:
//   const { Platform } = require("react-native")
// and Platform is undefined/throws.
//
// Actually the simplest approach: export nothing meaningful and let the
// try/catch in `hasReactNative` detect that require() resolved but the
// module is empty. BUT the library just checks `require()` doesn't throw —
// it doesn't check the exports.
//
// So we must actually throw. We do it via module.exports getter trick:

"use strict";

// Throw synchronously when this module is first required.
// Webpack bundles this fine (it only calls the getter at runtime).
// The throw is caught by the try/catch in hasReactNative detection.
throw new Error(
  "react-native is not available in a web-only Next.js build — " +
    "this throw is expected and caught by stareezy-ui's platform detection.",
);
