import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Providers } from "@/src/providers";
import "../quasify.config";

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </Providers>
  );
}
