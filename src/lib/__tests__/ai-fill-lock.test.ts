import { describe, it, expect, vi } from "vitest";
import {
  AI_FIELD_KEYS,
  AUTHOR_FIELD_KEYS,
  type AIFieldKey,
  type AIFieldPreview,
  applyPreviews,
  buildValidPreviews,
  computeEmptyAiFields,
} from "@/lib/ai-fill-lock";
import { collectionNames } from "@/lib/collections";

const fullState = {
  cuisineRegion: "italian" as const,
  seoTitle: "Existing title",
  seoDescription: "Existing description",
  tips: "Existing tips",
  collections: [collectionNames[0]],
};

const emptyState = {
  cuisineRegion: null,
  seoTitle: "",
  seoDescription: "   ",
  tips: "",
  collections: [],
};

describe("AI / Author key separation", () => {
  it("AI and Author key sets never overlap", () => {
    const aiSet = new Set<string>(AI_FIELD_KEYS);
    for (const k of AUTHOR_FIELD_KEYS) {
      expect(aiSet.has(k as string)).toBe(false);
    }
  });
});

describe("computeEmptyAiFields", () => {
  it("returns no fields when all AI-assisted fields are filled", () => {
    expect(computeEmptyAiFields(fullState, true)).toEqual([]);
  });

  it("returns all AI-assisted fields when blank (including collections when allowed)", () => {
    expect(computeEmptyAiFields(emptyState, true).sort()).toEqual(
      [...AI_FIELD_KEYS].sort(),
    );
  });

  it("never includes collections when no collections setter is present", () => {
    const out = computeEmptyAiFields(emptyState, false);
    expect(out).not.toContain("collections");
  });

  it("excludes a field that already has whitespace-trimmed content", () => {
    const out = computeEmptyAiFields(
      { ...emptyState, seoTitle: "Some title" },
      true,
    );
    expect(out).not.toContain("seo_title");
  });
});

describe("buildValidPreviews — lock enforcement", () => {
  it("ignores suggestions for fields not in emptyFields (already-filled fields are locked)", () => {
    // Only seo_title is empty; AI tries to overwrite tips and cuisine too.
    const previews = buildValidPreviews(["seo_title"], {
      seo_title: "Fresh title",
      tips: "AI tried to overwrite tips",
      cuisine_region: "italian",
    });
    expect(previews.map((p) => p.key)).toEqual(["seo_title"]);
  });

  it("ignores keys that aren't AI-assisted (author keys are never returned)", () => {
    const previews = buildValidPreviews(["seo_title"], {
      seo_title: "Fresh title",
      // Author-controlled keys masquerading as suggestions:
      title: "AI rewrote your title",
      ingredients: ["AI rewrote ingredients"],
      instructions: ["AI rewrote method"],
      prep_time_minutes: 5,
    } as unknown as Record<string, unknown>);
    const keys = previews.map((p) => p.key);
    expect(keys).toEqual(["seo_title"]);
    // Defensive: no author key leaks through.
    for (const k of AUTHOR_FIELD_KEYS) {
      expect(keys).not.toContain(k as unknown as AIFieldKey);
    }
  });

  it("drops an unknown cuisine value", () => {
    const previews = buildValidPreviews(["cuisine_region"], {
      cuisine_region: "martian",
    });
    expect(previews).toEqual([]);
  });

  it("drops empty / blank string suggestions", () => {
    const previews = buildValidPreviews(["seo_title", "tips"], {
      seo_title: "   ",
      tips: "",
    });
    expect(previews).toEqual([]);
  });

  it("drops collections suggestion when none of the names are recognised", () => {
    const previews = buildValidPreviews(["collections"], {
      collections: ["not-a-real-collection"],
    });
    expect(previews).toEqual([]);
  });
});

describe("applyPreviews — lock enforcement", () => {
  function makeSetters() {
    return {
      setCuisineRegion: vi.fn(),
      setSeoTitle: vi.fn(),
      setSeoDescription: vi.fn(),
      setTips: vi.fn(),
      setCollections: vi.fn(),
    };
  }

  const allSelected: Record<AIFieldKey, boolean> = {
    cuisine_region: true,
    seo_title: true,
    seo_description: true,
    tips: true,
    collections: true,
  };

  it("only applies ticked previews", () => {
    const setters = makeSetters();
    const previews: AIFieldPreview[] = [
      { key: "seo_title", label: "", preview: "x", rawValue: "Hello" },
      { key: "tips", label: "", preview: "y", rawValue: "Some tips" },
    ];
    const selected = { ...allSelected, tips: false };
    const applied = applyPreviews(previews, selected, setters);
    expect(applied).toBe(1);
    expect(setters.setSeoTitle).toHaveBeenCalledWith("Hello");
    expect(setters.setTips).not.toHaveBeenCalled();
  });

  it("never calls setters for author fields (none exist on the setter object)", () => {
    const setters = makeSetters();
    const setterKeys = Object.keys(setters);
    for (const k of AUTHOR_FIELD_KEYS) {
      expect(setterKeys).not.toContain(`set${k}`);
    }
  });

  it("does nothing when collections setter is absent", () => {
    const setters = {
      setCuisineRegion: vi.fn(),
      setSeoTitle: vi.fn(),
      setSeoDescription: vi.fn(),
      setTips: vi.fn(),
      // setCollections intentionally omitted
    };
    const previews: AIFieldPreview[] = [
      { key: "collections", label: "", preview: "x", rawValue: [collectionNames[0]] },
    ];
    const applied = applyPreviews(previews, allSelected, setters);
    expect(applied).toBe(0);
  });

  it("truncates oversized suggestions to schema limits", () => {
    const setters = makeSetters();
    const long = "x".repeat(500);
    const previews: AIFieldPreview[] = [
      { key: "seo_title", label: "", preview: long, rawValue: long },
      { key: "seo_description", label: "", preview: long, rawValue: long },
      { key: "tips", label: "", preview: long, rawValue: long },
    ];
    applyPreviews(previews, allSelected, setters);
    expect(setters.setSeoTitle.mock.calls[0][0].length).toBeLessThanOrEqual(70);
    expect(setters.setSeoDescription.mock.calls[0][0].length).toBeLessThanOrEqual(170);
    expect(setters.setTips.mock.calls[0][0].length).toBeLessThanOrEqual(2000);
  });
});

describe("end-to-end: lock holds when AI returns rogue payload", () => {
  it("a fully-filled recipe receives no previews, regardless of what the AI returns", () => {
    const emptyFields = computeEmptyAiFields(fullState, true);
    expect(emptyFields).toEqual([]);

    const previews = buildValidPreviews(emptyFields, {
      // AI tries to overwrite every author + AI-assisted field.
      title: "rewritten title",
      description: "rewritten description",
      ingredients: ["rewritten"],
      instructions: ["rewritten"],
      seo_title: "rewritten seo",
      tips: "rewritten tips",
      cuisine_region: "french",
      collections: [collectionNames[0]],
    } as unknown as Record<string, unknown>);

    expect(previews).toEqual([]);
  });
});
