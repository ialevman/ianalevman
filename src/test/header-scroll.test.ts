import { describe, expect, it } from "vitest";
import { shouldHideBottle, shouldRenderBottle } from "@/lib/header-scroll";

describe("bottle handoff to Artworks", () => {
  it("keeps the bottle until the start of Artworks reaches the top", () => {
    expect(shouldHideBottle(1)).toBe(false);
  });
  it("hides the bottle at the start of Artworks and throughout the gallery", () => {
    expect(shouldHideBottle(0)).toBe(true);
    expect(shouldHideBottle(-500)).toBe(true);
  });
  it("returns the bottle when scrolling back above Artworks", () => {
    expect(shouldHideBottle(20)).toBe(false);
  });
  it("does not hide the bottle on pages without Artworks", () => {
    expect(shouldHideBottle(null)).toBe(false);
  });
  it("never shows the header bottle on an artwork page", () => {
    expect(shouldRenderBottle("/works/breath-on-a-window")).toBe(false);
    expect(shouldRenderBottle("/works/thread")).toBe(false);
    expect(shouldRenderBottle("/")).toBe(true);
    expect(shouldRenderBottle("/cv")).toBe(true);
  });
});