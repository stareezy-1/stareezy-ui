import { SafeAreaView, StyleSheet } from "react-native";
import { Box, Button, Text } from "@stareezy-ui/components";
import { t } from "@stareezy-ui/tokens";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Box style={styles.container} p={24}>
        {/* Text uses theme-reactive t.* tokens — switches with theme */}
        <Text
          type="L-heading-bold"
          text="Welcome to {{PROJECT_NAME}}"
          color={t.text.primary.value}
        />
        <Text
          type="M-paragraph-regular"
          text="Powered by Stareezy UI — cross-platform design tokens for React Native and web."
          color={t.text.secondary.value}
          style={styles.subtitle}
        />

        <Box mt={32} gap={12}>
          <Button
            type="Primary"
            text="Get Started"
            onPress={() => console.log("Hello from Stareezy UI!")}
            fullWidth
          />
          <Button
            type="Secondary"
            text="View Documentation"
            onPress={() => console.log("Docs")}
            fullWidth
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 32,
  },
  subtitle: {
    marginTop: 8,
    lineHeight: 24,
  },
});
