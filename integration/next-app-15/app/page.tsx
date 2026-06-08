// Integration test page for Next.js 15 App Router.
// Validates that Stareezy-ui server-safe primitives compile and render
// under Next.js 15 with token-valued and responsive-style props.

import { Box } from "@stareezy-ui/components/server";

export default function Page() {
  return (
    <Box p={16} display="flex" flexDirection="column" gap={8}>
      <Box p={16} style={{ background: "white", borderRadius: 8 }}>
        <h1>Stareezy-ui × Next.js 15 integration</h1>
        <p>Box server component rendered successfully.</p>
      </Box>
    </Box>
  );
}
