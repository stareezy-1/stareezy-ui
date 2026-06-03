import { ThemeProvider } from "@stareezy-ui/tokens";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>;
}
