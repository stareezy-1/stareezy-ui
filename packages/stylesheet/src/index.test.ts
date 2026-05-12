/**
 * Unit tests for AtomicStyleSheet
 *
 * These tests run in a jsdom environment (via vitest) which provides
 * `document` and `document.head`.
 *
 * Requirements: 9.2, 9.3, 9.4, 16.3
 */

import { describe, it, expect, beforeEach } from "vitest";
import { AtomicStyleSheet } from "./index";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Reset document.head between tests so style tags don't bleed across tests. */
function resetHead() {
  document.head.innerHTML = "";
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("AtomicStyleSheet", () => {
  beforeEach(() => {
    resetHead();
  });

  // ── getClassName ────────────────────────────────────────────────────────────

  describe("getClassName", () => {
    it("returns sz-<tokenId> for a simple id", () => {
      const sheet = new AtomicStyleSheet();
      expect(sheet.getClassName("primary-500")).toBe("sz-primary-500");
    });

    it("returns sz-<tokenId> for a compound id", () => {
      const sheet = new AtomicStyleSheet();
      expect(sheet.getClassName("spacing-extraMedium")).toBe(
        "sz-spacing-extraMedium",
      );
    });

    it("returns sz-<tokenId> for a radius id", () => {
      const sheet = new AtomicStyleSheet();
      expect(sheet.getClassName("radius-md")).toBe("sz-radius-md");
    });
  });

  // ── inject ──────────────────────────────────────────────────────────────────

  describe("inject", () => {
    it("creates a <style> tag on first inject", () => {
      const sheet = new AtomicStyleSheet();
      expect(document.getElementById("sz-atomic")).toBeNull();

      sheet.inject("primary-500", "background-color", "#024CCE");

      expect(document.getElementById("sz-atomic")).not.toBeNull();
    });

    it("appends the correct CSS rule to the style tag", () => {
      const sheet = new AtomicStyleSheet();
      sheet.inject("primary-500", "background-color", "#024CCE");

      const styleEl = document.getElementById("sz-atomic") as HTMLStyleElement;
      expect(styleEl.textContent).toContain(
        ".sz-primary-500 { background-color: var(--primary-500); }",
      );
    });

    it("uses var(--tokenId) in the rule, not the raw value", () => {
      const sheet = new AtomicStyleSheet();
      sheet.inject("spacing-4", "padding", "4");

      const styleEl = document.getElementById("sz-atomic") as HTMLStyleElement;
      expect(styleEl.textContent).toContain("var(--spacing-4)");
      // The raw value should NOT appear in the atomic rule
      expect(styleEl.textContent).not.toContain("padding: 4");
    });

    it("deduplicates: injecting the same tokenId twice only adds one rule (Req 9.4)", () => {
      const sheet = new AtomicStyleSheet();
      sheet.inject("primary-500", "background-color", "#024CCE");
      sheet.inject("primary-500", "background-color", "#024CCE");

      const styleEl = document.getElementById("sz-atomic") as HTMLStyleElement;
      const ruleCount = (styleEl.textContent?.match(/\.sz-primary-500/g) ?? [])
        .length;
      expect(ruleCount).toBe(1);
    });

    it("deduplicates across different CSS properties for the same tokenId", () => {
      const sheet = new AtomicStyleSheet();
      sheet.inject("primary-500", "background-color", "#024CCE");
      // Second call with a different property — still deduplicated by tokenId
      sheet.inject("primary-500", "color", "#024CCE");

      const styleEl = document.getElementById("sz-atomic") as HTMLStyleElement;
      const ruleCount = (styleEl.textContent?.match(/\.sz-primary-500/g) ?? [])
        .length;
      expect(ruleCount).toBe(1);
    });

    it("injects multiple distinct tokens as separate rules", () => {
      const sheet = new AtomicStyleSheet();
      sheet.inject("primary-500", "background-color", "#024CCE");
      sheet.inject("spacing-4", "padding", "4");
      sheet.inject("radius-md", "border-radius", "8");

      const styleEl = document.getElementById("sz-atomic") as HTMLStyleElement;
      expect(styleEl.textContent).toContain(".sz-primary-500");
      expect(styleEl.textContent).toContain(".sz-spacing-4");
      expect(styleEl.textContent).toContain(".sz-radius-md");
    });

    it("reuses the same <style> tag across multiple inject calls", () => {
      const sheet = new AtomicStyleSheet();
      sheet.inject("primary-500", "background-color", "#024CCE");
      sheet.inject("spacing-4", "padding", "4");

      const atomicTags = document.querySelectorAll("#sz-atomic");
      expect(atomicTags.length).toBe(1);
    });
  });

  // ── injectRootVariables ─────────────────────────────────────────────────────

  describe("injectRootVariables", () => {
    it("creates a <style id='sz-root-vars'> tag on first call", () => {
      const sheet = new AtomicStyleSheet();
      expect(document.getElementById("sz-root-vars")).toBeNull();

      sheet.injectRootVariables([{ id: "primary-500", value: "#024CCE" }]);

      expect(document.getElementById("sz-root-vars")).not.toBeNull();
    });

    it("writes a :root block with the correct CSS variable declarations (Req 9.3)", () => {
      const sheet = new AtomicStyleSheet();
      sheet.injectRootVariables([
        { id: "primary-500", value: "#024CCE" },
        { id: "spacing-4", value: 4 },
      ]);

      const styleEl = document.getElementById(
        "sz-root-vars",
      ) as HTMLStyleElement;
      expect(styleEl.textContent).toContain(":root");
      expect(styleEl.textContent).toContain("--primary-500: #024CCE;");
      expect(styleEl.textContent).toContain("--spacing-4: 4;");
    });

    it("replaces the :root block on subsequent calls (theme switching)", () => {
      const sheet = new AtomicStyleSheet();
      sheet.injectRootVariables([{ id: "primary-500", value: "#024CCE" }]);
      sheet.injectRootVariables([{ id: "primary-500", value: "#FF0000" }]);

      const styleEl = document.getElementById(
        "sz-root-vars",
      ) as HTMLStyleElement;
      expect(styleEl.textContent).toContain("--primary-500: #FF0000;");
      expect(styleEl.textContent).not.toContain("--primary-500: #024CCE;");
    });

    it("is a no-op when passed an empty array", () => {
      const sheet = new AtomicStyleSheet();
      sheet.injectRootVariables([]);

      expect(document.getElementById("sz-root-vars")).toBeNull();
    });

    it("coerces non-string values to strings", () => {
      const sheet = new AtomicStyleSheet();
      sheet.injectRootVariables([
        { id: "spacing-4", value: 4 },
        { id: "opacity", value: 0.5 },
      ]);

      const styleEl = document.getElementById(
        "sz-root-vars",
      ) as HTMLStyleElement;
      expect(styleEl.textContent).toContain("--spacing-4: 4;");
      expect(styleEl.textContent).toContain("--opacity: 0.5;");
    });

    it("reuses the same <style> tag across multiple calls", () => {
      const sheet = new AtomicStyleSheet();
      sheet.injectRootVariables([{ id: "primary-500", value: "#024CCE" }]);
      sheet.injectRootVariables([{ id: "spacing-4", value: 4 }]);

      const rootVarsTags = document.querySelectorAll("#sz-root-vars");
      expect(rootVarsTags.length).toBe(1);
    });
  });

  // ── isolation between instances ─────────────────────────────────────────────

  describe("instance isolation", () => {
    it("two AtomicStyleSheet instances each create their own style tags", () => {
      const sheet1 = new AtomicStyleSheet();
      const sheet2 = new AtomicStyleSheet();

      sheet1.inject("primary-500", "background-color", "#024CCE");
      sheet2.inject("spacing-4", "padding", "4");

      // Both tags exist (two separate #sz-atomic elements)
      const atomicTags = document.querySelectorAll("#sz-atomic");
      expect(atomicTags.length).toBe(2);
    });
  });
});
