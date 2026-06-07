// Integration test app for Expo SDK 56 / React Native 0.76.
// Validates that:
//   1. quasifyMetroTransformer is wired via metro.config.js.
//   2. @quasify-ui/components imports and TypeScript-compiles cleanly.
//   3. Token-valued props (e.g. p={16}) are accepted by the type system.

import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { Box } from "@quasify-ui/components";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Token-valued spacing prop — exercises the Metro transformer path */}
      <Box p={16}>
        <Text style={styles.heading}>
          Quasify-ui × Expo SDK 56 integration
        </Text>
        <Text style={styles.body}>
          Box component with token-valued props rendered successfully.
        </Text>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#555",
  },
});
