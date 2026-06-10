import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Upload, X, Plus, Loader2, ArrowUp, ArrowDown, CornerDownRight, ClipboardList } from "lucide-react";
import QuickPasteDialog from "@/components/QuickPasteDialog";
import { supabase } from "@/integrations/supabase/client";
import { CUISINE_REGIONS, type CuisineRegion } from "@/lib/cuisine-regions";
import { MEAL_TYPES, type MealType } from "@/lib/meal-types";
import CuisineRegionPicker from "@/components/CuisineRegionPicker";
import CategoryPicker from "@/components/CategoryPicker";
import MealTypePicker from "@/components/MealTypePicker";
import FractionPicker from "@/components/FractionPicker";
import Layout from "@/components/Layout";
import CookTimeWarning from "@/components/CookTimeWarning";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { AuthorSectionHeader, AISectionHeader, AIBadge, AuthorBadge } from "@/components/FieldOwnership";
import AiFillConfirmDialog from "@/components/AiFillConfirmDialog";
import { useAiFillRecipeMetadata } from "@/lib/useAiFillRecipeMetadata";
import { normaliseRecipeImageUpload } from "@/lib/recipe-image-upload";

type RecipeCategory = Database["public"]["Enums"]["recipe_category"];

type NewRecipeDraft = {
  title: string;
  categories: RecipeCategory[];
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  tips: string;
  seoTitle: string;
  seoDescription: string;
  cuisineRegion: CuisineRegion | null;
  mealTypes: MealType[];
  published: boolean;
};

const NEW_RECIPE_DRAFT_STORAGE_KEY = "admin-new-recipe-draft-v1";
const DEFAULT_CATEGORIES: RecipeCategory[] = ["chicken"];
const DEFAULT_MEAL_TYPES: MealType[] = ["mains"];
const AUTO_SAVE_DEBOUNCE_MS = 1500;

const scheduleIdleWork = (callback: () => void): number => {
  if (typeof window === "undefined") return 0;

  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, { timeout: 1200 });
  }

  return window.setTimeout(callback, 250);
};

const cancelIdleWork = (handle: number) => {
  if (typeof window === "undefined" || handle === 0) return;

  if ("cancelIdleCallback" in window) {
    window.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
};

const arraysMatch = (a: string[], b: string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

const loadNewRecipeDraft = (): NewRecipeDraft | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(NEW_RECIPE_DRAFT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<NewRecipeDraft>;

    return {
      title: typeof parsed.title === "string" ? parsed.title : "",
      categories: Array.isArray(parsed.categories) && parsed.categories.length
        ? parsed.categories as RecipeCategory[]
        : DEFAULT_CATEGORIES,
      description: typeof parsed.description === "string" ? parsed.description : "",
      prepTime: typeof parsed.prepTime === "string" ? parsed.prepTime : "",
      cookTime: typeof parsed.cookTime === "string" ? parsed.cookTime : "",
      servings: typeof parsed.servings === "string" ? parsed.servings : "",
      ingredients: Array.isArray(parsed.ingredients) && parsed.ingredients.length
        ? parsed.ingredients.filter((item): item is string => typeof item === "string")
        : [""],
      instructions: Array.isArray(parsed.instructions) && parsed.instructions.length
        ? parsed.instructions.filter((item): item is string => typeof item === "string")
        : [""],
      tips: typeof parsed.tips === "string" ? parsed.tips : "",
      seoTitle: typeof parsed.seoTitle === "string" ? parsed.seoTitle : "",
      seoDescription: typeof parsed.seoDescription === "string" ? parsed.seoDescription : "",
      cuisineRegion: CUISINE_REGIONS.includes(parsed.cuisineRegion as CuisineRegion)
        ? parsed.cuisineRegion as CuisineRegion
        : null,
      mealTypes: Array.isArray(parsed.mealTypes) && parsed.mealTypes.length
        ? parsed.mealTypes as MealType[]
        : DEFAULT_MEAL_TYPES,
      published: typeof parsed.published === "boolean" ? parsed.published : true,
    };
  } catch {
    return null;
  }
};

const recipeSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title too long"),
  categories: z.array(z.enum([
    "chicken", "beef", "lamb", "pork", "spicy", "seafood",
    "lunch_suggestions", "sweets", "pasta",
  ])).min(1, "Pick at least one category"),
  description: z.string().trim().min(1, "Description is required").max(1000, "Description too long"),
  prep_time_minutes: z.number().int().min(0).max(9999).nullable(),
  cook_time_minutes: z.number().int().min(0).max(9999).nullable(),
  servings: z.number().int().min(1).max(999).nullable(),
  ingredients: z.array(z.string().trim().min(1)).min(1, "At least one ingredient required"),
  instructions: z.array(z.string().trim().min(1)).min(1, "At least one instruction required"),
  tips: z.string().trim().max(2000).nullable(),
  seo_title: z.string().trim().max(70).nullable(),
  seo_description: z.string().trim().max(170).nullable(),
  cuisine_region: z.enum(CUISINE_REGIONS).nullable(),
  meal_types: z.array(z.enum(MEAL_TYPES)).min(1, "Pick at least one meal type"),
});

