import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { categoryLabels } from "@/lib/recipe-utils";

interface RecipePickerDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (recipe: { id: string; title: string; slug: string; ingredients: string[]; servings: number | null; image_url: string | null }) => void;
  dayLabel: string;
  mealLabel: string;
}

const RecipePickerDialog = ({ open, onClose, onSelect, dayLabel, mealLabel }: RecipePickerDialogProps) => {
  const [search, setSearch] = useState("");

  const { data: recipes = [] } = useQuery({
    queryKey: ["all-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, title, slug, category, ingredients, servings, image_url")
        .order("title");
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return recipes;
    const q = search.toLowerCase();
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        categoryLabels[r.category]?.toLowerCase().includes(q)
    );
  }, [recipes, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-background border border-border w-full max-w-lg max-h-[80vh] flex flex-col mx-4">
        {/* Header */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{dayLabel} · {mealLabel}</p>
              <h3 className="font-display text-lg">Choose a Recipe</h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-secondary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-secondary border border-border focus:border-foreground outline-none transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* Recipe list */}
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No recipes found</p>
          ) : (
            <div className="space-y-1">
              {filtered.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => {
                    onSelect({
                      id: recipe.id,
                      title: recipe.title,
                      slug: recipe.slug,
                      ingredients: (recipe.ingredients as string[]) || [],
                      servings: recipe.servings,
                      image_url: recipe.image_url,
                    });
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-secondary transition-colors"
                >
                  {recipe.image_url && (
                    <img
                      src={recipe.image_url}
                      alt=""
                      className="w-12 h-12 object-cover flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{recipe.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {categoryLabels[recipe.category]}
                      {recipe.servings && ` · Serves ${recipe.servings}`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePickerDialog;
