import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("combina classes simples", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignora valores falsy", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("resolve conflitos do Tailwind mantendo a última classe", () => {
    expect(cn("text-fg", "text-accent-text")).toBe("text-accent-text");
  });
});