const slugify = (s: string) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const AdminNewRecipe = () => {
  const navigate = useNavigate();
  const [initialDraft] = useState<NewRecipeDraft | null>(() => loadNewRecipeDraft());
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  const [title, setTitle] = useState(initialDraft?.title ?? "");
  const [categories, setCategories] = useState<RecipeCategory[]>(initialDraft?.categories ?? DEFAULT_CATEGORIES);
  const [description, setDescription] = useState(initialDraft?.description ?? "");
  const [prepTime, setPrepTime] = useState(initialDraft?.prepTime ?? "");
  const [cookTime, setCookTime] = useState(initialDraft?.cookTime ?? "");
  const [servings, setServings] = useState(initialDraft?.servings ?? "");
  const [ingredients, setIngredients] = useState<string[]>(initialDraft?.ingredients ?? [""]);
  const [instructions, setInstructions] = useState<string[]>(initialDraft?.instructions ?? [""]);
  const [tips, setTips] = useState(initialDraft?.tips ?? "");
  const [seoTitle, setSeoTitle] = useState(initialDraft?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initialDraft?.seoDescription ?? "");
  const [cuisineRegion, setCuisineRegion] = useState<CuisineRegion | null>(initialDraft?.cuisineRegion ?? null);
  const [mealTypes, setMealTypes] = useState<MealType[]>(initialDraft?.mealTypes ?? DEFAULT_MEAL_TYPES);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [published, setPublished] = useState(initialDraft?.published ?? true);
  const [savedOrSubmitted, setSavedOrSubmitted] = useState(false);
  const [pasteIngredientsOpen, setPasteIngredientsOpen] = useState(false);
  const [pasteStepsOpen, setPasteStepsOpen] = useState(false);
  const deferredInstructions = useDeferredValue(instructions);
  const aiFill = useAiFillRecipeMetadata();
  const handleAiFill = () =>
    aiFill.request(
      { title, description, ingredients, instructions, prepTime, cookTime, servings },
      { cuisineRegion, seoTitle, seoDescription, tips },
      { setCuisineRegion, setSeoTitle, setSeoDescription, setTips },
    );

  const isDirty =
    title.trim() !== "" ||
    !arraysMatch(categories, DEFAULT_CATEGORIES) ||
    description.trim() !== "" ||
    prepTime !== "" ||
    cookTime !== "" ||
    servings !== "" ||
    ingredients.some((s) => s.trim() !== "") ||
    instructions.some((s) => s.trim() !== "") ||
    tips.trim() !== "" ||
    seoTitle.trim() !== "" ||
    seoDescription.trim() !== "" ||
    cuisineRegion !== null ||
    !arraysMatch(mealTypes, DEFAULT_MEAL_TYPES) ||
    imageFile !== null ||
    published !== true;

  useEffect(() => {
    if (!isDirty || savedOrSubmitted) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, savedOrSubmitted]);

  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  const draftStateRef = useRef<NewRecipeDraft | null>(null);
  const isDirtyRef = useRef(isDirty);
  const savedOrSubmittedRef = useRef(savedOrSubmitted);

  draftStateRef.current = {
    title,
    categories,
    description,
    prepTime,
    cookTime,
    servings,
    ingredients,
    instructions,
    tips,
    seoTitle,
    seoDescription,
    cuisineRegion,
    mealTypes,
    published,
  };
  isDirtyRef.current = isDirty;
  savedOrSubmittedRef.current = savedOrSubmitted;

  // Persist draft to localStorage on every change (debounced) so input is
  // never lost — including when the auth session expires and the page is
  // redirected to /auth mid-edit.
  const persistDraft = (showIndicator: boolean) => {
    if (typeof window === "undefined") return;
    if (savedOrSubmittedRef.current) {
      window.localStorage.removeItem(NEW_RECIPE_DRAFT_STORAGE_KEY);
      return;
    }
    if (!isDirtyRef.current || !draftStateRef.current) return;
    try {
      window.localStorage.setItem(
        NEW_RECIPE_DRAFT_STORAGE_KEY,
        JSON.stringify(draftStateRef.current),
      );
      if (showIndicator) {
        setDraftSavedAt(Date.now());
        setShowSavedIndicator(true);
      }
    } catch {
      // ignore quota/serialisation errors
    }
  };

  // Debounced save on every field change. Use idle time so typing into long
  // method fields stays responsive instead of blocking on localStorage writes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timeoutId = window.setTimeout(() => {
      const idleHandle = scheduleIdleWork(() => persistDraft(true));
      if (idleHandle) {
        // ensure cleanup can cancel the pending idle write too
        (window as Window & { __adminRecipeDraftIdleHandle?: number }).__adminRecipeDraftIdleHandle = idleHandle;
      }
    }, AUTO_SAVE_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
      cancelIdleWork((window as Window & { __adminRecipeDraftIdleHandle?: number }).__adminRecipeDraftIdleHandle ?? 0);
      delete (window as Window & { __adminRecipeDraftIdleHandle?: number }).__adminRecipeDraftIdleHandle;
    };
  }, [
    title, categories, description, prepTime, cookTime, servings,
    ingredients, instructions, tips, seoTitle, seoDescription,
    cuisineRegion, mealTypes, published,
  ]);

  // Persist on tab hide and on unmount (covers auth redirect, navigation, close)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") persistDraft(false);
    };
    const onPageHide = () => persistDraft(false);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      // Final synchronous save when the component unmounts (e.g. auth redirect)
      persistDraft(false);
    };
  }, []);

  // Clear stored draft after successful save/submit
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (savedOrSubmitted) {
      window.localStorage.removeItem(NEW_RECIPE_DRAFT_STORAGE_KEY);
    }
  }, [savedOrSubmitted]);

  // Hide the "Draft saved" indicator after a few seconds
  useEffect(() => {
    if (!showSavedIndicator) return;
    const timeout = window.setTimeout(() => setShowSavedIndicator(false), 2500);
    return () => window.clearTimeout(timeout);
  }, [showSavedIndicator, draftSavedAt]);

  const updateListItem = (
    list: string[],
    setter: (v: string[]) => void,
    idx: number,
    value: string
  ) => {
    const next = [...list];
    next[idx] = value;
    setter(next);
  };

  const addListItem = (list: string[], setter: (v: string[]) => void) =>
    setter([...list, ""]);

  const removeListItem = (
    list: string[],
    setter: (v: string[]) => void,
    idx: number
  ) => {
    if (list.length === 1) return;
    setter(list.filter((_, i) => i !== idx));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Max 5MB", variant: "destructive" });
      return;
    }
    try {
      const processedFile = await normaliseRecipeImageUpload(file);
      setImageFile(processedFile);
      setImagePreview(URL.createObjectURL(processedFile));
    } catch (err) {
      const description = err instanceof Error
        ? err.message
        : "Please try a JPG or PNG version of the photo.";
      toast({
        title: "Image couldn't be prepared",
        description,
        variant: "destructive",
      });
      // Clear the input so the user can re-select after fixing the source.
      e.target.value = "";
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Add at least a title before saving a draft.",
        variant: "destructive",
      });
      return;
    }
    setSavingDraft(true);
    try {
      let image_url: string | null = null;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const filename = `${Date.now()}-${slugify(title)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("recipe-images")
          .upload(filename, imageFile, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("recipe-images")
          .getPublicUrl(filename);
        image_url = urlData.publicUrl;
      }

      let slug = slugify(title) || `draft-${Date.now().toString(36)}`;
      const { data: existing } = await supabase
        .from("recipes")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();
      if (existing) slug = `${slug}-${Date.now().toString(36)}`;

      const cleanedIngredients = ingredients.map((s) => s.trim()).filter(Boolean);
      const cleanedInstructions = instructions.map((s) => s.trim()).filter(Boolean);

      const { error: insertError } = await supabase.from("recipes").insert([{
        title: title.trim(),
        categories: categories.length ? categories : ["chicken"],
        description: description.trim() || "Draft — description pending.",
        prep_time_minutes: prepTime ? parseInt(prepTime, 10) : null,
        cook_time_minutes: cookTime ? parseInt(cookTime, 10) : null,
        servings: servings ? parseInt(servings, 10) : null,
        ingredients: cleanedIngredients,
        instructions: cleanedInstructions,
        tips: tips.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        cuisine_region: cuisineRegion,
        meal_types: mealTypes.length ? mealTypes : ["mains"],
        slug,
        image_url,
        published: false,
      }]);

      if (insertError) throw insertError;

      setSavedOrSubmitted(true);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(NEW_RECIPE_DRAFT_STORAGE_KEY);
      }
      toast({ title: "Draft saved", description: title });
      navigate(`/admin/recipes/${slug}/edit`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Failed to save draft", description: msg, variant: "destructive" });
    } finally {
      setSavingDraft(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const cleaned = {
        title,
        categories,
        description,
        prep_time_minutes: prepTime ? parseInt(prepTime, 10) : null,
        cook_time_minutes: cookTime ? parseInt(cookTime, 10) : null,
        servings: servings ? parseInt(servings, 10) : null,
        ingredients: ingredients.map((s) => s.trim()).filter(Boolean),
        instructions: instructions.map((s) => s.trim()).filter(Boolean),
        tips: tips.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        cuisine_region: cuisineRegion,
        meal_types: mealTypes,
      };

      const parsed = recipeSchema.safeParse(cleaned);
      if (!parsed.success) {
        toast({
          title: "Validation error",
          description: parsed.error.issues[0]?.message ?? "Please check the form",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      let image_url: string | null = null;
      if (imageFile) {
        const ext = imageFile.name.split(".").pop() || "jpg";
        const filename = `${Date.now()}-${slugify(title)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("recipe-images")
          .upload(filename, imageFile, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("recipe-images")
          .getPublicUrl(filename);
        image_url = urlData.publicUrl;
      }

      let slug = slugify(title);
      const { data: existing } = await supabase
        .from("recipes")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();
      if (existing) slug = `${slug}-${Date.now().toString(36)}`;

      const { error: insertError } = await supabase.from("recipes").insert([{
        title: parsed.data.title,
        categories: parsed.data.categories,
        description: parsed.data.description,
        prep_time_minutes: parsed.data.prep_time_minutes,
        cook_time_minutes: parsed.data.cook_time_minutes,
        servings: parsed.data.servings,
        ingredients: parsed.data.ingredients,
        instructions: parsed.data.instructions,
        tips: parsed.data.tips,
        seo_title: parsed.data.seo_title,
        seo_description: parsed.data.seo_description,
        cuisine_region: parsed.data.cuisine_region,
        meal_types: parsed.data.meal_types,
        slug,
        image_url,
        published,
      }]);

      if (insertError) throw insertError;

      setSavedOrSubmitted(true);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(NEW_RECIPE_DRAFT_STORAGE_KEY);
      }
      toast({ title: "Recipe created", description: title });
      navigate(published ? `/recipes/${slug}` : `/admin/recipes/${slug}/edit`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Failed to create recipe", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="mb-10">
          <p className="micro-caption mb-2">Admin</p>
          <h1 className="font-display text-4xl md:text-5xl">New Recipe</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            Add a recipe to the collection. Fields marked * are required.
          </p>
          <div
            className={`mt-3 text-xs text-muted-foreground transition-opacity duration-300 ${
              showSavedIndicator ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
            role="status"
          >
            {draftSavedAt
              ? `Draft saved · ${new Date(draftSavedAt).toLocaleTimeString()}`
              : ""}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AuthorSectionHeader title="Author fields" />

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title * <AuthorBadge /></label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Slow-roasted lamb shoulder"
              required
              maxLength={200}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium mb-2">Categories * <AuthorBadge /></label>
            <p className="text-xs text-muted-foreground mb-3">
              Pick one or more food categories. A recipe can belong to several (e.g. a chicken pasta).
            </p>
            <CategoryPicker value={categories} onChange={setCategories} />
          </div>


          {/* Meal types */}
          <div>
            <label className="block text-sm font-medium mb-2">Meal types * <AuthorBadge /></label>
            <p className="text-xs text-muted-foreground mb-3">
              Pick at least one meal type. Recipes can belong to more than one.
            </p>
            <MealTypePicker value={mealTypes} onChange={setMealTypes} />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description * <AuthorBadge /></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short, evocative summary..."
              required
              maxLength={1000}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-y"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Photo <AuthorBadge /></label>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Recipe photo" className="w-full max-h-96 object-contain rounded-lg border border-border bg-muted" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur border border-border rounded-full hover:bg-secondary shadow-sm"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                <span className="text-sm text-muted-foreground">Click to upload a photo (max 5MB)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium mb-2">Ingredients * <AuthorBadge /></label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mb-3"
              onClick={() => setPasteIngredientsOpen(true)}
            >
              <ClipboardList className="w-4 h-4 mr-2" /> Paste all ingredients
            </Button>
            <div className="space-y-3">
              {ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <FractionPicker
                    value={ing}
                    onChange={(v) => updateListItem(ingredients, setIngredients, i, v)}
                    placeholder="2 tbsp olive oil"
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(ingredients, setIngredients, i)}
                    disabled={ingredients.length === 1}
                    className="px-3 border border-border rounded-md hover:bg-secondary disabled:opacity-30 h-10 mt-8 self-start"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addListItem(ingredients, setIngredients)}>
                <Plus className="w-4 h-4" /> Add ingredient
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium mb-2">Instructions * <AuthorBadge /></label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mb-3"
              onClick={() => setPasteStepsOpen(true)}
            >
              <ClipboardList className="w-4 h-4 mr-2" /> Paste all steps
            </Button>
            <p className="text-xs text-muted-foreground mb-3">
              Use the arrows to reorder steps, or the inline + to insert a new step above the current one.
            </p>
            <div className="space-y-2">
              {instructions.map((step, i) => (
                <div key={i} className="flex gap-2">
                  <span className="pt-2 text-sm text-muted-foreground w-6">{i + 1}.</span>
                  <textarea
                    value={step}
                    onChange={(e) => updateListItem(instructions, setInstructions, i, e.target.value)}
                    placeholder="Preheat the oven to 180°C..."
                    rows={2}
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm resize-y"
                  />
                  <div className="flex flex-col gap-1 self-start">
                    <button
                      type="button"
                      title="Insert step above"
                      onClick={() => {
                        const next = [...instructions];
                        next.splice(i, 0, "");
                        setInstructions(next);
                      }}
                      className="px-2 py-1 border border-border rounded-md hover:bg-secondary"
                    >
                      <CornerDownRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        title="Move up"
                        onClick={() => {
                          if (i === 0) return;
                          const next = [...instructions];
                          [next[i - 1], next[i]] = [next[i], next[i - 1]];
                          setInstructions(next);
                        }}
                        disabled={i === 0}
                        className="px-2 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Move down"
                        onClick={() => {
                          if (i === instructions.length - 1) return;
                          const next = [...instructions];
                          [next[i + 1], next[i]] = [next[i], next[i + 1]];
                          setInstructions(next);
                        }}
                        disabled={i === instructions.length - 1}
                        className="px-2 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      title="Remove step"
                      onClick={() => removeListItem(instructions, setInstructions, i)}
                      disabled={instructions.length === 1}
                      className="px-2 py-1 border border-border rounded-md hover:bg-secondary disabled:opacity-30"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addListItem(instructions, setInstructions)}>
                <Plus className="w-4 h-4" /> Add step at end
              </Button>
            </div>
          </div>


          {/* AI-assisted fields */}
          <AISectionHeader
            title="AI-assisted fields"
            onFill={handleAiFill}
            loading={aiFill.loading}
          />

          {/* Cuisine region */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cuisine region <AIBadge />
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              Pick a single region. This maps to challenge regions in The Daily Pass app.
            </p>
            <CuisineRegionPicker value={cuisineRegion} onChange={setCuisineRegion} />
          </div>

          {/* Tips */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tips (optional) <AIBadge />
            </label>
            <textarea
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              placeholder="Chef's notes, substitutions, serving suggestions..."
              maxLength={2000}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-y"
            />
          </div>

          {/* SEO Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Meta title <AIBadge />{" "}
                <span className={`text-xs ${seoTitle.length > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                  ({seoTitle.length}/60)
                </span>
              </label>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Slow-roasted lamb shoulder (4 hr) | Stir & Simmer"
                maxLength={70}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meta description <AIBadge />{" "}
                <span className={`text-xs ${seoDescription.length > 155 ? "text-destructive" : "text-muted-foreground"}`}>
                  ({seoDescription.length}/155)
                </span>
              </label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Tender, fall-apart lamb shoulder with garlic, rosemary and red wine. Ready in 4 hours."
                maxLength={170}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-y"
              />
            </div>
          </div>


          {/* Publish toggle + Submit */}
          <div className="pt-4 border-t border-border space-y-4">
            <CookTimeWarning
              cookTimeMinutes={cookTime ? parseInt(cookTime, 10) : null}
              instructions={deferredInstructions}
            />
            <label className="flex items-start gap-3 p-3 border border-border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="mt-1"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {published ? "Publish now" : "Save as draft"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Published recipes appear in listings, counts and search. Drafts stay hidden until you tick this box.
                </p>
              </div>
            </label>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={submitting || savingDraft}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting
                  ? (published ? "Publishing..." : "Saving draft...")
                  : (published ? "Create & Publish" : "Save as Draft")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
                disabled={submitting || savingDraft}
                title="Save what you have so far as an unpublished draft. You can finish it later from the edit page."
              >
                {savingDraft && <Loader2 className="w-4 h-4 animate-spin" />}
                {savingDraft ? "Saving draft..." : "Save Draft & Continue Later"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (
                    isDirty &&
                    !savedOrSubmitted &&
                    !window.confirm("You have unsaved changes — are you sure you want to leave?")
                  ) {
                    return;
                  }
                  navigate("/recipes");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
      <AiFillConfirmDialog
        open={aiFill.open}
        previews={aiFill.previews}
        selected={aiFill.selected}
        loading={aiFill.loading}
        onToggle={aiFill.toggle}
        onCancel={aiFill.cancel}
        onConfirm={aiFill.confirm}
      />
      <QuickPasteDialog
        open={pasteIngredientsOpen}
        onOpenChange={setPasteIngredientsOpen}
        title="Paste all ingredients"
        description="Paste your ingredient list below — one ingredient per line. They will replace the current list."
        placeholder="2 tbsp olive oil&#10;1 red onion, finely sliced&#10;400g canned chickpeas, drained"
        buttonLabel="Add ingredients"
        onSubmit={(items) => setIngredients(items)}
      />
      <QuickPasteDialog
        open={pasteStepsOpen}
        onOpenChange={setPasteStepsOpen}
        title="Paste all steps"
        description="Paste your method steps below — one step per line. Leading numbers or bullets will be stripped automatically. They will replace the current list."
        placeholder="Preheat the oven to 180°C.&#10;Season the lamb generously with salt and pepper.&#10;Roast for 4 hours until falling apart."
        buttonLabel="Add steps"
        onSubmit={(items) => setInstructions(items)}
        stripNumbers
      />
    </Layout>
  );
};

export default AdminNewRecipe;
