import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  open: boolean;
  onClose: () => void;
  recipeTitle: string;
  ingredients: string[];
  /** Currently checked indices (checked = need to buy) */
  checkedIndices: Set<number>;
  onSave: (checkedIndices: Set<number>) => void;
}

const IngredientSelectorModal = ({
  open,
  onClose,
  recipeTitle,
  ingredients,
  checkedIndices,
  onSave,
}: Props) => {
  const [local, setLocal] = useState<Set<number>>(new Set(checkedIndices));

  // Sync when opened with new data
  useEffect(() => {
    if (open) setLocal(new Set(checkedIndices));
  }, [open, checkedIndices]);

  if (!open) return null;

  const toggle = (i: number) => {
    setLocal((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const allChecked = local.size === ingredients.length;

  const toggleAll = () => {
    if (allChecked) {
      setLocal(new Set());
    } else {
      setLocal(new Set(ingredients.map((_, i) => i)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-background border border-border w-full sm:max-w-md max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
              Select ingredients to buy
            </p>
            <h3 className="text-sm font-semibold text-foreground leading-snug">
              {recipeTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Select all */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <Checkbox
            checked={allChecked}
            onCheckedChange={toggleAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="text-xs font-medium text-muted-foreground cursor-pointer">
            {allChecked ? "Deselect all" : "Select all"}
          </label>
          <span className="ml-auto text-xs text-muted-foreground/60">
            {local.size}/{ingredients.length} selected
          </span>
        </div>

        {/* Ingredient list */}
        <ul className="flex-1 overflow-y-auto p-5 space-y-3">
          {ingredients.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Checkbox
                checked={local.has(i)}
                onCheckedChange={() => toggle(i)}
                id={`ing-${i}`}
                className="mt-0.5"
              />
              <label
                htmlFor={`ing-${i}`}
                className={`text-sm cursor-pointer transition-colors ${
                  local.has(i) ? "text-foreground" : "text-muted-foreground/50 line-through"
                }`}
              >
                {item}
              </label>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="p-5 border-t border-border flex items-center gap-3">
          <button
            onClick={() => {
              onSave(local);
              onClose();
            }}
            className="flex-1 py-2.5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors text-center"
          >
            Save selection
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientSelectorModal;
