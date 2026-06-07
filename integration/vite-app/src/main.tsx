// Integration entry for Vite 4–7 compatibility validation.
// Asserts:
//   1. The virtual:stareezy-ui/styles module is produced by stareezyVitePlugin.
//   2. Components import and use token-valued + responsive props without error.
//   3. The production build completes successfully on each Vite major (4/5/6/7).

import "virtual:stareezy-ui/styles";
import { Box } from "@stareezy-ui/components";

/**
 * Minimal App component:
 * - Uses token-valued props (numeric spacing → px)
 * - Uses responsive-style object syntax
 * - Imports from @stareezy-ui/components (exercises the Vite transform)
 */
const App = () => (
  <Box p={16} display="flex" flexDirection="column" gap={8}>
    <Box p={8} style={{ background: "white", borderRadius: 4 }}>
      <p>Stareezy-ui × Vite integration test</p>
    </Box>
  </Box>
);

export default App;
