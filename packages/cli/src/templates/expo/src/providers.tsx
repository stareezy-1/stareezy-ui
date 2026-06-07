import { ThemeProvider } from "@quasify-ui/tokens";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme="light">{children}</ThemeProvider>;
}
