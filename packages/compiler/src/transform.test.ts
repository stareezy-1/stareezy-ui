/**
 * Unit tests for packages/compiler/src/transform.ts
 *
 * Covers:
 * - Token-valued JSX props are replaced with class name strings (Req 9.1)
 * - CSS rules are generated for each extracted token (Req 9.2)
 * - :root block is generated with CSS variables (Req 9.3)
 * - Deduplication: same token used multiple times → one CSS rule (Req 9.4)
 * - Non-Token props are left unchanged (Req 9.6)
 * - TokenCompilerError is thrown when id is missing
 */

import { describe, it, expect } from "vitest";
import { transform, TokenCompilerError } from "./transform";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Inline a Token object literal as a JSX prop value. */
function tokenProp(id: string, value: string | number) {
  const valStr = typeof value === "string" ? `"${value}"` : String(value);
  return `{{ __token: true, id: "${id}", value: ${valStr} }}`;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("transform()", () => {
  // -------------------------------------------------------------------------
  // Requirement 9.1 — Token props replaced with class name strings
  // -------------------------------------------------------------------------
  describe("Requirement 9.1 — Token prop replacement", () => {
    it("replaces a single Token-valued prop with a class name string", () => {
      const source = `<Box bg=${tokenProp("primary-500", "#024CCE")} />`;
      const { transformedSource, classMap } = transform(source);

      expect(transformedSource).toContain('"sz-primary-500"');
      expect(transformedSource).not.toContain("__token");
      expect(classMap.get("primary-500")).toBe("sz-primary-500");
    });

    it("replaces multiple Token-valued props on the same element", () => {
      const source = `<Box bg=${tokenProp("primary-500", "#024CCE")} color=${tokenProp("neutral-0", "#fff")} />`;
      const { transformedSource, classMap } = transform(source);

      expect(transformedSource).toContain('"sz-primary-500"');
      expect(transformedSource).toContain('"sz-neutral-0"');
      expect(classMap.size).toBe(2);
    });

    it("replaces Token props across multiple JSX elements", () => {
      const source = `
        <View>
          <Box bg=${tokenProp("primary-500", "#024CCE")} />
          <Text color=${tokenProp("neutral-0", "#fff")} />
        </View>
      `;
      const { transformedSource, classMap } = transform(source);

      expect(transformedSource).toContain('"sz-primary-500"');
      expect(transformedSource).toContain('"sz-neutral-0"');
      expect(classMap.size).toBe(2);
    });
  });

  // -------------------------------------------------------------------------
  // Requirement 9.2 — CSS rules generated for each token
  // -------------------------------------------------------------------------
  describe("Requirement 9.2 — CSS rule generation", () => {
    it("generates a CSS rule for a bg token", () => {
      const source = `<Box bg=${tokenProp("primary-500", "#024CCE")} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain(
        ".sz-primary-500 { background-color: var(--primary-500); }",
      );
    });

    it("generates a CSS rule for a color token", () => {
      const source = `<Text color=${tokenProp("neutral-0", "#fff")} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain(".sz-neutral-0 { color: var(--neutral-0); }");
    });

    it("generates two CSS rules for a px token (padding-left + padding-right)", () => {
      const source = `<Box px=${tokenProp("spacing-4", 4)} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain(
        ".sz-spacing-4 { padding-left: var(--spacing-4); }",
      );
      expect(cssSheet).toContain(
        ".sz-spacing-4 { padding-right: var(--spacing-4); }",
      );
    });

    it("generates two CSS rules for a py token (padding-top + padding-bottom)", () => {
      const source = `<Box py=${tokenProp("spacing-8", 8)} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain(
        ".sz-spacing-8 { padding-top: var(--spacing-8); }",
      );
      expect(cssSheet).toContain(
        ".sz-spacing-8 { padding-bottom: var(--spacing-8); }",
      );
    });

    it("generates a CSS rule for a rounded token", () => {
      const source = `<Box rounded=${tokenProp("radius-md", 8)} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain(
        ".sz-radius-md { border-radius: var(--radius-md); }",
      );
    });
  });

  // -------------------------------------------------------------------------
  // Requirement 9.3 — :root block with CSS variables
  // -------------------------------------------------------------------------
  describe("Requirement 9.3 — :root CSS variable block", () => {
    it("generates a :root block with the token's CSS variable", () => {
      const source = `<Box bg=${tokenProp("primary-500", "#024CCE")} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain(":root {");
      expect(cssSheet).toContain("--primary-500: #024CCE;");
    });

    it("includes all referenced tokens in the :root block", () => {
      const source = `<Box bg=${tokenProp("primary-500", "#024CCE")} color=${tokenProp("neutral-0", "#fff")} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain("--primary-500: #024CCE;");
      expect(cssSheet).toContain("--neutral-0: #fff;");
    });

    it("includes numeric token values in the :root block", () => {
      const source = `<Box p=${tokenProp("spacing-4", 4)} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toContain("--spacing-4: 4;");
    });
  });

  // -------------------------------------------------------------------------
  // Requirement 9.4 — Deduplication
  // -------------------------------------------------------------------------
  describe("Requirement 9.4 — CSS rule deduplication", () => {
    it("generates only one CSS rule when the same token is used twice", () => {
      const source = `
        <>
          <Box bg=${tokenProp("primary-500", "#024CCE")} />
          <Card bg=${tokenProp("primary-500", "#024CCE")} />
        </>
      `;
      const { cssSheet, classMap } = transform(source);

      // Count occurrences of the rule
      const ruleCount = (
        cssSheet.match(/\.sz-primary-500 \{ background-color/g) || []
      ).length;
      expect(ruleCount).toBe(1);
      expect(classMap.size).toBe(1);
    });

    it("generates only one :root variable when the same token is used multiple times", () => {
      const source = `
        <>
          <Box bg=${tokenProp("primary-500", "#024CCE")} />
          <Card bg=${tokenProp("primary-500", "#024CCE")} />
          <View bg=${tokenProp("primary-500", "#024CCE")} />
        </>
      `;
      const { cssSheet } = transform(source);

      const varCount = (cssSheet.match(/--primary-500:/g) || []).length;
      expect(varCount).toBe(1);
    });
  });

  // -------------------------------------------------------------------------
  // Requirement 9.6 — Non-Token props left unchanged
  // -------------------------------------------------------------------------
  describe("Requirement 9.6 — Non-Token props unchanged", () => {
    it("leaves a plain string prop unchanged", () => {
      const source = `<Box className="my-class" />`;
      const { transformedSource } = transform(source);

      expect(transformedSource).toContain('"my-class"');
    });

    it("leaves a plain number prop unchanged", () => {
      const source = `<Box width={100} />`;
      const { transformedSource } = transform(source);

      expect(transformedSource).toContain("100");
    });

    it("leaves a non-token object prop unchanged", () => {
      const source = `<Box style={{ color: "red" }} />`;
      const { transformedSource } = transform(source);

      expect(transformedSource).toContain('"red"');
      expect(transformedSource).not.toContain("sz-");
    });

    it("leaves an object with __token: false unchanged", () => {
      const source = `<Box data={{ __token: false, id: "x", value: 1 }} />`;
      const { transformedSource, classMap } = transform(source);

      expect(transformedSource).toContain("__token");
      expect(classMap.size).toBe(0);
    });

    it("does not generate CSS rules for non-Token props", () => {
      const source = `<Box className="my-class" width={100} />`;
      const { cssSheet } = transform(source);

      expect(cssSheet).toBe("");
    });
  });

  // -------------------------------------------------------------------------
  // TokenCompilerError — missing id
  // -------------------------------------------------------------------------
  describe("TokenCompilerError — missing id", () => {
    it("throws TokenCompilerError when a Token is missing the id property", () => {
      const source = `<Box bg={{ __token: true, value: "#024CCE" }} />`;

      expect(() => transform(source)).toThrow(TokenCompilerError);
      expect(() => transform(source)).toThrow(/missing a valid "id"/);
    });

    it("throws TokenCompilerError when a Token has an empty string id", () => {
      const source = `<Box bg={{ __token: true, id: "", value: "#024CCE" }} />`;

      expect(() => transform(source)).toThrow(TokenCompilerError);
    });
  });

  // -------------------------------------------------------------------------
  // classMap correctness
  // -------------------------------------------------------------------------
  describe("classMap", () => {
    it("maps token id to generated class name", () => {
      const source = `<Box bg=${tokenProp("primary-500", "#024CCE")} />`;
      const { classMap } = transform(source);

      expect(classMap.get("primary-500")).toBe("sz-primary-500");
    });

    it("is empty when no Token props are present", () => {
      const source = `<Box className="foo" />`;
      const { classMap } = transform(source);

      expect(classMap.size).toBe(0);
    });
  });

  // -------------------------------------------------------------------------
  // Config — custom prop mappings
  // -------------------------------------------------------------------------
  describe("custom config", () => {
    it("uses custom prop mappings when provided", () => {
      const source = `<Box shadow=${tokenProp("shadow-md", "0 2px 4px")} />`;
      const { cssSheet } = transform(source, {
        propMappings: { shadow: "box-shadow" },
      });

      expect(cssSheet).toContain(
        ".sz-shadow-md { box-shadow: var(--shadow-md); }",
      );
    });

    it("merges custom mappings with defaults", () => {
      const source = `
        <Box bg=${tokenProp("primary-500", "#024CCE")} shadow=${tokenProp("shadow-md", "0 2px 4px")} />
      `;
      const { cssSheet } = transform(source, {
        propMappings: { shadow: "box-shadow" },
      });

      expect(cssSheet).toContain(
        ".sz-primary-500 { background-color: var(--primary-500); }",
      );
      expect(cssSheet).toContain(
        ".sz-shadow-md { box-shadow: var(--shadow-md); }",
      );
    });
  });

  // -------------------------------------------------------------------------
  // TypeScript / complex JSX
  // -------------------------------------------------------------------------
  describe("TypeScript JSX support", () => {
    it("handles TypeScript generics in the same file", () => {
      const source = `
        const fn = <T,>(x: T): T => x;
        const el = <Box bg=${tokenProp("primary-500", "#024CCE")} />;
      `;
      const { transformedSource, classMap } = transform(source);

      expect(classMap.get("primary-500")).toBe("sz-primary-500");
      expect(transformedSource).toContain('"sz-primary-500"');
    });
  });
});
